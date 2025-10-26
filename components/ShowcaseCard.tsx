
import React from 'react';
import { ShowcaseItem } from '../types';

interface ShowcaseCardProps {
  item: ShowcaseItem;
}

const ShowcaseCard: React.FC<ShowcaseCardProps> = ({ item }) => {
  return (
    <div className="relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
        <div className="relative z-10">
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-500/10 dark:bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                </div>
                <div>
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{item.category}</span>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-1">{item.title}</h3>
                </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-4">{item.description}</p>
        </div>
    </div>
  );
};

export default ShowcaseCard;
