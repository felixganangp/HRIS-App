import {
  Component,
  ElementRef,
  HostListener,
  computed,
  forwardRef,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  imports: [CommonModule],
  selector: 'app-searchable-select-input',
  templateUrl: './searchable-select-input.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchableSelectInput),
      multi: true,
    },
  ],
})
export class SearchableSelectInput implements ControlValueAccessor {
  private readonly elementRef = inject(ElementRef);

  // Inputs & Two-way Model
  readonly options = input.required<string[]>();
  readonly placeholder = input<string>('Pilih opsi...');
  readonly searchPlaceholder = input<string>('Cari...');
  readonly emptyText = input<string>('Data tidak ditemukan.');
  readonly hasError = input<boolean>(false);
  readonly value = model<string>('');

  // Internal State
  readonly isOpen = signal(false);
  readonly searchTerm = signal('');
  readonly isDisabled = signal(false);

  readonly filteredOptions = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) return this.options();
    return this.options().filter((opt) => opt.toLowerCase().includes(term));
  });

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      if (this.isOpen()) {
        this.isOpen.set(false);
        this.onTouched();
      }
    }
  }

  toggleDropdown(): void {
    if (this.isDisabled()) return;
    this.isOpen.update((v) => !v);
    if (this.isOpen()) {
      this.searchTerm.set('');
    } else {
      this.onTouched();
    }
  }

  onSearchInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.searchTerm.set(val);
  }

  selectOption(option: string): void {
    this.value.set(option);
    this.onChange(option);
    this.onTouched();
    this.isOpen.set(false);
  }

  writeValue(val: string | null): void {
    this.value.set(val ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }
}
