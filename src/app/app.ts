import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { EmployeeStateService } from './core/services/employee-state.service';
import { Header } from './shared/components/header/header';
import { ToastContainer } from './shared/components/toast-container/toast-container';

@Component({
  imports: [CommonModule, RouterOutlet, Header, ToastContainer],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  readonly state = inject(EmployeeStateService);
  private router = inject(Router);

  onLogout(): void {
    this.state.logout();
    this.router.navigate(['/login']);
  }
}
