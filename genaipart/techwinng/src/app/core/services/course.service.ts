import { Injectable, signal, computed } from '@angular/core';

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  duration: string;
  videoUrl: string;
  completed: boolean;
  notes: string;
  resources: { name: string; type: string; action: string }[];
  description: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  lessonsCompleted: number;
  totalLessons: number;
  image: string; // SVG icon identifier or path
  progress: number;
  lessons: Lesson[];
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private coursesSignal = signal<Course[]>([]);

  courses = computed(() => this.coursesSignal());

  constructor() {
    this.initializeMockCourses();
  }

  private initializeMockCourses() {
    const mockCourses: Course[] = [
      {
        id: 'dbms',
        title: 'Database Systems',
        description: 'Learn DBMS concepts and practice SQL queries and normalization theories.',
        category: 'Information Technology',
        difficulty: 'Intermediate',
        lessonsCompleted: 4,
        totalLessons: 8,
        image: 'database',
        progress: 50,
        lessons: [
          {
            id: 'dbms_1',
            courseId: 'dbms',
            title: '1. Introduction',
            duration: '05:34',
            videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
            completed: true,
            notes: 'Database Management System (DBMS) is software used to manage databases. Relational database management systems (RDBMS) store data in tabular format.',
            resources: [{ name: 'DBMS Notes.pdf', type: 'PDF', action: 'View' }],
            description: 'This introductory lesson covers the basic terminology and architecture of DBMS.'
          },
          {
            id: 'dbms_2',
            courseId: 'dbms',
            title: '2. Functional Dependency',
            duration: '12:15',
            videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
            completed: true,
            notes: 'Functional dependency (FD) is a constraint that specifies the relation of one attribute to another in a database. It is denoted as A -> B.',
            resources: [{ name: 'FD Exercises.pdf', type: 'PDF', action: 'View' }],
            description: 'Understand the concept of functional dependencies and how they help eliminate redundancy.'
          },
          {
            id: 'dbms_3',
            courseId: 'dbms',
            title: '3. Normal Forms',
            duration: '18:45',
            videoUrl: 'https://www.w3schools.com/html/movie.mp4',
            completed: true,
            notes: 'Normal forms are guidelines to design databases that prevent redundancies and anomalies. The normal forms include 1NF, 2NF, 3NF, BCNF, 4NF, and 5NF.',
            resources: [
              { name: 'Normalization Video', type: 'Watch', action: 'Watch' },
              { name: 'Examples & Practice', type: 'Open', action: 'Open' }
            ],
            description: 'In this lesson, you will learn about Normalization, its need and different normal forms in DBMS.'
          },
          {
            id: 'dbms_4',
            courseId: 'dbms',
            title: '4. 1NF',
            duration: '08:20',
            videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
            completed: true,
            notes: 'A relation is in 1NF if all its attributes contain atomic values. No repeating groups are allowed.',
            resources: [{ name: '1NF Cheat Sheet.pdf', type: 'PDF', action: 'View' }],
            description: 'Explore the First Normal Form and rules for atomicity in database schemas.'
          },
          {
            id: 'dbms_5',
            courseId: 'dbms',
            title: '5. 2NF',
            duration: '11:10',
            videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
            completed: false,
            notes: 'A relation is in 2NF if it is in 1NF and no non-prime attribute is partially dependent on any candidate key.',
            resources: [{ name: '2NF Exercises.pdf', type: 'PDF', action: 'View' }],
            description: 'Understand Second Normal Form and how to resolve partial functional dependencies.'
          },
          {
            id: 'dbms_6',
            courseId: 'dbms',
            title: '6. 3NF',
            duration: '14:30',
            videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
            completed: false,
            notes: 'A relation is in 3NF if it is in 2NF and no non-prime attribute is transitively dependent on the primary key. If A -> B and B -> C, then A -> C is transitive.',
            resources: [
              { name: '3NF Notes.pdf', type: 'PDF', action: 'View' },
              { name: 'Normalization Video', type: 'Watch', action: 'Watch' }
            ],
            description: 'Explore Third Normal Form (3NF) and the elimination of transitive dependencies.'
          },
          {
            id: 'dbms_7',
            courseId: 'dbms',
            title: '7. BCNF',
            duration: '16:05',
            videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
            completed: false,
            notes: 'Boyce-Codd Normal Form is a stronger version of 3NF. A relation is in BCNF if for every functional dependency A -> B, A is a super key.',
            resources: [{ name: 'BCNF Problems.pdf', type: 'PDF', action: 'View' }],
            description: 'Examine BCNF and how it deals with overlapping candidate keys.'
          },
          {
            id: 'dbms_8',
            courseId: 'dbms',
            title: '8. Summary',
            duration: '06:40',
            videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
            completed: false,
            notes: 'A recap of database design rules, functional dependencies, and normal forms up to BCNF.',
            resources: [{ name: 'Full Summary Slides.pdf', type: 'PDF', action: 'View' }],
            description: 'A comprehensive summary of database design guidelines and normalization.'
          }
        ]
      },
      {
        id: 'dsa',
        title: 'Data Structures & Algorithms',
        description: 'Learn fundamental data structures like Arrays, Linked Lists, Trees, and Graphs, and algorithmic design.',
        category: 'Computer Science',
        difficulty: 'Advanced',
        lessonsCompleted: 6,
        totalLessons: 8,
        image: 'code',
        progress: 75,
        lessons: [
          {
            id: 'dsa_1',
            courseId: 'dsa',
            title: '1. Arrays & Vectors',
            duration: '10:05',
            videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
            completed: true,
            notes: 'Arrays store elements in contiguous memory. Random access is O(1). Insertion/Deletion can be O(N).',
            resources: [],
            description: 'Learn array operations and contiguous memory.'
          },
          {
            id: 'dsa_2',
            courseId: 'dsa',
            title: '2. Linked Lists',
            duration: '14:20',
            videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
            completed: true,
            notes: 'Linked Lists are sequential nodes containing data and a reference to the next node.',
            resources: [],
            description: 'Implement singly and doubly linked lists.'
          },
          {
            id: 'dsa_3',
            courseId: 'dsa',
            title: '3. Stacks & Queues',
            duration: '12:50',
            videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
            completed: true,
            notes: 'Stack is LIFO (Last In First Out). Queue is FIFO (First In First Out). Both support O(1) operations.',
            resources: [],
            description: 'Understand linear structures and their use cases.'
          },
          {
            id: 'dsa_4',
            courseId: 'dsa',
            title: '4. Binary Trees',
            duration: '18:15',
            videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
            completed: true,
            notes: 'Trees represent hierarchical structures. A binary tree has at most two children per node.',
            resources: [],
            description: 'Learn binary tree traversals (preorder, inorder, postorder).'
          },
          {
            id: 'dsa_5',
            courseId: 'dsa',
            title: '5. Binary Search Trees',
            duration: '15:40',
            videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
            completed: true,
            notes: 'BST properties: Left child < Parent; Right child > Parent. Average search complexity is O(log N).',
            resources: [],
            description: 'Explore insertion, deletion, and searching in a BST.'
          },
          {
            id: 'dsa_6',
            courseId: 'dsa',
            title: '6. Heap & Priority Queue',
            duration: '13:10',
            videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
            completed: true,
            notes: 'Heaps are complete binary trees. Max-heap: Parent >= Children. Min-heap: Parent <= Children.',
            resources: [],
            description: 'Understand binary heaps and sorting.'
          },
          {
            id: 'dsa_7',
            courseId: 'dsa',
            title: '7. Graph Representation',
            duration: '22:00',
            videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
            completed: false,
            notes: 'Graphs consist of vertices and edges. Represented via Adjacency Matrix or Adjacency List.',
            resources: [],
            description: 'Implement graphs and understand adjacency data structures.'
          },
          {
            id: 'dsa_8',
            courseId: 'dsa',
            title: '8. Graph Traversals',
            duration: '25:30',
            videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
            completed: false,
            notes: 'BFS uses a Queue (shortest path in unweighted graphs). DFS uses Recursion/Stack.',
            resources: [],
            description: 'Implement BFS and DFS graph search algorithms.'
          }
        ]
      },
      {
        id: 'os',
        title: 'Operating Systems',
        description: 'Understand OS concepts, process management, CPU scheduling, memory management, and file systems.',
        category: 'Computer Science',
        difficulty: 'Intermediate',
        lessonsCompleted: 3,
        totalLessons: 5,
        image: 'cpu',
        progress: 60,
        lessons: [
          {
            id: 'os_1',
            courseId: 'os',
            title: '1. Introduction to OS',
            duration: '08:45',
            videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
            completed: true,
            notes: 'Operating system acts as an intermediary between users and hardware. Manages resources.',
            resources: [],
            description: 'Understand OS types, kernel modes, and system calls.'
          },
          {
            id: 'os_2',
            courseId: 'os',
            title: '2. Process & Threads',
            duration: '15:10',
            videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
            completed: true,
            notes: 'Process is a program in execution. Thread is a lightweight process sharing memory space.',
            resources: [],
            description: 'Explore process states, PCB, and thread models.'
          },
          {
            id: 'os_3',
            courseId: 'os',
            title: '3. CPU Scheduling',
            duration: '21:30',
            videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
            completed: true,
            notes: 'Scheduling algorithms include FCFS, SJF, SRTF, Priority, and Round Robin.',
            resources: [],
            description: 'Analyze scheduling metrics like waiting time, turnaround time.'
          },
          {
            id: 'os_4',
            courseId: 'os',
            title: '4. Memory Management',
            duration: '19:40',
            videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
            completed: false,
            notes: 'Techniques include Paging, Segmentation, and Virtual Memory with Page Replacement.',
            resources: [],
            description: 'Learn logical vs physical address spaces and page tables.'
          },
          {
            id: 'os_5',
            courseId: 'os',
            title: '5. Deadlocks',
            duration: '16:15',
            videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
            completed: false,
            notes: 'Deadlock conditions: Mutual exclusion, Hold & wait, No preemption, Circular wait.',
            resources: [],
            description: 'Explore Banker\'s algorithm for deadlock avoidance.'
          }
        ]
      },
      {
        id: 'ml',
        title: 'Machine Learning',
        description: 'Introduction to ML algorithms, supervised and unsupervised learning, and model evaluations.',
        category: 'Data Science',
        difficulty: 'Advanced',
        lessonsCompleted: 2,
        totalLessons: 4,
        image: 'brain',
        progress: 50,
        lessons: [
          {
            id: 'ml_1',
            courseId: 'ml',
            title: '1. Introduction to ML',
            duration: '09:20',
            videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
            completed: true,
            notes: 'ML allows systems to learn from data. Divided into Supervised, Unsupervised, and Reinforcement learning.',
            resources: [],
            description: 'Understand basic classification, regression, and clustering concepts.'
          },
          {
            id: 'ml_2',
            courseId: 'ml',
            title: '2. Linear Regression',
            duration: '18:15',
            videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
            completed: true,
            notes: 'Supervised method modeling relationship between dependent and independent variables: Y = mX + c.',
            resources: [],
            description: 'Learn cost functions, gradient descent, and evaluation metrics (R2, RMSE).'
          },
          {
            id: 'ml_3',
            courseId: 'ml',
            title: '3. Logistic Regression',
            duration: '16:50',
            videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
            completed: false,
            notes: 'Used for binary classification. Output is mapped between 0 and 1 using Sigmoid function.',
            resources: [],
            description: 'Analyze classification thresholds, confusion matrix, precision, recall.'
          },
          {
            id: 'ml_4',
            courseId: 'ml',
            title: '4. Decision Trees',
            duration: '20:10',
            videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
            completed: false,
            notes: 'Splits data based on feature conditions. Entropy, Information Gain, and Gini Impurity calculations.',
            resources: [],
            description: 'Learn node splits, tree depth, overfitting, and pruning.'
          }
        ]
      },
      {
        id: 'webdev',
        title: 'Web Development',
        description: 'Build modern and responsive websites using modern HTML, CSS, JavaScript, and framework concepts.',
        category: 'Web Technology',
        difficulty: 'Beginner',
        lessonsCompleted: 4,
        totalLessons: 5,
        image: 'code-tags',
        progress: 80,
        lessons: [
          {
            id: 'web_1',
            courseId: 'webdev',
            title: '1. HTML5 & CSS3 Basics',
            duration: '11:45',
            videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
            completed: true,
            notes: 'HTML defines structure (semantic tags). CSS adds styles, layouts (Flexbox, Grid), and media queries.',
            resources: [],
            description: 'Learn responsive layout foundations and core structure markup.'
          },
          {
            id: 'web_2',
            courseId: 'webdev',
            title: '2. JavaScript Core',
            duration: '22:30',
            videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
            completed: true,
            notes: 'JS controls page behaviors. Includes Variables, Objects, DOM manipulation, Promises, and async operations.',
            resources: [],
            description: 'Master async/await, event listeners, dynamic DOM updates.'
          },
          {
            id: 'web_3',
            courseId: 'webdev',
            title: '3. Responsive Designs',
            duration: '14:15',
            videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
            completed: true,
            notes: 'Responsive design adjusts layouts dynamically based on viewport widths using responsive breakpoints.',
            resources: [],
            description: 'Understand viewport scaling, fluid typography, and columns.'
          },
          {
            id: 'web_4',
            courseId: 'webdev',
            title: '4. Web APIs & Fetching',
            duration: '17:50',
            videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
            completed: true,
            notes: 'Integrating external data via RESTful API services using fetch and HTTP protocols.',
            resources: [],
            description: 'Understand GET, POST methods, JSON conversions, and headers.'
          },
          {
            id: 'web_5',
            courseId: 'webdev',
            title: '5. Single Page Apps',
            duration: '25:10',
            videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
            completed: false,
            notes: 'SPAs load a single HTML document and dynamically update contents. Routing is client-managed.',
            resources: [],
            description: 'Introduce client-side routing, virtual DOM, and component state.'
          }
        ]
      }
    ];
    this.coursesSignal.set(mockCourses);
  }

  getCourseById(id: string): Course | undefined {
    return this.courses().find(c => c.id === id);
  }

  markLessonComplete(courseId: string, lessonId: string) {
    this.coursesSignal.update(courses => {
      return courses.map(course => {
        if (course.id === courseId) {
          const updatedLessons = course.lessons.map(lesson => {
            if (lesson.id === lessonId) {
              return { ...lesson, completed: true };
            }
            return lesson;
          });
          const completedCount = updatedLessons.filter(l => l.completed).length;
          const progress = Math.round((completedCount / course.totalLessons) * 100);
          return {
            ...course,
            lessons: updatedLessons,
            lessonsCompleted: completedCount,
            progress: progress
          };
        }
        return course;
      });
    });
  }
}
