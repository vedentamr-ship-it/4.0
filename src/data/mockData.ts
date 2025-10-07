import { Entity, Device, AccessLog, WiFiLog, Alert, ActivityEvent } from '../types';

export const mockEntities: Entity[] = [
  {
    id: '1',
    entity_id: 'ST-2024-001',
    name: 'John Doe',
    email: 'john.doe@campus.edu',
    role: 'student',
    status: 'active',
    created_at: '2024-01-15T08:00:00Z',
    updated_at: '2024-10-07T08:00:00Z'
  },
  {
    id: '2',
    entity_id: 'ST-2024-002',
    name: 'Jane Smith',
    email: 'jane.smith@campus.edu',
    role: 'student',
    status: 'active',
    created_at: '2024-01-15T08:00:00Z',
    updated_at: '2024-10-07T08:00:00Z'
  },
  {
    id: '3',
    entity_id: 'FC-2024-001',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@campus.edu',
    role: 'faculty',
    status: 'active',
    created_at: '2024-01-15T08:00:00Z',
    updated_at: '2024-10-07T08:00:00Z'
  },
  {
    id: '4',
    entity_id: 'ST-2024-003',
    name: 'Michael Chen',
    email: 'michael.chen@campus.edu',
    role: 'student',
    status: 'active',
    created_at: '2024-01-15T08:00:00Z',
    updated_at: '2024-10-07T08:00:00Z'
  },
  {
    id: '5',
    entity_id: 'SF-2024-001',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@campus.edu',
    role: 'staff',
    status: 'active',
    created_at: '2024-01-15T08:00:00Z',
    updated_at: '2024-10-07T08:00:00Z'
  },
  {
    id: '6',
    entity_id: 'ST-2024-004',
    name: 'David Kim',
    email: 'david.kim@campus.edu',
    role: 'student',
    status: 'active',
    created_at: '2024-01-15T08:00:00Z',
    updated_at: '2024-10-07T08:00:00Z'
  }
];

export const mockDevices: Device[] = [
  {
    id: 'd1',
    entity_id: '1',
    mac_address: 'AA:BB:CC:DD:EE:01',
    device_type: 'laptop',
    device_name: 'John-MacBook',
    registered_at: '2024-01-15T08:00:00Z',
    last_seen: '2024-10-07T14:30:00Z'
  },
  {
    id: 'd2',
    entity_id: '1',
    mac_address: 'AA:BB:CC:DD:EE:02',
    device_type: 'phone',
    device_name: 'John-iPhone',
    registered_at: '2024-01-15T08:00:00Z',
    last_seen: '2024-10-07T14:30:00Z'
  },
  {
    id: 'd3',
    entity_id: '2',
    mac_address: 'AA:BB:CC:DD:EE:03',
    device_type: 'laptop',
    device_name: 'Jane-Surface',
    registered_at: '2024-01-15T08:00:00Z',
    last_seen: '2024-10-07T13:45:00Z'
  },
  {
    id: 'd4',
    entity_id: '3',
    mac_address: 'AA:BB:CC:DD:EE:04',
    device_type: 'laptop',
    device_name: 'Sarah-ThinkPad',
    registered_at: '2024-01-15T08:00:00Z',
    last_seen: '2024-10-07T15:00:00Z'
  }
];

export const mockAccessLogs: AccessLog[] = [
  {
    id: 'a1',
    entity_id: '1',
    location: 'Main Library - Entrance',
    access_type: 'entry',
    timestamp: '2024-10-07T08:30:00Z',
    card_id: 'ST-2024-001'
  },
  {
    id: 'a2',
    entity_id: '2',
    location: 'Science Building - Lab 301',
    access_type: 'entry',
    timestamp: '2024-10-07T09:15:00Z',
    card_id: 'ST-2024-002'
  },
  {
    id: 'a3',
    entity_id: '3',
    location: 'Admin Building - Office 205',
    access_type: 'entry',
    timestamp: '2024-10-07T08:00:00Z',
    card_id: 'FC-2024-001'
  },
  {
    id: 'a4',
    entity_id: '4',
    location: 'Student Center - Gym',
    access_type: 'entry',
    timestamp: '2024-10-07T10:00:00Z',
    card_id: 'ST-2024-003'
  }
];

export const mockWiFiLogs: WiFiLog[] = [
  {
    id: 'w1',
    device_id: 'd1',
    entity_id: '1',
    location: 'Main Library - Floor 2',
    connected_at: '2024-10-07T08:35:00Z',
    disconnected_at: '2024-10-07T12:30:00Z',
    session_duration: 14100
  },
  {
    id: 'w2',
    device_id: 'd3',
    entity_id: '2',
    location: 'Science Building - Lab 301',
    connected_at: '2024-10-07T09:00:00Z',
    disconnected_at: null,
    session_duration: 0
  },
  {
    id: 'w3',
    device_id: 'd4',
    entity_id: '3',
    location: 'Admin Building - Floor 2',
    connected_at: '2024-10-07T08:05:00Z',
    disconnected_at: null,
    session_duration: 0
  }
];

export const mockAlerts: Alert[] = [
  {
    id: 'alert1',
    entity_id: '1',
    alert_type: 'missing_link',
    severity: 'medium',
    status: 'pending',
    title: 'WiFi Connection Without Entry Swipe',
    description: 'WiFi session detected at Main Library without corresponding entry swipe',
    detected_at: '2024-10-07T08:35:00Z',
    reviewed_at: null,
    reviewed_by: null,
    metadata: {
      location: 'Main Library',
      wifi_time: '2024-10-07T08:35:00Z',
      expected_swipe_window: '2024-10-07T08:30:00Z - 2024-10-07T08:35:00Z'
    }
  },
  {
    id: 'alert2',
    entity_id: '4',
    alert_type: 'unusual_pattern',
    severity: 'high',
    status: 'pending',
    title: 'Unusual Access Pattern Detected',
    description: 'Multiple rapid access attempts across different buildings',
    detected_at: '2024-10-07T10:05:00Z',
    reviewed_at: null,
    reviewed_by: null,
    metadata: {
      locations: ['Student Center', 'Science Building', 'Library'],
      time_window: '15 minutes',
      normal_pattern: 'Single building per day'
    }
  },
  {
    id: 'alert3',
    entity_id: '2',
    alert_type: 'after_hours',
    severity: 'critical',
    status: 'reviewed',
    title: 'After Hours Lab Access',
    description: 'Access to restricted lab area after authorized hours',
    detected_at: '2024-10-06T23:45:00Z',
    reviewed_at: '2024-10-07T08:00:00Z',
    reviewed_by: 'Security Officer Martinez',
    metadata: {
      location: 'Science Building - Lab 301',
      authorized_hours: '6:00 AM - 10:00 PM',
      access_time: '11:45 PM'
    }
  },
  {
    id: 'alert4',
    entity_id: '6',
    alert_type: 'tailgating',
    severity: 'medium',
    status: 'pending',
    title: 'Potential Tailgating Event',
    description: 'Two entries detected within 2 seconds without separate swipes',
    detected_at: '2024-10-07T09:30:00Z',
    reviewed_at: null,
    reviewed_by: null,
    metadata: {
      location: 'Admin Building - Entrance',
      first_swipe: 'ST-2024-004',
      time_gap: '1.8 seconds'
    }
  }
];

export const mockActivities: ActivityEvent[] = [
  {
    id: 'act1',
    type: 'access',
    entity_id: '1',
    entity_name: 'John Doe',
    location: 'Main Library - Entrance',
    timestamp: '2024-10-07T08:30:00Z',
    details: 'Entry swipe'
  },
  {
    id: 'act2',
    type: 'wifi',
    entity_id: '1',
    entity_name: 'John Doe',
    location: 'Main Library - Floor 2',
    timestamp: '2024-10-07T08:35:00Z',
    details: 'WiFi connected - John-MacBook'
  },
  {
    id: 'act3',
    type: 'access',
    entity_id: '3',
    entity_name: 'Dr. Sarah Johnson',
    location: 'Admin Building - Office 205',
    timestamp: '2024-10-07T08:00:00Z',
    details: 'Entry swipe'
  },
  {
    id: 'act4',
    type: 'wifi',
    entity_id: '3',
    entity_name: 'Dr. Sarah Johnson',
    location: 'Admin Building - Floor 2',
    timestamp: '2024-10-07T08:05:00Z',
    details: 'WiFi connected - Sarah-ThinkPad'
  },
  {
    id: 'act5',
    type: 'access',
    entity_id: '2',
    entity_name: 'Jane Smith',
    location: 'Science Building - Lab 301',
    timestamp: '2024-10-07T09:15:00Z',
    details: 'Entry swipe'
  }
];
