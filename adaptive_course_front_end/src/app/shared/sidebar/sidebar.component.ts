import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  role: string | null = null;
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // A simple check on init. In a real app with reactive state, this would subscribe to an auth state observable
    this.isLoggedIn = this.authService.isLoggedIn();
    this.role = this.authService.getRole();
  }
}
