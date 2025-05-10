import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' = 'button';
  @Input() variant: 'primary' | 'secondary' | 'outline' | 'danger' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() isLoading = false;
  @Input() disabled = false;
  @Output() onClick = new EventEmitter<MouseEvent>();


  get buttonClasses(): string {
    const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

    const sizeClasses = {
      sm: 'h-9 px-3 text-xs',
      md: 'h-10 px-4 py-2', // Adjusted padding slightly for consistency
      lg: 'h-11 px-8 py-3'
    };

    // Updated variant classes for the dark theme
    const variantClasses = {
      primary: 'bg-gray-700 text-white hover:bg-gray-600 focus-visible:ring-blue-500 shadow-sm', // Dark background, white text, subtle shadow
      secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus-visible:ring-gray-500', // Kept light for contrast, adjust if needed
      outline: 'border border-gray-500 text-gray-300 bg-transparent hover:bg-gray-700 hover:text-white focus-visible:ring-gray-500', // Light border, transparent background, light text, dark hover
      danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500 shadow-sm' // Red background, white text, subtle shadow
    };

    return `${baseClasses} ${sizeClasses[this.size]} ${variantClasses[this.variant]}`;
  }

}
