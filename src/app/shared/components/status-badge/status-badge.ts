import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type EmployeeStatus = 'Active' | 'Inactive' | 'Probation';

@Component({
  imports: [CommonModule],
  selector: 'app-status-badge',
  templateUrl: './status-badge.html',
})
export class StatusBadge {
  readonly status = input.required<EmployeeStatus>();
  readonly variant = input<'soft' | 'solid'>('soft');

  readonly badgeClasses = computed(() => {
    const currentStatus = this.status();
    const isSolid = this.variant() === 'solid';

    if (isSolid) {
      switch (currentStatus) {
        case 'Active':
          return 'px-3.5 py-1 text-xs uppercase tracking-wider shadow-xs bg-emerald-400 text-emerald-950';
        case 'Probation':
          return 'px-3.5 py-1 text-xs uppercase tracking-wider shadow-xs bg-amber-300 text-amber-950';
        case 'Inactive':
          return 'px-3.5 py-1 text-xs uppercase tracking-wider shadow-xs bg-rose-400 text-rose-950';
      }
    }

    // Default 'soft'
    switch (currentStatus) {
      case 'Active':
        return 'px-2.5 py-0.5 text-xs bg-emerald-100 text-emerald-800';
      case 'Probation':
        return 'px-2.5 py-0.5 text-xs bg-amber-100 text-amber-800';
      case 'Inactive':
        return 'px-2.5 py-0.5 text-xs bg-rose-100 text-rose-800';
    }
  });
}
