import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeStateService } from '../../../../core/services/employee-state.service';
import { StatusBadge } from '../../../../shared/components/status-badge/status-badge';
import { RupiahPipe } from '../../../../shared/pipes/rupiah.pipe';
import { DateTimePipe } from '../../../../shared/pipes/date-time.pipe';

@Component({
  imports: [CommonModule, StatusBadge, RupiahPipe, DateTimePipe],
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.html',
})
export class EmployeeDetail {
  readonly state = inject(EmployeeStateService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  readonly employee = computed(() => {
    const username = this.route.snapshot.paramMap.get('username') || '';
    return this.state.getEmployeeByUsername(username);
  });

  goBack(): void {
    this.router.navigate(['/employees']);
  }
}
