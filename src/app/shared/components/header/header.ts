import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EmployeeStateService } from '../../../core/services/employee-state.service';

@Component({
  imports: [CommonModule],
  selector: 'app-header',
  templateUrl: './header.html',
})
export class Header {
  readonly state = inject(EmployeeStateService);
  private router = inject(Router);

  onLogout(): void {
    this.state.logout();
    this.router.navigate(['/login']);
  }
}
