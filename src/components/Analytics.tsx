import { TrendingUp, Users, Activity, Clock, Calendar } from 'lucide-react';

export function Analytics() {
  const peakHours = [
    { hour: '8:00', value: 245 },
    { hour: '9:00', value: 412 },
    { hour: '10:00', value: 567 },
    { hour: '11:00', value: 689 },
    { hour: '12:00', value: 823 },
    { hour: '13:00', value: 734 },
    { hour: '14:00', value: 645 },
    { hour: '15:00', value: 556 },
    { hour: '16:00', value: 478 },
    { hour: '17:00', value: 312 },
    { hour: '18:00', value: 189 },
  ];

  const maxValue = Math.max(...peakHours.map(h => h.value));

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
        <p className="text-gray-400">Insights and trends from campus activity data</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#0d1525] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <span className="text-xs text-green-400">+15.3%</span>
          </div>
          <p className="text-gray-400 text-sm mb-1">Avg Daily Users</p>
          <p className="text-3xl font-bold text-white">847</p>
        </div>

        <div className="bg-[#0d1525] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-500/10 rounded-lg">
              <Activity className="w-6 h-6 text-green-400" />
            </div>
            <span className="text-xs text-green-400">+8.7%</span>
          </div>
          <p className="text-gray-400 text-sm mb-1">Avg Events/Day</p>
          <p className="text-3xl font-bold text-white">8,429</p>
        </div>

        <div className="bg-[#0d1525] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-cyan-500/10 rounded-lg">
              <Clock className="w-6 h-6 text-cyan-400" />
            </div>
            <span className="text-xs text-yellow-400">-2.1%</span>
          </div>
          <p className="text-gray-400 text-sm mb-1">Avg Session Time</p>
          <p className="text-3xl font-bold text-white">3.4h</p>
        </div>

        <div className="bg-[#0d1525] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-400" />
            </div>
            <span className="text-xs text-green-400">+23.5%</span>
          </div>
          <p className="text-gray-400 text-sm mb-1">Peak Utilization</p>
          <p className="text-3xl font-bold text-white">82%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-[#0d1525] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Peak Activity Hours</h2>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>

          <div className="space-y-3">
            {peakHours.map(item => (
              <div key={item.hour} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400 font-mono">{item.hour}</span>
                  <span className="text-white font-medium">{item.value} users</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${(item.value / maxValue) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#0d1525] border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Access Distribution</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Main Library</span>
                  <span className="text-white font-medium">32%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '32%' }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Student Center</span>
                  <span className="text-white font-medium">28%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '28%' }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Science Building</span>
                  <span className="text-white font-medium">21%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '21%' }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Admin Building</span>
                  <span className="text-white font-medium">12%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '12%' }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Other Buildings</span>
                  <span className="text-white font-medium">7%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '7%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#0d1525] border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Weekly Trends</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Monday</span>
                <span className="text-white font-medium">8,234</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Tuesday</span>
                <span className="text-white font-medium">8,567</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Wednesday</span>
                <span className="text-white font-medium">8,892</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Thursday</span>
                <span className="text-white font-medium">8,445</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Friday</span>
                <span className="text-white font-medium">7,123</span>
              </div>
              <div className="flex items-center justify-between text-gray-600">
                <span className="text-sm">Saturday</span>
                <span className="font-medium">2,456</span>
              </div>
              <div className="flex items-center justify-between text-gray-600">
                <span className="text-sm">Sunday</span>
                <span className="font-medium">1,892</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#0d1525] border border-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Security Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-[#1a2332] rounded-lg">
            <p className="text-sm text-gray-400 mb-2">Alert Resolution Time</p>
            <p className="text-2xl font-bold text-white mb-1">12.5 min</p>
            <p className="text-xs text-green-400">-3.2 min from last week</p>
          </div>

          <div className="p-4 bg-[#1a2332] rounded-lg">
            <p className="text-sm text-gray-400 mb-2">False Positive Rate</p>
            <p className="text-2xl font-bold text-white mb-1">8.3%</p>
            <p className="text-xs text-green-400">-2.1% improvement</p>
          </div>

          <div className="p-4 bg-[#1a2332] rounded-lg">
            <p className="text-sm text-gray-400 mb-2">Anomaly Detection Rate</p>
            <p className="text-2xl font-bold text-white mb-1">94.7%</p>
            <p className="text-xs text-green-400">+1.4% increase</p>
          </div>
        </div>
      </div>
    </div>
  );
}
