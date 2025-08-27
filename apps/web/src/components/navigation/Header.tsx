import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { BellIcon, Menu, Search } from 'lucide-react';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-10 bg-white shadow">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center">
          <button
            className="p-2 rounded-md text-slate-500 focus:outline-none md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu size={24} />
          </button>
          
          <div className="ml-4 flex items-center rounded-md bg-slate-100 px-3 py-1.5 md:ml-0">
            <Search size={18} className="text-slate-500" />
            <input
              type="text"
              placeholder="Search logs..."
              className="ml-2 w-40 bg-transparent focus:outline-none sm:w-64 md:w-80"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button className="flex items-center justify-center rounded-full p-1.5 text-slate-500 hover:bg-slate-100">
              <BellIcon size={20} />
              <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                3
              </span>
            </button>
          </div>

          {user && (
            <div className="flex items-center space-x-2">
              <span className="hidden text-sm font-medium text-slate-700 md:block">
                {user.name}
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500 text-sm font-medium text-white">
                {user.name.charAt(0).toUpperCase()}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;