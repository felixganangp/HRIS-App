import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {
  Employee,
  EMPLOYEE_GROUPS,
  EMPLOYEE_STATUSES,
} from '../../../../core/models/employee.model';
import { EmployeeStateService } from '../../../../core/services/employee-state.service';
import { SearchableSelectInput } from '../../../../shared/components/searchable-select-input/searchable-select-input';

@Component({
  imports: [CommonModule, ReactiveFormsModule, SearchableSelectInput],
  selector: 'app-employee-add',
  templateUrl: './employee-add.html',
})
export class EmployeeAdd {
  private fb = inject(FormBuilder);
  private state = inject(EmployeeStateService);
  private router = inject(Router);

  readonly statuses = EMPLOYEE_STATUSES;
  readonly allGroups = EMPLOYEE_GROUPS;

  readonly formErrorBanner = signal<string | null>(null);
  readonly maxTodayDateTime = this.getLocalDateTimeString(new Date());

  readonly employeeForm: FormGroup = this.fb.group({
    username: [
      '',
      [Validators.required, Validators.minLength(3), this.uniqueUsernameValidator.bind(this)],
    ],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    birthDate: ['', [Validators.required, this.maxTodayValidator.bind(this)]],
    basicSalary: [null, [Validators.required, Validators.min(1)]],
    status: ['', [Validators.required]],
    group: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });

  private getLocalDateTimeString(date: Date): string {
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  private maxTodayValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    return new Date(control.value).getTime() > Date.now() ? { futureDate: true } : null;
  }

  private uniqueUsernameValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const val = String(control.value).trim().toLowerCase();
    return this.state.employees().some((e) => e.username.toLowerCase() === val)
      ? { duplicate: true }
      : null;
  }

  hasError(fieldName: string): boolean {
    const ctrl = this.employeeForm.get(fieldName);
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched));
  }

  onCancel(): void {
    this.router.navigate(['/employees']);
  }

  onSave(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      this.formErrorBanner.set('Data tidak dapat disimpan. Mohon lengkapi seluruh field wajib.');
      return;
    }

    const raw = this.employeeForm.value;
    const newEmployee: Employee = {
      username: String(raw.username).trim(),
      firstName: String(raw.firstName).trim(),
      lastName: String(raw.lastName).trim(),
      email: String(raw.email).trim(),
      birthDate: new Date(raw.birthDate),
      basicSalary: Number(raw.basicSalary),
      status: raw.status,
      group: raw.group,
      description: new Date(raw.description),
    };

    this.state.addEmployee(newEmployee);
  }
}
