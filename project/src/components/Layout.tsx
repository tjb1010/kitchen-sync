import React, { useState } from 'react';
import { Menu, LogOut } from 'lucide-react';
import { Logo } from './Logo';
import { SideNav } from './SideNav';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-spotify-dark">
      <nav className="bg-white dark:bg-spotify-base shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSideNavOpen(true)}
                className="p-2 rounded-full text-spotify-light hover:text-spotify-lightest hover:bg-spotify-hover"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="flex items-center space-x-3">
                <Logo />
                <span className="text-xl font-bold text-gray-800 dark:text-spotify-lightest">KitchenSync</span>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleSignOut}
                className="btn-spotify-outline flex items-center space-x-2"
              >
                <LogOut className="h-5 w-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <SideNav isOpen={isSideNavOpen} onClose={() => setIsSideNavOpen(false)} />
      
      <main className="max-w-7xl mx-auto px-4 py-6 dark:text-spotify-lightest">{children}</main>
    </div>
  );
}