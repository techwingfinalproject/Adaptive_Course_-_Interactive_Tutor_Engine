import { Injectable, signal, computed } from '@angular/core';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  phone?: string;
  batch?: string;
  joinDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSignal = signal<User | null>(null);

  currentUser = computed(() => this.currentUserSignal());
  isLoggedIn = computed(() => this.currentUserSignal() !== null);

  constructor() {
    this.loadSession();
  }

  private loadSession() {
    const savedUser = localStorage.getItem('adaptive_tutor_user');
    if (savedUser) {
      try {
        this.currentUserSignal.set(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('adaptive_tutor_user');
      }
    }
  }

  login(email: string, name: string = 'Jithendra Kumar'): boolean {
    const mockUser: User = {
      id: 'usr_1',
      name: name,
      email: email,
      avatar: 'assets/images/avatar.svg',
      role: 'Student',
      phone: '+91 98765 43210',
      batch: '2023 - B.Tech Data Science',
      joinDate: 'July 2024'
    };
    localStorage.setItem('adaptive_tutor_user', JSON.stringify(mockUser));
    this.currentUserSignal.set(mockUser);
    return true;
  }

  signup(name: string, email: string): boolean {
    return this.login(email, name);
  }

  forgotPassword(email: string): boolean {
    // Mock sending email
    return true;
  }

  logout() {
    localStorage.removeItem('adaptive_tutor_user');
    this.currentUserSignal.set(null);
  }

  updateProfile(updatedUser: Partial<User>) {
    const current = this.currentUserSignal();
    if (current) {
      const newUser = { ...current, ...updatedUser };
      localStorage.setItem('adaptive_tutor_user', JSON.stringify(newUser));
      this.currentUserSignal.set(newUser);
    }
  }
}
