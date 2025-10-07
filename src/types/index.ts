export interface Entity {
  id: string;
  entity_id: string;
  name: string;
  email: string;
  role: 'student' | 'staff' | 'faculty' | 'visitor';
  status: 'active' | 'inactive' | 'suspended';
  created_at: string;
  updated_at: string;
}

export interface Device {
  id: string;
  entity_id: string;
  mac_address: string;
  device_type: 'laptop' | 'phone' | 'tablet' | 'unknown';
  device_name: string;
  registered_at: string;
  last_seen: string;
}

export interface AccessLog {
  id: string;
  entity_id: string;
  location: string;
  access_type: 'entry' | 'exit';
  timestamp: string;
  card_id: string;
}

export interface WiFiLog {
  id: string;
  device_id: string;
  entity_id: string;
  location: string;
  connected_at: string;
  disconnected_at: string | null;
  session_duration: number;
}

export interface Alert {
  id: string;
  entity_id: string;
  alert_type: 'missing_link' | 'unauthorized_access' | 'unusual_pattern' | 'tailgating' | 'after_hours';
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'reviewed' | 'approved' | 'escalated' | 'resolved';
  title: string;
  description: string;
  detected_at: string;
  reviewed_at: string | null;
  reviewed_by: string | null;
  metadata: Record<string, any>;
}

export interface ActivityEvent {
  id: string;
  type: 'access' | 'wifi';
  entity_id: string;
  entity_name: string;
  location: string;
  timestamp: string;
  details: string;
}
