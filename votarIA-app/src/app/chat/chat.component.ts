import { Component } from '@angular/core';
import { PromptComponent } from '../prompt/prompt.component';
import { TopbarComponent } from '../topbar/topbar.component';

interface Message {
  from: 'user' | 'ai';
  text: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: true,
  imports: [TopbarComponent, PromptComponent]
})
export class ChatComponent {
  messages: Message[] = [
    { from: 'ai', text: 'Hi, I\'m votarAI, how can I help you?' }
  ];

  handleSend(text: string) {
    this.messages.push({ from: 'user', text });
    setTimeout(() => {
      this.messages.push({
        from: 'ai',
        text: 'AI answer'
      });
    }, 600);
  }
}
