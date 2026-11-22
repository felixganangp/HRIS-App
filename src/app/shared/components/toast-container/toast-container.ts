import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastNotification } from '../../../core/models/employee.model';

@Component({
  imports: [CommonModule],
  selector: 'app-toast-container',
  styleUrl: './toast-container.css',
  templateUrl: './toast-container.html',
})
export class ToastContainer {
  readonly toasts = input.required<ToastNotification[]>();
  readonly dismiss = output<number>();
}
