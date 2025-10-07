import { Users, AlertTriangle, Activity, Wifi, MapPin } from 'lucide-react';
import { mockEntities, mockAlerts, mockActivities } from '../data/mockData';

export function Dashboard() {
  const totalEntities = mockEntities.length;
  const activeAlerts = mockAlerts.filter(a => a.status === 'pending').length;
  const criticalAlerts = mockAlerts.filter(a => a.severity === 'critical').length;
  const warningAlerts = mockAlerts.filter(a => a.severity === 'high' || a.severity === 'medium').length;
  const todayActivities = mockActivities.length * 1685;
  const connectedDevices = 2891;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Security Dashboard</h1>
        <p className="text-gray-400">Real-time campus entity resolution and security monitoring</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Entities"
          value="1,247"
          subtitle="Students & Staff"
          change="+12 this week"
          changePositive={true}
          icon={<Users className="w-6 h-6" />}
          iconBg="bg-blue-500/10"
          iconColor="text-blue-400"
        />

        <StatCard
          title="Active Alerts"
          value={activeAlerts.toString()}
          subtitle={`${criticalAlerts} Critical, ${warningAlerts} Warning`}
          change="-3 from yesterday"
          changePositive={true}
          icon={<AlertTriangle className="w-6 h-6" />}
          iconBg="bg-red-500/10"
          iconColor="text-red-400"
        />

        <StatCard
          title="Today's Activities"
          value={todayActivities.toLocaleString()}
          subtitle="Across all systems"
          change="+5.2% from average"
          changePositive={true}
          icon={<Activity className="w-6 h-6" />}
          iconBg="bg-green-500/10"
          iconColor="text-green-400"
        />

        <StatCard
          title="Connected Devices"
          value={connectedDevices.toLocaleString()}
          subtitle="Wi-Fi connections"
          change="Normal range"
          changePositive={true}
          icon={<Wifi className="w-6 h-6" />}
          iconBg="bg-cyan-500/10"
          iconColor="text-cyan-400"
        />
      </div>

      <div className="bg-[#0d1525] border border-gray-800 rounded-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-cyan-500/10 rounded-lg">
            <MapPin className="w-6 h-6 text-cyan-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">Campus Activity Map</h2>
        </div>

        <div className="relative bg-[#1a2332] rounded-lg p-8 aspect-video flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
            <p className="text-gray-400 text-lg mb-2">Interactive Campus Map</p>
            <p className="text-gray-500 text-sm">Real-time visualization of entity locations and activities</p>
            <div className="mt-6 flex gap-4 justify-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-400">Active (847)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-400">Alerts (4)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-400">Critical (2)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  change: string;
  changePositive: boolean;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}

function StatCard({ title, value, subtitle, change, changePositive, icon, iconBg, iconColor }: StatCardProps) {
  return (
    <div className="bg-[#0d1525] border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-gray-400 text-sm mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-white">{value}</h3>
        </div>
        <div className={`p-3 ${iconBg} rounded-lg ${iconColor}`}>
          {icon}
        </div>
      </div>
      <p className="text-gray-500 text-sm mb-2">{subtitle}</p>
      <p className={`text-sm font-medium ${changePositive ? 'text-green-400' : 'text-red-400'}`}>
        {change}
      </p>
    </div>
  );
}
