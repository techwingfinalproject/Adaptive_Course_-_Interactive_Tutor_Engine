import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CourseService, Course } from '../../core/services/course.service';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private courseService = inject(CourseService);

  course = signal<Course | undefined>(undefined);

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        const found = this.courseService.getCourseById(id);
        this.course.set(found);
      }
    });
  }
}
