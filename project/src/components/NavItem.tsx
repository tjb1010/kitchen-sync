import React from 'react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

export function NavItem({ icon, label, onClick }: NavItemProps) {
  return (
    <button 
      onClick={onClick}
      className="flex items-center space-x-1 px-3 py-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}