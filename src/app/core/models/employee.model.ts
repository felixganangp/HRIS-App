export interface Employee {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  basicSalary: number;
  status: 'Active' | 'Inactive' | 'Probation';
  group: string;
  description: Date;
}

export interface ToastNotification {
  id: number;
  type: 'warning' | 'danger' | 'success';
  title: string;
  message: string;
}

export interface ListFilterState {
  searchQuery: string;
  selectedGroup: string;
  selectedStatus: string;
  sortField: keyof Employee;
  sortDirection: 'asc' | 'desc';
  currentPage: number;
  pageSize: number;
}

export const EMPLOYEE_GROUPS: string[] = [
  'Engineering',
  'Human Resources',
  'Finance',
  'Marketing',
  'Sales',
  'Product Design',
  'Operations',
  'Customer Support',
  'Legal',
  'IT Infrastructure',
];

export const EMPLOYEE_STATUSES: Array<'Active' | 'Inactive' | 'Probation'> = [
  'Active',
  'Inactive',
  'Probation',
];
