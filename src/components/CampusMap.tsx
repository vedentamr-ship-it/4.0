import { MapPin, Building2, Users, AlertTriangle, Wifi } from 'lucide-react';
import { mockEntities, mockAlerts, mockAccessLogs } from '../data/mockData';

export function CampusMap() {
  const buildings = [
    { id: 1, name: 'Main Library', x: 20, y: 30, active: 247, alerts: 1 },
    { id: 2, name: 'Science Building', x: 60, y: 25, active: 183, alerts: 2 },
    { id: 3, name: 'Admin Building', x: 35, y: 60, active: 94, alerts: 0 },
    { id: 4, name: 'Student Center', x: 70, y: 65, active: 312, alerts: 1 },
    { id: 5, name: 'Engineering Hall', x: 45, y: 45, active: 156, alerts: 0 },
  ];

  const totalActive = buildings.reduce((sum, b) => sum + b.active, 0);
  const totalAlerts = buildings.reduce((sum, b) => sum + b.alerts, 0);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Campus Activity Map</h1>
        <p className="text-gray-400">Real-time visualization of entity locations and activities</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-[#0d1525] border border-gray-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Active on Campus</p>
              <p className="text-2xl font-bold text-white">{totalActive}</p>
            </div>
            <Users className="w-8 h-8 text-green-400" />
          </div>
        </div>

        <div className="bg-[#0d1525] border border-gray-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Buildings</p>
              <p className="text-2xl font-bold text-white">{buildings.length}</p>
            </div>
            <Building2 className="w-8 h-8 text-cyan-400" />
          </div>
        </div>

        <div className="bg-[#0d1525] border border-gray-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Active Alerts</p>
              <p className="text-2xl font-bold text-white">{totalAlerts}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
        </div>

        <div className="bg-[#0d1525] border border-gray-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">WiFi APs</p>
              <p className="text-2xl font-bold text-white">42</p>
            </div>
            <Wifi className="w-8 h-8 text-blue-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-[#0d1525] border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Campus Overview</h2>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-400">Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-400">Alerts</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-400">Critical</span>
                </div>
              </div>
            </div>

            <div className="relative bg-gradient-to-br from-[#1a2332] to-[#0d1525] rounded-xl p-8 aspect-[16/10] overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(59, 130, 246) 1px, transparent 0)',
                backgroundSize: '40px 40px'
              }}></div>

              {buildings.map(building => (
                <div
                  key={building.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{ left: `${building.x}%`, top: `${building.y}%` }}
                >
                  <div className="relative">
                    <div className={`w-20 h-20 rounded-xl flex items-center justify-center transition-all ${
                      building.alerts > 0
                        ? 'bg-red-500/20 border-2 border-red-500 animate-pulse'
                        : 'bg-green-500/20 border-2 border-green-500 hover:scale-110'
                    }`}>
                      <Building2 className={`w-8 h-8 ${
                        building.alerts > 0 ? 'text-red-400' : 'text-green-400'
                      }`} />
                    </div>

                    {building.alerts > 0 && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                        {building.alerts}
                      </div>
                    )}

                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-[#0d1525] border border-gray-700 rounded-lg p-3 whitespace-nowrap shadow-xl">
                        <p className="font-semibold text-white mb-1">{building.name}</p>
                        <div className="space-y-1 text-xs">
                          <p className="text-green-400">Active: {building.active}</p>
                          {building.alerts > 0 && (
                            <p className="text-red-400">Alerts: {building.alerts}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="absolute bottom-4 left-4 bg-[#0d1525]/80 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
                <p className="text-xs text-gray-400 mb-2">Campus Legend</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs">
                    <Building2 className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300">Normal Operations</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Building2 className="w-4 h-4 text-red-400" />
                    <span className="text-gray-300">Active Alerts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#0d1525] border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Building Status</h3>
            <div className="space-y-3">
              {buildings.map(building => (
                <div key={building.id} className="p-3 bg-[#1a2332] rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-white text-sm">{building.name}</span>
                    {building.alerts > 0 && (
                      <span className="flex items-center gap-1 text-xs text-red-400">
                        <AlertTriangle className="w-3 h-3" />
                        {building.alerts}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Active: {building.active}</span>
                    <span className={`px-2 py-1 rounded ${
                      building.alerts > 0
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-green-500/20 text-green-400'
                    }`}>
                      {building.alerts > 0 ? 'Alert' : 'Normal'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0d1525] border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Capacity</span>
                <span className="text-white font-medium">5,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Current Occupancy</span>
                <span className="text-white font-medium">{totalActive}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Utilization</span>
                <span className="text-green-400 font-medium">
                  {Math.round((totalActive / 5000) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-cyan-500 h-2 rounded-full"
                  style={{ width: `${(totalActive / 5000) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
