// Fix: Import React to resolve the 'React' namespace for React.FC.
import React from 'react';

export enum Page {
  Showcase = 'Showcase',
  Apps = 'Apps',
  Videos = 'Videos',
  Learn = 'Learn',
  Web = 'Web',
  Login = 'Login',
  Register = 'Register',
  Profile = 'Profile',
}

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  bio: string;
  description: string;
  profilePictureUrl: string;
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

export interface ShowcaseItem {
  category: 'Project' | 'Data Insight' | 'Innovation';
  title: string;
  description: string;
  icon: React.FC<{className?: string}>;
}


export type ContentItem = AppInfo | VideoInfo | CourseInfo | WebInfo;

export interface Source {
  uri: string;
  title: string;
}