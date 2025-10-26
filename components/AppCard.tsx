
import React from 'react';
import { AppInfo } from '../types';
import Rating from './Rating';

interface AppCardProps {
  app: AppInfo;
}

const AppCard: React.FC<AppCardProps> = ({ app }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden transform hover:-translate-y-1 transition-all duration-300 ease-in-out">
      <div className="p-4 flex flex-col h-full">
        <div className="flex items-center mb-3">
          <img src={app.iconUrl} alt={`${app.name} icon`} className="w-16 h-16 rounded-xl mr-4" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">{app.name}</h3>
            <p className="text-sm text-blue-500 dark:text-blue-400">{app.developer}</p>
            <Rating score={app.rating} />
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 flex-grow">{app.description}</p>
      </div>
    </div>
  );
};

export default AppCard;
