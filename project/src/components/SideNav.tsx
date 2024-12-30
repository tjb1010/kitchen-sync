import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ShoppingBasket, Activity, ClipboardList, Settings, X, ChefHat, Package2, Dumbbell } from 'lucide-react';
import { Tooltip } from './ui/Tooltip';

interface SideNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SideNav({ isOpen, onClose }: SideNavProps) {
  const navigate = useNavigate();

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/', tagline: 'Your personal command center' },
    { icon: ClipboardList, label: 'Tasks', path: '/tasks', tagline: 'Stay organized and focused' },
    { icon: ChefHat, label: 'Recipes', path: '/recipes', tagline: 'Discover and manage recipes' },
    { icon: ShoppingBasket, label: 'Shopping', path: '/shopping', tagline: 'Track your shopping needs' },
    { icon: Package2, label: 'Pantry', path: '/pantry', tagline: 'Manage your ingredients' },
    { icon: Dumbbell, label: 'Exercise', path: '/exercise', tagline: 'Plan and track workouts' },
    { icon: Activity, label: 'Nutrition', path: '/nutrition', tagline: 'Monitor your health goals' },
    { icon: Settings, label: 'Settings', path: '/settings', tagline: 'Customize your experience' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 transition-opacity z-40"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-50 flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700 bg-white dark:bg-gray-800">
          <span className="text-xl font-semibold text-gray-800 dark:text-white">Menu</span>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <nav 
          className="p-4 flex-1 overflow-y-auto"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          <ul className="space-y-2">
            {menuItems.map(({ icon: Icon, label, path, tagline }) => (
              <li key={path}>
                <button
                  onClick={() => handleNavigation(path)}
                  className="group flex flex-col w-full p-3 rounded-md text-left text-gray-700 dark:text-gray-200 hover:bg-spotify-hover transition-colors duration-200"
                >
                  <div className="flex items-center">
                    <Tooltip content={tagline}>
                      <Icon className="h-5 w-5 mr-3 group-hover:text-spotify-green transition-colors duration-200" />
                    </Tooltip>
                    <span className="font-medium group-hover:text-spotify-green transition-colors duration-200">{label}</span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 mt-1 ml-8 group-hover:text-spotify-light transition-colors duration-200">
                    {tagline}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}