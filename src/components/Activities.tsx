import { Activity, MapPin, Wifi, Clock, Filter } from 'lucide-react';
import { useState } from 'react';
import { mockActivities, mockEntities } from '../data/mockData';

export function Activities() {
  const [filterType, setFilterType] = useState<string>('all');

  const filteredActivities = filterType === 'all'
    ? mockActivities
    : mockActivities.filter(a => a.type === filterType);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Activity Timeline</h1>
        <p className="text-gray-400">Real-time monitoring of all campus activities</p>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex gap-2">
          {['all', 'access', 'wifi'].map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterType === type
                  ? 'bg-cyan-500 text-white'
                  : 'bg-[#0d1525] text-gray-400 hover:bg-[#1a2332]'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-[#0d1525] border border-gray-700 rounded-lg text-gray-300 hover:border-cyan-500 transition-colors ml-auto">
          <Filter className="w-4 h-4" />
          <span>Advanced Filters</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-[#0d1525] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Access Events</h3>
            <div className="p-2 bg-green-500/10 rounded-lg">
              <MapPin className="w-5 h-5 text-green-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white mb-2">4,821</p>
          <p className="text-sm text-gray-400">Today</p>
        </div>

        <div className="bg-[#0d1525] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">WiFi Sessions</h3>
            <div className="p-2 bg-cyan-500/10 rounded-lg">
              <Wifi className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white mb-2">3,608</p>
          <p className="text-sm text-gray-400">Active now</p>
        </div>

        <div className="bg-[#0d1525] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Avg Duration</h3>
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Clock className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white mb-2">3.4h</p>
          <p className="text-sm text-gray-400">Per session</p>
        </div>
      </div>

      <div className="bg-[#0d1525] border border-gray-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-800">
          <h3 className="text-lg font-semibold text-white">Recent Activities</h3>
        </div>
        <div className="divide-y divide-gray-800">
          {filteredActivities.map(activity => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button className="px-6 py-3 bg-[#0d1525] border border-gray-700 rounded-lg text-gray-300 hover:border-cyan-500 transition-colors">
          Load More Activities
        </button>
      </div>
    </div>
  );
}

interface ActivityItemProps {
  activity: any;
}

function ActivityItem({ activity }: ActivityItemProps) {
  const isAccessEvent = activity.type === 'access';

  return (
    <div className="p-6 hover:bg-[#1a2332] transition-colors">
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg ${
          isAccessEvent ? 'bg-green-500/10' : 'bg-cyan-500/10'
        }`}>
          {isAccessEvent ? (
            <MapPin className="w-5 h-5 text-green-400" />
          ) : (
            <Wifi className="w-5 h-5 text-cyan-400" />
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="font-medium text-white mb-1">{activity.entity_name}</h4>
              <p className="text-sm text-gray-400">{activity.details}</p>
            </div>
            <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
              {new Date(activity.timestamp).toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-400">{activity.location}</span>
            </div>
            <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
              isAccessEvent
                ? 'bg-green-500/20 text-green-400'
                : 'bg-cyan-500/20 text-cyan-400'
            }`}>
              {isAccessEvent ? 'Access Control' : 'WiFi Network'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
