import { LayoutDashboard, Users, Activity, AlertTriangle, MapPin, BarChart3 } from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'entities', label: 'Entities', icon: Users },
    { id: 'activities', label: 'Activities', icon: Activity },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
    { id: 'map', label: 'Campus Map', icon: MapPin },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 }
  ];

  return (
    <aside className="fixed left-0 top-20 bottom-0 w-64 bg-[#0d1525] border-r border-gray-800">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
            <span className="text-2xl font-bold text-white">C</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">CER-SMS</h1>
            <p className="text-xs text-gray-400">Campus Entity Resolution & Security</p>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = activeView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/20'
                    : 'text-gray-400 hover:bg-[#1a2332] hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
