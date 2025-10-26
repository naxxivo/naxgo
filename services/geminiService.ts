
import { GoogleGenAI } from "@google/genai";
import { Page, ContentItem, Source, AppInfo, VideoInfo, CourseInfo, WebInfo } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getPrompt = (query: string, page: Page): string => {
  const commonFormat = `For each item, provide its NAME (or TITLE), CREATOR (developer, channel, or instructor), RATING (out of 5), and a short DESCRIPTION. Format each item as a distinct block separated by "---". Ensure rating is a number.`;
  
  switch (page) {
    case Page.Apps:
      return `Based on the latest information from Google Search, find popular and highly-rated apps related to "${query}". ${commonFormat}`;
    case Page.Videos:
      return `Based on the latest information from Google Search, find popular and highly-rated videos related to "${query}". ${commonFormat}`;
    case Page.Learn:
      return `Based on the latest information from Google Search, find popular and highly-rated online courses or tutorials related to "${query}". ${commonFormat}`;
    case Page.Web:
      return `Based on the latest information from Google Search, provide a concise, one-paragraph summary to answer the query: "${query}". Do not list websites, URLs, or any kind of list in your summary. Just provide the paragraph.`;
    default:
      return `Find information about ${query}.`;
  }
};

const parseResponse = (responseText: string, page: Page): ContentItem[] => {
    const items: ContentItem[] = [];
    const blocks = responseText.split('---').filter(block => block.trim() !== '');

    blocks.forEach(block => {
        const lines = block.trim().split('\n');
        const itemData: { [key: string]: string } = {};
        lines.forEach(line => {
            const parts = line.split(':');
            if (parts.length > 1) {
                const key = parts[0].trim().toUpperCase();
                const value = parts.slice(1).join(':').trim();
                itemData[key] = value;
            }
        });

        const rating = parseFloat(itemData.RATING) || Math.random() * 2 + 3; // Fallback rating
        const description = itemData.DESCRIPTION || 'No description available.';

        try {
            if (page === Page.Apps) {
                const app: AppInfo = {
                    type: Page.Apps,
                    name: itemData.NAME || 'Untitled App',
                    developer: itemData.DEVELOPER || itemData.CREATOR || 'Unknown Developer',
                    rating: rating,
                    description,
                    iconUrl: `https://picsum.photos/seed/${encodeURIComponent(itemData.NAME || 'app')}/128`,
                };
                items.push(app);
            } else if (page === Page.Videos) {
                 const video: VideoInfo = {
                    type: Page.Videos,
                    title: itemData.TITLE || itemData.NAME || 'Untitled Video',
                    channel: itemData.CHANNEL || itemData.CREATOR || 'Unknown Channel',
                    rating,
                    description,
                    thumbnailUrl: `https://picsum.photos/seed/${encodeURIComponent(itemData.TITLE || 'video')}/400/225`,
                };
                items.push(video);
            } else if (page === Page.Learn) {
                const course: CourseInfo = {
                    type: Page.Learn,
                    title: itemData.TITLE || itemData.NAME || 'Untitled Course',
                    instructor: itemData.INSTRUCTOR || itemData.CREATOR || 'Unknown Instructor',
                    rating,
                    description,
                    imageUrl: `https://picsum.photos/seed/${encodeURIComponent(itemData.TITLE || 'course')}/400/225`,
                };
                items.push(course);
            }
        } catch (e) {
            console.error("Error parsing block:", block, e);
        }
    });

    return items;
};

export const searchContent = async (query: string, page: Page): Promise<{ results: ContentItem[], sources: Source[], summary: string | null }> => {
  try {
    const prompt = getPrompt(query, page);
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{googleSearch: {}}],
      },
    });

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources: Source[] = groundingChunks
        .filter(chunk => chunk.web && chunk.web.uri)
        .map(chunk => ({
            uri: chunk.web.uri!,
            title: chunk.web.title || 'Untitled Source',
        }));

    if (page === Page.Web) {
      const webResults: WebInfo[] = sources.map(source => ({
        type: Page.Web,
        title: source.title,
        uri: source.uri,
        description: new URL(source.uri).hostname,
      }));
      return { results: webResults, sources: [], summary: response.text };
    }

    const results = parseResponse(response.text, page);
    
    if (results.length === 0 && response.text.length > 10) {
        const fallbackItem = {
            type: page,
            name: query,
            title: query,
            developer: 'N/A',
            channel: 'N/A',
            instructor: 'N/A',
            rating: 0,
            description: response.text,
            iconUrl: `https://picsum.photos/seed/default/128`,
            thumbnailUrl: `https://picsum.photos/seed/default/400/225`,
            imageUrl: `https://picsum.photos/seed/default/400/225`,
        };
        return { results: [fallbackItem as ContentItem], sources, summary: null };
    }


    return { results, sources, summary: null };

  } catch (error) {
    console.error("Error fetching content from Gemini API:", error);
    throw new Error("Failed to fetch content. Please try again.");
  }
};
