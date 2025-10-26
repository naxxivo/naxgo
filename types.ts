
export enum Page {
  Apps = 'Apps',
  Videos = 'Videos',
  Learn = 'Learn',
  Web = 'Web',
}

export interface AppInfo {
  type: Page.Apps;
  name: string;
  developer: string;
  rating: number;
  description: string;
  iconUrl: string;
}

export interface VideoInfo {
  type: Page.Videos;
  title: string;
  channel: string;
  rating: number;
  description: string;
  thumbnailUrl: string;
}

export interface CourseInfo {
  type: Page.Learn;
  title: string;
  instructor: string;
  rating: number;
  description: string;
  imageUrl: string;
}

export interface WebInfo {
  type: Page.Web;
  title: string;
  uri: string;
  description?: string;
}

export type ContentItem = AppInfo | VideoInfo | CourseInfo | WebInfo;

export interface Source {
  uri: string;
  title: string;
}
