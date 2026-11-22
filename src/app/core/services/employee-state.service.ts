import { Injectable, computed, inject, signal } from '@angular/core';
import { Employee, ListFilterState, ToastNotification } from '../models/employee.model';
import { generateInitialEmployees } from '../data/dummy-employees.data';
import { BrowserStorageService } from '../providers/storage.provider';

const AUTH_STORAGE_KEY = 'hris_auth_user';

@Injectable({ providedIn: 'root' })
export class EmployeeStateService {
  private readonly storage = inject(BrowserStorageService);

  readonly currentUser = signal<string>(this.storage.getItem(AUTH_STORAGE_KEY) ?? '');
  readonly isAuthenticated = computed(() => this.currentUser().length > 0);

  readonly employees = signal<Employee[]>(generateInitialEmployees(108));

  readonly filterState = signal<ListFilterState>({
    searchQuery: '',
    selectedGroup: '',
    selectedStatus: '',
    sortField: 'firstName',
    sortDirection: 'asc',
    currentPage: 1,
    pageSize: 10,
  });

  readonly toasts = signal<ToastNotification[]>([]);
  private toastCounter = 0;

  readonly filteredEmployees = computed(() => {
    const list = this.employees();
    const state = this.filterState();
    const query = state.searchQuery.trim().toLowerCase();
    const groupFilter = state.selectedGroup;
    const statusFilter = state.selectedStatus;

    const filtered = list.filter((emp) => {
      const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();
      const matchesQuery =
        !query ||
        emp.username.toLowerCase().includes(query) ||
        emp.firstName.toLowerCase().includes(query) ||
        emp.lastName.toLowerCase().includes(query) ||
        fullName.includes(query) ||
        emp.email.toLowerCase().includes(query);

      const matchesGroup = !groupFilter || emp.group === groupFilter;
      const matchesStatus = !statusFilter || emp.status === statusFilter;

      return matchesQuery && matchesGroup && matchesStatus;
    });

    return [...filtered].sort((a, b) => {
      const field = state.sortField;
      const dir = state.sortDirection === 'asc' ? 1 : -1;
      const valA = a[field];
      const valB = b[field];

      if (valA instanceof Date && valB instanceof Date) {
        return (valA.getTime() - valB.getTime()) * dir;
      }
      if (typeof valA === 'number' && typeof valB === 'number') {
        return (valA - valB) * dir;
      }
      return String(valA).localeCompare(String(valB), 'id', { sensitivity: 'base' }) * dir;
    });
  });

  readonly totalItems = computed(() => this.filteredEmployees().length);

  readonly totalPages = computed(() => {
    const total = this.totalItems();
    const size = this.filterState().pageSize;
    return Math.max(1, Math.ceil(total / size));
  });

  readonly paginatedEmployees = computed(() => {
    const list = this.filteredEmployees();
    const state = this.filterState();
    const safePage = Math.min(Math.max(1, state.currentPage), this.totalPages());
    const startIndex = (safePage - 1) * state.pageSize;
    return list.slice(startIndex, startIndex + state.pageSize);
  });

  login(username: string, password: string): boolean {
    const validCredentials: Record<string, string> = {
      admin: 'admin123',
      user: 'user123',
    };

    const normalizedUser = username.trim().toLowerCase();
    if (validCredentials[normalizedUser] && validCredentials[normalizedUser] === password) {
      this.currentUser.set(normalizedUser);
      this.storage.setItem(AUTH_STORAGE_KEY, normalizedUser);
      this.showToast(
        'success',
        'Login Berhasil',
        `Selamat datang kembali, ${normalizedUser.toUpperCase()}!`,
      );
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUser.set('');
    this.storage.removeItem(AUTH_STORAGE_KEY);
  }

  getEmployeeByUsername(username: string): Employee | undefined {
    return this.employees().find((e) => e.username.toLowerCase() === username.toLowerCase());
  }

  updateFilters(partial: Partial<ListFilterState>): void {
    this.filterState.update((prev) => ({ ...prev, ...partial }));
  }

  resetFilters(): void {
    this.filterState.update((prev) => ({
      ...prev,
      searchQuery: '',
      selectedGroup: '',
      selectedStatus: '',
      currentPage: 1,
    }));
  }

  toggleSort(field: keyof Employee): void {
    this.filterState.update((prev) => {
      if (prev.sortField === field) {
        return {
          ...prev,
          sortDirection: prev.sortDirection === 'asc' ? 'desc' : 'asc',
          currentPage: 1,
        };
      }
      return {
        ...prev,
        sortField: field,
        sortDirection: 'asc',
        currentPage: 1,
      };
    });
  }

  addEmployee(newEmployee: Employee): void {
    this.employees.update((list) => [newEmployee, ...list]);
    this.showToast(
      'success',
      'Data Karyawan Disimpan',
      `Karyawan ${newEmployee.firstName} ${newEmployee.lastName} (@${newEmployee.username}) berhasil ditambahkan.`,
    );
  }

  triggerDummyEdit(employee: Employee): void {
    this.showToast(
      'warning',
      'Aksi Edit Dipicu',
      `Mode Edit untuk karyawan "${employee.firstName} ${employee.lastName}" (@${employee.username}) - Departemen ${employee.group}.`,
    );
  }

  triggerDummyDelete(employee: Employee): void {
    this.showToast(
      'danger',
      'Aksi Delete Dipicu',
      `Peringatan Hapus untuk data karyawan "${employee.firstName} ${employee.lastName}" (@${employee.username}) - Status ${employee.status}.`,
    );
  }

  showToast(type: 'warning' | 'danger' | 'success', title: string, message: string): void {
    const id = ++this.toastCounter;
    this.toasts.update((list) => [...list, { id, type, title, message }]);
    setTimeout(() => this.dismissToast(id), 4500);
  }

  dismissToast(id: number): void {
    this.toasts.update((list) => list.filter((t) => t.id !== id));
  }
}
