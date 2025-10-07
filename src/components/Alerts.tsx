import { useState } from 'react';
import { AlertTriangle, CheckCircle, XCircle, Clock, Eye } from 'lucide-react';
import { mockAlerts, mockEntities } from '../data/mockData';
import { Alert } from '../types';

interface AlertsProps {
  onViewProfile: (entityId: string) => void;
}

export function Alerts({ onViewProfile }: AlertsProps) {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [severityFilter, setSeverityFilter] = useState<string>('all');

  const filteredAlerts = alerts.filter(alert => {
    const matchesStatus = statusFilter === 'all' || alert.status === statusFilter;
    const matchesSeverity = severityFilter === 'all' || alert.severity === severityFilter;
    return matchesStatus && matchesSeverity;
  });

  const handleApprove = (alertId: string) => {
    setAlerts(alerts.map(alert =>
      alert.id === alertId
        ? { ...alert, status: 'approved', reviewed_at: new Date().toISOString(), reviewed_by: 'Current User' }
        : alert
    ));
  };

  const handleEscalate = (alertId: string) => {
    setAlerts(alerts.map(alert =>
      alert.id === alertId
        ? { ...alert, status: 'escalated', reviewed_at: new Date().toISOString(), reviewed_by: 'Current User' }
        : alert
    ));
  };

  const pendingCount = alerts.filter(a => a.status === 'pending').length;
  const criticalCount = alerts.filter(a => a.severity === 'critical').length;
  const highCount = alerts.filter(a => a.severity === 'high').length;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Security Alerts</h1>
        <p className="text-gray-400">Monitor and respond to security events</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#0d1525] border border-gray-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Pending</p>
              <p className="text-2xl font-bold text-white">{pendingCount}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-400" />
          </div>
        </div>

        <div className="bg-[#0d1525] border border-gray-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Critical</p>
              <p className="text-2xl font-bold text-white">{criticalCount}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
        </div>

        <div className="bg-[#0d1525] border border-gray-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">High Priority</p>
              <p className="text-2xl font-bold text-white">{highCount}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-orange-400" />
          </div>
        </div>

        <div className="bg-[#0d1525] border border-gray-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Resolved</p>
              <p className="text-2xl font-bold text-white">{alerts.filter(a => a.status === 'approved').length}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex gap-2">
          <span className="text-sm text-gray-400 self-center mr-2">Status:</span>
          {['all', 'pending', 'reviewed', 'approved', 'escalated'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === status
                  ? 'bg-cyan-500 text-white'
                  : 'bg-[#0d1525] text-gray-400 hover:bg-[#1a2332]'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex gap-2 ml-auto">
          <span className="text-sm text-gray-400 self-center mr-2">Severity:</span>
          {['all', 'critical', 'high', 'medium', 'low'].map(severity => (
            <button
              key={severity}
              onClick={() => setSeverityFilter(severity)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                severityFilter === severity
                  ? 'bg-cyan-500 text-white'
                  : 'bg-[#0d1525] text-gray-400 hover:bg-[#1a2332]'
              }`}
            >
              {severity.charAt(0).toUpperCase() + severity.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredAlerts.map(alert => (
          <AlertCard
            key={alert.id}
            alert={alert}
            onApprove={handleApprove}
            onEscalate={handleEscalate}
            onViewProfile={onViewProfile}
          />
        ))}
      </div>

      {filteredAlerts.length === 0 && (
        <div className="text-center py-12 bg-[#0d1525] border border-gray-800 rounded-xl">
          <AlertTriangle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No alerts match your filters</p>
        </div>
      )}
    </div>
  );
}

interface AlertCardProps {
  alert: Alert;
  onApprove: (alertId: string) => void;
  onEscalate: (alertId: string) => void;
  onViewProfile: (entityId: string) => void;
}

function AlertCard({ alert, onApprove, onEscalate, onViewProfile }: AlertCardProps) {
  const entity = mockEntities.find(e => e.id === alert.entity_id);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'border-red-500 bg-red-500/5';
      case 'high': return 'border-orange-500 bg-orange-500/5';
      case 'medium': return 'border-yellow-500 bg-yellow-500/5';
      default: return 'border-blue-500 bg-blue-500/5';
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 text-red-400';
      case 'high': return 'bg-orange-500/20 text-orange-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-blue-500/20 text-blue-400';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400';
      case 'reviewed': return 'bg-blue-500/20 text-blue-400';
      case 'approved': return 'bg-green-500/20 text-green-400';
      case 'escalated': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className={`bg-[#0d1525] border-l-4 ${getSeverityColor(alert.severity)} rounded-xl p-6`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-white">{alert.title}</h3>
            <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getSeverityBadge(alert.severity)}`}>
              {alert.severity.toUpperCase()}
            </span>
            <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getStatusBadge(alert.status)}`}>
              {alert.status}
            </span>
          </div>
          <p className="text-gray-400 mb-3">{alert.description}</p>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>Detected: {new Date(alert.detected_at).toLocaleString()}</span>
            {alert.reviewed_at && (
              <span>Reviewed: {new Date(alert.reviewed_at).toLocaleString()}</span>
            )}
            {alert.reviewed_by && (
              <span>By: {alert.reviewed_by}</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400">Related Entity:</span>
          {entity && (
            <button
              onClick={() => onViewProfile(entity.id)}
              className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <span className="font-medium">{entity.name}</span>
              <span className="text-gray-500">({entity.entity_id})</span>
              <Eye className="w-4 h-4" />
            </button>
          )}
        </div>

        {alert.status === 'pending' && (
          <div className="flex gap-2">
            <button
              onClick={() => onApprove(alert.id)}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Approve</span>
            </button>
            <button
              onClick={() => onEscalate(alert.id)}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              <XCircle className="w-4 h-4" />
              <span>Escalate</span>
            </button>
          </div>
        )}
      </div>

      {Object.keys(alert.metadata).length > 0 && (
        <div className="mt-4 p-4 bg-[#1a2332] rounded-lg">
          <p className="text-sm text-gray-400 mb-2 font-medium">Additional Details:</p>
          <div className="space-y-1">
            {Object.entries(alert.metadata).map(([key, value]) => (
              <div key={key} className="text-sm">
                <span className="text-gray-500">{key.replace(/_/g, ' ')}:</span>{' '}
                <span className="text-gray-300">{typeof value === 'object' ? JSON.stringify(value) : String(value)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
