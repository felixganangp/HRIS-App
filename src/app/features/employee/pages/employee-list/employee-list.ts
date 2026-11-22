import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  Employee,
  EMPLOYEE_GROUPS,
  EMPLOYEE_STATUSES,
} from '../../../../core/models/employee.model';
import { EmployeeStateService } from '../../../../core/services/employee-state.service';
import { Pagination } from '../../../../shared/components/pagination/pagination';
import { StatusBadge } from '../../../../shared/components/status-badge/status-badge';
import { RupiahPipe } from '../../../../shared/pipes/rupiah.pipe';
import { DateTimePipe } from '../../../../shared/pipes/date-time.pipe';
import { EmployeeFilterBar } from '../../components/employee-filter-bar/employee-filter-bar';

@Component({
  imports: [CommonModule, Pagination, StatusBadge, EmployeeFilterBar, RupiahPipe, DateTimePipe],
  selector: 'app-employee-list',
  templateUrl: './employee-list.html',
})
export class EmployeeList {
  readonly state = inject(EmployeeStateService);
  private router = inject(Router);

  readonly groups = EMPLOYEE_GROUPS;
  readonly statuses = EMPLOYEE_STATUSES;

  goToAdd(): void {
    this.router.navigate(['/employees/add']);
  }

  goToDetail(emp: Employee): void {
    this.router.navigate(['/employees', emp.username]);
  }

  getSortIcon(field: keyof Employee): string {
    const f = this.state.filterState();
    if (f.sortField !== field) return '↕';
    return f.sortDirection === 'asc' ? '↑' : '↓';
  }
}
