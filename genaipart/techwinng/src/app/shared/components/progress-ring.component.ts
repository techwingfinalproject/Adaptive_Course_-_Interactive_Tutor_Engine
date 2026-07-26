import { Component, Input, computed } from '@angular/core';

@Component({
  selector: 'app-progress-ring',
  standalone: true,
  templateUrl: './progress-ring.component.html',
  styleUrl: './progress-ring.component.css'
})
export class ProgressRingComponent {
  @Input() progress: number = 0; // Value from 0 to 100
  @Input() size: number = 120;
  @Input() strokeWidth: number = 10;
  @Input() strokeColor: string = 'var(--color-primary)';
  @Input() textColor: string = 'var(--color-text)';
  @Input() subtitle: string = '';

  radius = computed(() => (this.size - this.strokeWidth) / 2);
  circumference = computed(() => 2 * Math.PI * this.radius());
  strokeDashoffset = computed(() => {
    const clampedProgress = Math.max(0, Math.min(100, this.progress));
    return this.circumference() - (clampedProgress / 100) * this.circumference();
  });
}
