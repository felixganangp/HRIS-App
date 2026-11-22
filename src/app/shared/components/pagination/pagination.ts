import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-pagination',
  templateUrl: './pagination.html',
})
export class Pagination {
  readonly mode = input<'top' | 'bottom'>('bottom');
  readonly currentPage = input.required<number>();
  readonly pageSize = input.required<number>();
  readonly totalItems = input.required<number>();
  readonly pageSizeOptions = input<number[]>([5, 10, 25, 50]);
  readonly itemLabel = input<string>('data');

  readonly pageChange = output<number>();
  readonly pageSizeChange = output<number>();

  readonly selectId = `page-size-${Math.random().toString(36).substring(2, 7)}`;

  readonly totalPages = computed(() => {
    return Math.max(1, Math.ceil(this.totalItems() / this.pageSize()));
  });

  readonly safeCurrentPage = computed(() => {
    return Math.min(Math.max(1, this.currentPage()), this.totalPages());
  });

  readonly displayStart = computed(() => {
    if (this.totalItems() === 0) return 0;
    return (this.safeCurrentPage() - 1) * this.pageSize() + 1;
  });

  readonly displayEnd = computed(() => {
    return Math.min(this.safeCurrentPage() * this.pageSize(), this.totalItems());
  });

  readonly visiblePages = computed(() => {
    const total = this.totalPages();
    const current = this.safeCurrentPage();
    const pages: number[] = [];

    let start = Math.max(1, current - 2);
    let end = Math.min(total, start + 4);
    if (end - start < 4) {
      start = Math.max(1, end - 4);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  });

  onPageSizeSelect(event: Event): void {
    const newSize = Number((event.target as HTMLSelectElement).value);
    this.pageSizeChange.emit(newSize);
  }

  emitPage(page: number): void {
    const clamped = Math.min(Math.max(1, page), this.totalPages());
    this.pageChange.emit(clamped);
  }
}
