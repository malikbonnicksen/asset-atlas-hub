
export interface CI {
  id: string;
  name: string;
  type: 'server' | 'application' | 'database' | 'network' | 'storage';
  status: 'active' | 'inactive' | 'maintenance' | 'retired';
  owner: string;
  environment: 'production' | 'development' | 'testing' | 'staging';
  lastUpdated: string;
}

export interface Audit {
  id: string;
  ciId: string;
  ciName: string;
  action: 'create' | 'update' | 'delete' | 'relate';
  user: string;
  timestamp: string;
  details: string;
}

export interface MetricData {
  label: string;
  value: number;
  change?: number;
  icon?: string;
  color?: string;
}

// Mock CI data
export const configItems: CI[] = [
  {
    id: 'ci-001',
    name: 'Web Application Server',
    type: 'server',
    status: 'active',
    owner: 'IT Infrastructure',
    environment: 'production',
    lastUpdated: '2023-04-15T10:30:00Z',
  },
  {
    id: 'ci-002',
    name: 'Customer Database',
    type: 'database',
    status: 'active',
    owner: 'Data Team',
    environment: 'production',
    lastUpdated: '2023-04-10T14:45:00Z',
  },
  {
    id: 'ci-003',
    name: 'CRM Application',
    type: 'application',
    status: 'maintenance',
    owner: 'Sales Operations',
    environment: 'production',
    lastUpdated: '2023-04-12T09:15:00Z',
  },
  {
    id: 'ci-004',
    name: 'Backup Storage Array',
    type: 'storage',
    status: 'active',
    owner: 'IT Infrastructure',
    environment: 'production',
    lastUpdated: '2023-04-05T16:20:00Z',
  },
  {
    id: 'ci-005',
    name: 'Core Network Switch',
    type: 'network',
    status: 'active',
    owner: 'Network Operations',
    environment: 'production',
    lastUpdated: '2023-04-08T11:10:00Z',
  },
  {
    id: 'ci-006',
    name: 'Dev Environment Server',
    type: 'server',
    status: 'active',
    owner: 'Development Team',
    environment: 'development',
    lastUpdated: '2023-04-14T13:25:00Z',
  },
  {
    id: 'ci-007',
    name: 'Legacy Inventory System',
    type: 'application',
    status: 'retired',
    owner: 'Warehouse Operations',
    environment: 'production',
    lastUpdated: '2023-02-20T08:30:00Z',
  },
  {
    id: 'ci-008',
    name: 'QA Testing Database',
    type: 'database',
    status: 'active',
    owner: 'QA Team',
    environment: 'testing',
    lastUpdated: '2023-04-13T15:40:00Z',
  }
];

// Mock audit logs
export const auditLogs: Audit[] = [
  {
    id: 'audit-001',
    ciId: 'ci-003',
    ciName: 'CRM Application',
    action: 'update',
    user: 'john.smith@example.com',
    timestamp: '2023-04-12T09:15:00Z',
    details: 'Updated status to maintenance',
  },
  {
    id: 'audit-002',
    ciId: 'ci-008',
    ciName: 'QA Testing Database',
    action: 'create',
    user: 'lisa.johnson@example.com',
    timestamp: '2023-04-13T15:40:00Z',
    details: 'Created new database configuration item',
  },
  {
    id: 'audit-003',
    ciId: 'ci-001',
    ciName: 'Web Application Server',
    action: 'update',
    user: 'admin@example.com',
    timestamp: '2023-04-15T10:30:00Z',
    details: 'Updated server specifications',
  },
  {
    id: 'audit-004',
    ciId: 'ci-007',
    ciName: 'Legacy Inventory System',
    action: 'update',
    user: 'mike.williams@example.com',
    timestamp: '2023-02-20T08:30:00Z',
    details: 'Changed status to retired',
  },
  {
    id: 'audit-005',
    ciId: 'ci-006',
    ciName: 'Dev Environment Server',
    action: 'create',
    user: 'emily.davis@example.com',
    timestamp: '2023-04-14T13:25:00Z',
    details: 'Provisioned new development server',
  }
];

// Mock metrics data
export const metricsData: MetricData[] = [
  {
    label: 'Total CIs',
    value: 127,
    change: 5,
    color: 'blue',
  },
  {
    label: 'Active CIs',
    value: 115,
    change: 3,
    color: 'green',
  },
  {
    label: 'In Maintenance',
    value: 7,
    change: 2,
    color: 'orange',
  },
  {
    label: 'Retired',
    value: 5,
    change: -1,
    color: 'gray',
  }
];

// CI type distribution for chart
export const ciTypeDistribution = [
  { name: 'Servers', value: 42 },
  { name: 'Applications', value: 38 },
  { name: 'Databases', value: 24 },
  { name: 'Network', value: 15 },
  { name: 'Storage', value: 8 }
];

// CI environment distribution for chart
export const ciEnvironmentDistribution = [
  { name: 'Production', value: 82 },
  { name: 'Development', value: 25 },
  { name: 'Testing', value: 12 },
  { name: 'Staging', value: 8 }
];
