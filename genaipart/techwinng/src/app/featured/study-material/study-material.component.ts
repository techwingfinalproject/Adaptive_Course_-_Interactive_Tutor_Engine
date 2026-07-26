import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-study-material',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './study-material.component.html',
  styleUrl: './study-material.component.css'
})
export class StudyMaterialComponent {
  showPracticeQuestions = signal<boolean>(false);

  resources = [
    { name: '3NF Notes (PDF)', type: 'PDF', action: 'View' },
    { name: 'Normalization Video', type: 'Watch', action: 'Watch' },
    { name: 'Examples & Practice', type: 'Open', action: 'Open' }
  ];

  generatedQuestions = [
    {
      id: 1,
      question: 'A relation R(A, B, C, D, E) has FDs: A -> BC, CD -> E, B -> D, E -> A. Determine if R is in 3NF and check if it is in BCNF.',
      answer: 'First find Candidate Keys. Closure of A: (A)+ = ABC -> B->D => ABCD -> CD->E => ABCDE. So A is a CK. Since E -> A, E is also a CK. Closure of CD: (CD)+ = CDE -> E->A => CDEA -> A->BC => ABCDE. So CD is a CK. Closures of B, C alone do not yield all. Candidate Keys are: A, E, CD. Now examine determinants. In A -> BC, A is a CK (BCNF ok). In CD -> E, CD is a CK (BCNF ok). In B -> D, B is not a CK, and D is a prime attribute (part of CD). B -> D violates BCNF. Since D is a prime attribute, B -> D does not violate 3NF. Hence, the relation is in 3NF but not in BCNF.'
    },
    {
      id: 2,
      question: 'Identify the transitive dependency in: Book(BookID, Title, PublisherID, PublisherName, PublisherAddress). How do you resolve it to 3NF?',
      answer: 'BookID determines Title, PublisherID. PublisherID determines PublisherName, PublisherAddress. Thus BookID transitively determines PublisherName/PublisherAddress via PublisherID. To resolve to 3NF, decompose into: 1. Book(BookID, Title, PublisherID) and 2. Publisher(PublisherID, PublisherName, PublisherAddress).'
    }
  ];

  showQuestionSolution = signal<Record<number, boolean>>({});

  generateQuestions() {
    this.showPracticeQuestions.set(true);
  }

  toggleSolution(id: number) {
    this.showQuestionSolution.update(s => ({ ...s, [id]: !s[id] }));
  }
}
