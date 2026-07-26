import { Component } from '@angular/core';
import { AiService } from '../../services/ai.service';

@Component({
  selector: 'app-ai-agent',
  templateUrl: './ai-agent.component.html',
  styleUrls: ['./ai-agent.component.css']
})
export class AiAgentComponent {
  userInput = '';
  chatHistory: { sender: string, text: string }[] = [];
  isLoading = false;

  constructor(private aiService: AiService) {}

  sendMessage() {
    if (!this.userInput.trim()) return;

    const message = this.userInput;
    this.chatHistory.push({ sender: 'user', text: message });
    this.userInput = '';
    this.isLoading = true;

    const historyForAi = this.chatHistory
      .filter(msg => msg.sender !== 'system') // Exclude system errors
      .map(msg => ({ role: msg.sender, content: msg.text }));

    this.aiService.chat(message, historyForAi).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.chatHistory.push({ sender: 'ai', text: res.response || 'I have no response at the moment.' });
      },
      error: (err) => {
        this.isLoading = false;
        this.chatHistory.push({ sender: 'system', text: 'Error: Could not connect to AI Agent.' });
      }
    });
  }
}
