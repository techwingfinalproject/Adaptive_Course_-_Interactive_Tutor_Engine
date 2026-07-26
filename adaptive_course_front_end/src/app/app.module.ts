import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { AiAgentComponent } from './components/ai-agent/ai-agent.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { CourseLearningComponent } from './components/course-learning/course-learning.component';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';
import { CourseCreatorComponent } from './components/course-creator/course-creator.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { StudentRegistrationComponent } from './components/student-registration/student-registration.component';
import { QuizViewComponent } from './components/quiz-view/quiz-view.component';
import { StudentProfileComponent } from './components/student-profile/student-profile.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { TeacherProfileComponent } from './components/teacher-profile/teacher-profile.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminManageUsersComponent } from './components/admin-manage-users/admin-manage-users.component';
import { CourseManagerComponent } from './components/course-manager/course-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CourseListComponent,
    AiAgentComponent,
    StudentDashboardComponent,
    CourseLearningComponent,
    TeacherDashboardComponent,
    CourseCreatorComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    LoadingSpinnerComponent,
    NotFoundComponent,
    AccessDeniedComponent,
    StudentRegistrationComponent,
    QuizViewComponent,
    StudentProfileComponent,
    NotificationsComponent,
    TeacherProfileComponent,
    AdminDashboardComponent,
    AdminManageUsersComponent,
    CourseManagerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
