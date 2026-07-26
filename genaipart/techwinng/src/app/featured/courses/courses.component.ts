import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CourseService, Course } from '../../core/services/course.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  courseService = inject(CourseService);

  searchQuery = signal<string>('');
  selectedCategory = signal<string>('All');

  categories = ['All', 'Computer Science', 'Information Technology', 'Data Science', 'Web Technology'];

  filteredCourses = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const category = this.selectedCategory();
    const allCourses = this.courseService.courses();

    return allCourses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(query) || 
                            course.description.toLowerCase().includes(query);
      const matchesCategory = category === 'All' || course.category === category;
      return matchesSearch && matchesCategory;
    });
  });

  setCategory(category: string) {
    this.selectedCategory.set(category);
  }
}
