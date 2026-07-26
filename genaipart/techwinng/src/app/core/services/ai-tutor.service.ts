import { Injectable, signal, computed } from '@angular/core';

export interface WeakTopic {
  id: string;
  name: string;
  subtopics: string;
  confidence: 'Low' | 'Medium' | 'High';
  courseId: string;
}

export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AITutorService {
  private weakTopicsSignal = signal<WeakTopic[]>([
    {
      id: 'db_norm',
      name: 'Database Normalization',
      subtopics: '2NF, 3NF',
      confidence: 'Low',
      courseId: 'dbms'
    }
  ]);

  private messagesSignal = signal<ChatMessage[]>([
    {
      sender: 'ai',
      text: 'Hi Jithendra! I noticed you had some trouble with transitive dependencies in your last quiz. Let\'s work on that! Would you like me to generate a study guide, practice questions, or a mini-quiz?',
      timestamp: new Date()
    }
  ]);

  weakTopics = computed(() => this.weakTopicsSignal());
  messages = computed(() => this.messagesSignal());

  addWeakTopic(topic: WeakTopic) {
    this.weakTopicsSignal.update(topics => {
      // Avoid duplicate
      if (topics.some(t => t.id === topic.id)) return topics;
      return [...topics, topic];
    });
  }

  removeWeakTopic(topicId: string) {
    this.weakTopicsSignal.update(topics => topics.filter(t => t.id !== topicId));
  }

  sendMessage(text: string) {
    const userMsg: ChatMessage = {
      sender: 'user',
      text,
      timestamp: new Date()
    };
    
    this.messagesSignal.update(msgs => [...msgs, userMsg]);

    // Mock AI response
    setTimeout(() => {
      let aiResponseText = 'That is an excellent question! ';
      const lower = text.toLowerCase();
      if (lower.includes('normal') || lower.includes('3nf')) {
        aiResponseText += 'In database normalization, 3NF (Third Normal Form) requires that the schema is already in 2NF, and no non-prime attribute depends transitively on the primary key. In other words, all non-key columns must depend only on the primary key, the whole primary key, and nothing but the primary key (so no transitive dependency).';
      } else if (lower.includes('study') || lower.includes('material')) {
        aiResponseText += 'I have prepared customized study material for you on Database Normalization. Click the "Get Study Material" button to view explanations, examples, and key points!';
      } else if (lower.includes('practice') || lower.includes('question')) {
        aiResponseText += 'Great! I can generate practice questions for you. You can try testing your knowledge with these or take a mini-quiz.';
      } else {
        aiResponseText += 'I am analyzing your learning profile. To improve on your weak topics, let\'s look at the study materials and practice modules. Let me know if you want me to explain anything specific!';
      }

      const aiMsg: ChatMessage = {
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date()
      };
      this.messagesSignal.update(msgs => [...msgs, aiMsg]);
    }, 1000);
  }

  clearChat() {
    this.messagesSignal.set([
      {
        sender: 'ai',
        text: 'Hi Jithendra! Let\'s tackle your weak topics together. What would you like to cover today?',
        timestamp: new Date()
      }
    ]);
  }
}
