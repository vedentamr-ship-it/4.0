import { useState } from 'react';
import { Search, Filter, User, Eye } from 'lucide-react';
import { mockEntities, mockDevices } from '../data/mockData';
import { Entity } from '../types';

interface EntitiesProps {
  onViewProfile: (entityId: string) => void;
}

export function Entities({ onViewProfile }: EntitiesProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');

  const filteredEntities = mockEntities.filter(entity => {
    const matchesSearch = entity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entity.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entity.entity_id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || entity.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getDeviceCount = (entityId: string) => {
    return mockDevices.filter(d => d.entity_id === entityId).length;
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Entity Registry</h1>
        <p className="text-gray-400">Manage and monitor all campus entities</p>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name, ID card, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-[#0d1525] border border-gray-700 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        <button className="flex items-center gap-2 px-6 py-3 bg-[#0d1525] border border-gray-700 rounded-lg text-gray-300 hover:border-cyan-500 transition-colors">
          <Filter className="w-5 h-5" />
          <span>Filter</span>
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        {['all', 'student', 'faculty', 'staff'].map(role => (
          <button
            key={role}
            onClick={() => setRoleFilter(role)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              roleFilter === role
                ? 'bg-cyan-500 text-white'
                : 'bg-[#0d1525] text-gray-400 hover:bg-[#1a2332]'
            }`}
          >
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </button>
        ))}
      </div>

      <div className="bg-[#0d1525] border border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400 uppercase tracking-wider">Entity</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400 uppercase tracking-wider">ID Card</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400 uppercase tracking-wider">Role</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400 uppercase tracking-wider">Devices</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEntities.map(entity => (
                <EntityRow
                  key={entity.id}
                  entity={entity}
                  deviceCount={getDeviceCount(entity.id)}
                  onViewProfile={onViewProfile}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredEntities.length === 0 && (
        <div className="text-center py-12">
          <User className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No entities found matching your search</p>
        </div>
      )}
    </div>
  );
}

interface EntityRowProps {
  entity: Entity;
  deviceCount: number;
  onViewProfile: (entityId: string) => void;
}

function EntityRow({ entity, deviceCount, onViewProfile }: EntityRowProps) {
  return (
    <tr className="border-b border-gray-800 hover:bg-[#1a2332] transition-colors">
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-medium text-white">{entity.name}</p>
            <p className="text-sm text-gray-400">{entity.email}</p>
          </div>
        </div>
      </td>
      <td className="py-4 px-6">
        <span className="font-mono text-gray-300">{entity.entity_id}</span>
      </td>
      <td className="py-4 px-6">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
          entity.role === 'student' ? 'bg-blue-500/20 text-blue-400' :
          entity.role === 'faculty' ? 'bg-purple-500/20 text-purple-400' :
          'bg-green-500/20 text-green-400'
        }`}>
          {entity.role}
        </span>
      </td>
      <td className="py-4 px-6">
        <span className="text-gray-300">{deviceCount} registered</span>
      </td>
      <td className="py-4 px-6">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
          entity.status === 'active' ? 'bg-green-500/20 text-green-400' :
          entity.status === 'inactive' ? 'bg-gray-500/20 text-gray-400' :
          'bg-red-500/20 text-red-400'
        }`}>
          {entity.status}
        </span>
      </td>
      <td className="py-4 px-6">
        <button
          onClick={() => onViewProfile(entity.id)}
          className="text-cyan-400 hover:text-cyan-300 font-medium text-sm flex items-center gap-1 transition-colors"
        >
          <Eye className="w-4 h-4" />
          View Profile
        </button>
      </td>
    </tr>
  );
}
