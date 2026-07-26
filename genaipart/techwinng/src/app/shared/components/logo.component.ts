import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: true,
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.css'
})
export class LogoComponent {
  @Input() size: number = 32;
  @Input() showText: boolean = true;
  @Input() darkText: boolean = true;
}
