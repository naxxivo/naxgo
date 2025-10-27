
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Page } from '../../types';

interface ProfilePageProps {
  setActivePage: (page: Page) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ setActivePage }) => {
  const auth = useContext(AuthContext);
  
  const [formData, setFormData] = useState(auth?.currentUser);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    setFormData(auth?.currentUser);
  }, [auth?.currentUser]);

  if (!auth) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }

  const { currentUser, updateUser, logout } = auth;

  if (!currentUser || !formData) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold">Please log in to view your profile.</h2>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      setIsLoading(true);
      setSuccessMessage('');
      // Simulate API call
      setTimeout(() => {
        updateUser(formData);
        setIsLoading(false);
        setSuccessMessage('Profile updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3s
      }, 1000);
    }
  };
  
  const handleLogoutConfirm = () => {
    if (window.confirm('Are you sure you want to log out?')) {
        logout();
        setActivePage(Page.Showcase);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
          <img
            src={formData.profilePictureUrl}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-md"
          />
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{formData.name}</h1>
            <p className="text-lg text-gray-500 dark:text-gray-400">@{formData.username}</p>
            <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">{formData.email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                className="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
            <input
              type="text"
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              className="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500"
              placeholder="A short bio about yourself"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Tell us more about what you do"
            />
          </div>
          
          <div className="flex items-center justify-end gap-4">
            {successMessage && <p className="text-green-600 dark:text-green-400 text-sm">{successMessage}</p>}
            <button type="submit" disabled={isLoading} className="bg-blue-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300 disabled:bg-blue-300 flex justify-center items-center min-w-[120px]">
              {isLoading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : 'Save Changes'}
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
                onClick={handleLogoutConfirm}
                className="w-full bg-red-500/10 text-red-600 dark:text-red-400 font-bold py-3 px-4 rounded-lg hover:bg-red-500/20 transition duration-300"
            >
                Log Out
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
