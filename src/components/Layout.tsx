import { ReactNode } from 'react';
import { Search, Bell, User } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#0a0f1e] text-gray-100">
      <header className="fixed top-0 left-0 right-0 h-20 bg-[#0d1525] border-b border-gray-800 z-50">
        <div className="h-full px-8 flex items-center justify-between">
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search entities, activities, alerts..."
                className="w-full pl-12 pr-4 py-3 bg-[#1a2332] border border-gray-700 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 ml-8">
            <button className="relative p-2 hover:bg-[#1a2332] rounded-lg transition-colors">
              <Bell className="w-6 h-6 text-gray-400" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 hover:bg-[#1a2332] rounded-lg transition-colors">
              <User className="w-6 h-6 text-gray-400" />
            </button>
          </div>
        </div>
      </header>

      <div className="pt-20">
        {children}
      </div>
    </div>
  );
}
