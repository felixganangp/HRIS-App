import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeStateService } from '../../core/services/employee-state.service';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-login',
  templateUrl: './login.html',
})
export class Login {
  private fb = inject(FormBuilder);
  private state = inject(EmployeeStateService);
  private router = inject(Router);

  readonly showPassword = signal(false);
  readonly authError = signal<string | null>(null);

  readonly loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  isFieldInvalid(field: string): boolean {
    const ctrl = this.loginForm.get(field);
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched));
  }

  togglePassword(): void {
    this.showPassword.update((v) => !v);
  }

  fillCredentials(username: string, password: string): void {
    this.loginForm.patchValue({ username, password });
    this.authError.set(null);
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.authError.set('Silakan lengkapi Username dan Password terlebih dahulu.');
      return;
    }

    const { username, password } = this.loginForm.value;
    if (this.state.login(username, password)) {
      this.router.navigate(['/employees']);
    } else {
      this.authError.set('Username atau Password tidak valid. Silakan periksa kembali.');
    }
  }
}
