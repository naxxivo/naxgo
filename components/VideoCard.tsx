
import React from 'react';
import { VideoInfo } from '../types';
import Rating from './Rating';

interface VideoCardProps {
  video: VideoInfo;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-all duration-300 ease-in-out">
      <img src={video.thumbnailUrl} alt={`${video.title} thumbnail`} className="w-full h-40 object-cover" />
      <div className="p-4 flex flex-col h-full">
        <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-1 leading-snug">{video.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{video.channel}</p>
        <Rating score={video.rating} />
        <p className="text-xs text-gray-600 dark:text-gray-300 mt-2 flex-grow line-clamp-2">{video.description}</p>
      </div>
    </div>
  );
};

export default VideoCard;
