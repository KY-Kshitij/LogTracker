import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  ListFilter, 
  BellRing, 
  BarChart2, 
  Settings, 
  LogOut,
  X
} from 'lucide-react';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const { logout, user } = useAuth();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Log Explorer', href: '/logs', icon: <ListFilter size={20} /> },
    { name: 'Alerts', href: '/alerts', icon: <BellRing size={20} /> },
    { name: 'Analytics', href: '/analytics', icon: <BarChart2 size={20} /> },
    { name: 'Settings', href: '/settings', icon: <Settings size={20} /> },
    { name: 'File Upload', href: '/file', icon: <LogOut size={20} /> },
  ];

  return (
    <>
      {/* Mobile sidebar overlay */}
      {open && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 transform overflow-y-auto bg-slate-800 p-4 transition duration-300 ease-in-out md:relative md:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <LogOut size={24} className="text-teal-500" />
            <span className="text-xl font-bold text-white">LogTracker</span>
          </div>
          <button
            className="md:hidden rounded-md p-2 text-white hover:bg-slate-700"
            onClick={() => setOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {user && (
          <div className="mt-6 mb-4 flex items-center rounded-lg bg-slate-700 p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-500 text-white">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="ml-3">
              <p className="font-medium text-white">{user.name}</p>
              <p className="text-sm text-slate-300">{user.role}</p>
            </div>
          </div>
        )}

        <nav className="mt-6 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-slate-700 text-white'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`
              }
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto pt-6">
          <button
            onClick={logout}
            className="flex w-full items-center rounded-lg px-4 py-3 text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white"
          >
            <LogOut size={20} className="mr-3" />
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;