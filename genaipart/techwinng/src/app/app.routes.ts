import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';

// Import components
import { LoginComponent } from './featured/auth/login/login.component';
import { SignupComponent } from './featured/auth/signup/signup.component';
import { ForgotPasswordComponent } from './featured/auth/forgot-password/forgot-password.component';
import { DashboardComponent } from './featured/dashboard/dashboard.component';
import { CoursesComponent } from './featured/courses/courses.component';
import { CourseDetailsComponent } from './featured/course-details/course-details.component';
import { LessonComponent } from './featured/lesson/lesson.component';
import { QuizComponent } from './featured/quiz/quiz.component';
import { QuizResultComponent } from './featured/quiz-result/quiz-result.component';
import { AITutorComponent } from './featured/ai-tutor/ai-tutor.component';
import { StudyMaterialComponent } from './featured/study-material/study-material.component';
import { ProfileComponent } from './featured/profile/profile.component';
import { SettingsComponent } from './featured/settings/settings.component';
import { NotFoundComponent } from './featured/not-found/not-found.component';

export const routes: Routes = [
  // Guest Routes (Auth Layout)
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent }
    ]
  },

  // Protected Dashboard Routes (Main Layout)
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'courses', component: CoursesComponent },
      { path: 'courses/:id', component: CourseDetailsComponent },
      { path: 'lesson/:id', component: LessonComponent },
      { path: 'quiz/:id', component: QuizComponent },
      { path: 'quiz-result', component: QuizResultComponent },
      { path: 'ai-tutor', component: AITutorComponent },
      { path: 'study-material', component: StudyMaterialComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'settings', component: SettingsComponent },
      { path: '404', component: NotFoundComponent }
    ]
  },

  // Wildcard Fallback redirects to 404 page
  { path: '**', redirectTo: '404' }
];
