import { Component, signal, computed, inject } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import { LogoComponent } from '../../components/logo.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, LogoComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
  authService = inject(AuthService);
  router = inject(Router);

  isSidebarCollapsed = signal<boolean>(false);
  isMobileDrawerOpen = signal<boolean>(false);
  isNotificationDropdownOpen = signal<boolean>(false);
  isProfileDropdownOpen = signal<boolean>(false);

  pageTitle = signal<string>('Dashboard');

  notifications = signal([
    { id: 1, text: 'AI recommendation: Database Normalization is ready!', unread: true, time: '2 mins ago' },
    { id: 2, text: 'You completed DBMS Lesson 4: 1NF', unread: false, time: '1 hour ago' },
    { id: 3, text: 'Quiz score available: 85% on Normalization', unread: false, time: '1 day ago' }
  ]);

  hasUnreadNotifications = computed(() => this.notifications().some(n => n.unread));

  constructor() {
    this.updateTitleByUrl(this.router.url);
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.updateTitleByUrl(event.urlAfterRedirects || event.url);
      this.closeOverlays();
    });
  }

  private updateTitleByUrl(url: string) {
    if (url.includes('/dashboard')) this.pageTitle.set('Dashboard');
    else if (url.includes('/courses')) this.pageTitle.set('My Courses');
    else if (url.includes('/lesson/')) this.pageTitle.set('Lesson Player');
    else if (url.includes('/quiz-result')) this.pageTitle.set('Quiz Results');
    else if (url.includes('/quiz/')) this.pageTitle.set('Quiz Player');
    else if (url.includes('/ai-tutor')) this.pageTitle.set('AI Tutor');
    else if (url.includes('/study-material')) this.pageTitle.set('AI Study Material');
    else if (url.includes('/profile')) this.pageTitle.set('My Profile');
    else if (url.includes('/settings')) this.pageTitle.set('Settings');
    else this.pageTitle.set('Adaptive Tutor');
  }

  toggleSidebar() {
    this.isSidebarCollapsed.update(v => !v);
  }

  toggleMobileDrawer() {
    this.isMobileDrawerOpen.update(v => !v);
  }

  toggleNotifications(event: MouseEvent) {
    event.stopPropagation();
    this.isNotificationDropdownOpen.update(v => !v);
    this.isProfileDropdownOpen.set(false);
  }

  toggleProfileDropdown(event: MouseEvent) {
    event.stopPropagation();
    this.isProfileDropdownOpen.update(v => !v);
    this.isNotificationDropdownOpen.set(false);
  }

  closeOverlays() {
    this.isNotificationDropdownOpen.set(false);
    this.isProfileDropdownOpen.set(false);
    this.isMobileDrawerOpen.set(false);
  }

  markAllAsRead() {
    this.notifications.update(notifs => 
      notifs.map(n => ({ ...n, unread: false }))
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
