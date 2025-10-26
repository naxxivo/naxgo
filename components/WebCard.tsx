
import React from 'react';
import { WebInfo } from '../types';

interface WebCardProps {
  item: WebInfo;
}

const WebCard: React.FC<WebCardProps> = ({ item }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm transition-shadow hover:shadow-md">
      <a href={item.uri} target="_blank" rel="noopener noreferrer" className="group">
        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{item.description || item.uri}</p>
        <h3 className="text-lg font-medium text-blue-600 dark:text-blue-400 group-hover:underline mt-1">
          {item.title}
        </h3>
      </a>
    </div>
  );
};

export default WebCard;
