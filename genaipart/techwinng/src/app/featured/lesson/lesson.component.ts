import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CourseService, Course, Lesson } from '../../core/services/course.service';

interface ForumComment {
  id: number;
  user: string;
  avatarInitials: string;
  text: string;
  time: string;
}

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.css'
})
export class LessonComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  courseService = inject(CourseService);

  course = signal<Course | undefined>(undefined);
  activeLesson = signal<Lesson | undefined>(undefined);
  activeTab = signal<string>('Overview');

  newCommentText = signal<string>('');
  comments = signal<ForumComment[]>([
    { id: 1, user: 'Amit Sharma', avatarInitials: 'AS', text: 'This explanation of 3NF was super helpful! I finally understand the difference between transitive and partial dependencies.', time: '2 hours ago' },
    { id: 2, user: 'Priya Patel', avatarInitials: 'PP', text: 'Are there any sample questions for BCNF? That part was slightly rushed in the slides.', time: '1 day ago' }
  ]);

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const lessonId = params.get('id');
      if (lessonId) {
        // Find course containing this lesson
        const allCourses = this.courseService.courses();
        let foundCourse: Course | undefined;
        let foundLesson: Lesson | undefined;

        for (const c of allCourses) {
          const l = c.lessons.find(lesson => lesson.id === lessonId);
          if (l) {
            foundCourse = c;
            foundLesson = l;
            break;
          }
        }

        if (foundCourse && foundLesson) {
          this.course.set(foundCourse);
          this.activeLesson.set(foundLesson);
        }
      }
    });
  }

  setTab(tab: string) {
    this.activeTab.set(tab);
  }

  markAsComplete() {
    const c = this.course();
    const l = this.activeLesson();
    if (c && l) {
      this.courseService.markLessonComplete(c.id, l.id);
      
      // Update local states
      const updatedCourse = this.courseService.getCourseById(c.id);
      if (updatedCourse) {
        this.course.set(updatedCourse);
        const updatedLesson = updatedCourse.lessons.find(lesson => lesson.id === l.id);
        if (updatedLesson) {
          this.activeLesson.set(updatedLesson);
        }
      }
    }
  }

  submitComment() {
    const text = this.newCommentText().trim();
    if (text) {
      const newComment: ForumComment = {
        id: Date.now(),
        user: 'Jithendra Kumar',
        avatarInitials: 'JK',
        text,
        time: 'Just now'
      };
      this.comments.update(c => [newComment, ...c]);
      this.newCommentText.set('');
    }
  }
}
