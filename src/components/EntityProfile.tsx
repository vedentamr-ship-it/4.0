import { ArrowLeft, User, Mail, CreditCard, Calendar, Laptop, Activity, AlertTriangle } from 'lucide-react';
import { mockEntities, mockDevices, mockAccessLogs, mockWiFiLogs, mockAlerts } from '../data/mockData';

interface EntityProfileProps {
  entityId: string;
  onClose: () => void;
}

export function EntityProfile({ entityId, onClose }: EntityProfileProps) {
  const entity = mockEntities.find(e => e.id === entityId);
  const devices = mockDevices.filter(d => d.entity_id === entityId);
  const accessLogs = mockAccessLogs.filter(a => a.entity_id === entityId);
  const wifiLogs = mockWiFiLogs.filter(w => w.entity_id === entityId);
  const alerts = mockAlerts.filter(a => a.entity_id === entityId);

  if (!entity) return null;

  return (
    <div className="p-8">
      <button
        onClick={onClose}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Entities</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-[#0d1525] border border-gray-800 rounded-xl p-6">
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mb-4">
                <User className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-1">{entity.name}</h2>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                entity.role === 'student' ? 'bg-blue-500/20 text-blue-400' :
                entity.role === 'faculty' ? 'bg-purple-500/20 text-purple-400' :
                'bg-green-500/20 text-green-400'
              }`}>
                {entity.role}
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="w-5 h-5 text-gray-500" />
                <span className="text-sm">{entity.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <CreditCard className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-mono">{entity.entity_id}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Calendar className="w-5 h-5 text-gray-500" />
                <span className="text-sm">Member since {new Date(entity.created_at).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Status</span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  entity.status === 'active' ? 'bg-green-500/20 text-green-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {entity.status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Registered Devices</span>
                <span className="text-white font-medium">{devices.length}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0d1525] border border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Laptop className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-semibold text-white">Registered Devices</h3>
            </div>
            <div className="space-y-3">
              {devices.map(device => (
                <div key={device.id} className="flex items-center justify-between p-4 bg-[#1a2332] rounded-lg">
                  <div>
                    <p className="font-medium text-white">{device.device_name}</p>
                    <p className="text-sm text-gray-400 font-mono">{device.mac_address}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">{device.device_type}</p>
                    <p className="text-xs text-gray-500">Last seen: {new Date(device.last_seen).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0d1525] border border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="w-5 h-5 text-green-400" />
              <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
            </div>
            <div className="space-y-3">
              {accessLogs.map(log => (
                <div key={log.id} className="flex items-start gap-3 p-4 bg-[#1a2332] rounded-lg">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="font-medium text-white">{log.location}</p>
                    <p className="text-sm text-gray-400">{log.access_type === 'entry' ? 'Entry' : 'Exit'} swipe</p>
                  </div>
                  <span className="text-sm text-gray-500">{new Date(log.timestamp).toLocaleString()}</span>
                </div>
              ))}
              {wifiLogs.map(log => (
                <div key={log.id} className="flex items-start gap-3 p-4 bg-[#1a2332] rounded-lg">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="font-medium text-white">{log.location}</p>
                    <p className="text-sm text-gray-400">WiFi connection</p>
                  </div>
                  <span className="text-sm text-gray-500">{new Date(log.connected_at).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {alerts.length > 0 && (
            <div className="bg-[#0d1525] border border-gray-800 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <h3 className="text-lg font-semibold text-white">Related Alerts</h3>
              </div>
              <div className="space-y-3">
                {alerts.map(alert => (
                  <div key={alert.id} className="p-4 bg-[#1a2332] rounded-lg border-l-4 border-red-500">
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-medium text-white">{alert.title}</p>
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                        alert.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                        alert.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {alert.severity}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">{alert.description}</p>
                    <p className="text-xs text-gray-500 mt-2">{new Date(alert.detected_at).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
