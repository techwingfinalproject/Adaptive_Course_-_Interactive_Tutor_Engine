import { Component, inject, signal, computed, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AITutorService, WeakTopic } from '../../core/services/ai-tutor.service';

@Component({
  selector: 'app-ai-tutor',
  standalone: true,
  imports: [RouterLink, FormsModule, DatePipe],
  templateUrl: './ai-tutor.component.html',
  styleUrl: './ai-tutor.component.css'
})
export class AITutorComponent implements AfterViewChecked {
  aiTutorService = inject(AITutorService);

  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  chatInput = signal<string>('');
  activeTab = signal<string>('Chat'); // 'Chat', 'Questions'

  practiceQuestions = [
    {
      id: 1,
      question: 'Consider a relation R(A, B, C, D) with functional dependencies: AB -> C, C -> D, D -> A. Identify the candidate keys of R.',
      solution: 'Candidate keys are AB, BC, and BD. Let\'s check closures: (AB)+ = ABCD (Candidate Key). Since D -> A, if we replace A with D, we get BD. Closure: (BD)+ = BDA -> BC -> BCDA = ABCD (Candidate Key). Since C -> D, replacing D with C gives BC. Closure: (BC)+ = BCD -> BCA -> BCDA = ABCD (Candidate Key).'
    },
    {
      id: 2,
      question: 'Explain why a relation R(A, B, C) with FD: A -> B is in 3NF but not in BCNF.',
      solution: 'Candidate key is AC. The FD A -> B has a determinant A which is not a super key (AC is). Therefore, it violates BCNF. However, B is a prime attribute (part of candidate key AC), so it does not violate 3NF rules (which allow non-prime attributes to be dependent on candidate keys or determinants to be super keys, or dependents to be prime).'
    }
  ];

  showSolution = signal<Record<number, boolean>>({});

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  toggleSolution(id: number) {
    this.showSolution.update(s => ({ ...s, [id]: !s[id] }));
  }

  sendMessage() {
    const text = this.chatInput().trim();
    if (text) {
      this.aiTutorService.sendMessage(text);
      this.chatInput.set('');
    }
  }

  clearChat() {
    this.aiTutorService.clearChat();
  }

  private scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch(err) {}
  }
}
