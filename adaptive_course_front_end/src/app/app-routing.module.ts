import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { AiAgentComponent } from './components/ai-agent/ai-agent.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';
import { CourseLearningComponent } from './components/course-learning/course-learning.component';
import { CourseCreatorComponent } from './components/course-creator/course-creator.component';
import { AuthGuard } from './guards/auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { StudentRegistrationComponent } from './components/student-registration/student-registration.component';
import { QuizViewComponent } from './components/quiz-view/quiz-view.component';
import { CourseManagerComponent } from './components/course-manager/course-manager.component';
import { StudentProfileComponent } from './components/student-profile/student-profile.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { TeacherProfileComponent } from './components/teacher-profile/teacher-profile.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminManageUsersComponent } from './components/admin-manage-users/admin-manage-users.component';
import { studentGuard } from './guards/student.guard';
import { teacherGuard } from './guards/teacher.guard';
import { adminGuard } from './guards/admin.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: StudentRegistrationComponent },
  { path: 'courses', component: CourseListComponent },
  { path: 'ai-agent', component: AiAgentComponent },
  { path: 'student/dashboard', component: StudentDashboardComponent, canActivate: [studentGuard] },
  { path: 'student/profile', component: StudentProfileComponent, canActivate: [studentGuard] },
  { path: 'student/notifications', component: NotificationsComponent, canActivate: [studentGuard] },
  { path: 'student/lesson/:lessonId/quiz', component: QuizViewComponent, canActivate: [studentGuard] },
  { path: 'teacher/dashboard', component: TeacherDashboardComponent, canActivate: [teacherGuard] },
  { path: 'teacher/profile', component: TeacherProfileComponent, canActivate: [teacherGuard] },
  { path: 'teacher/courses/new', component: CourseCreatorComponent, canActivate: [teacherGuard] },
  { path: 'teacher/courses/:id/manage', component: CourseManagerComponent, canActivate: [teacherGuard] },
  { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [adminGuard] },
  { path: 'admin/users', component: AdminManageUsersComponent, canActivate: [adminGuard] },
  { path: 'course/:id/learn', component: CourseLearningComponent, canActivate: [AuthGuard] },
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
