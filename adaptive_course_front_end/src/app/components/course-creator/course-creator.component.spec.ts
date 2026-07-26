import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCreatorComponent } from './course-creator.component';

describe('CourseCreatorComponent', () => {
  let component: CourseCreatorComponent;
  let fixture: ComponentFixture<CourseCreatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseCreatorComponent]
    });
    fixture = TestBed.createComponent(CourseCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
