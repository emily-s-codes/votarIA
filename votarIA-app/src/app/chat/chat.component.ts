import { Component } from '@angular/core';
import { PromptComponent } from '../prompt/prompt.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { SidebarComponent } from "../sidebar/sidebar.component";

/** Represents a single message in the chat conversation. */
interface Message {
  from: 'user' | 'ai';
  text: string;
}

/**
 * Main chat interface for message history and AI communication.
 */
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: true,
  imports: [TopbarComponent, PromptComponent, SidebarComponent]
})
export class ChatComponent {
  
  /** History of the current conversation, starting with a default greeting. */
  messages: Message[] = [
    { from: 'ai', text: 'Hi, I\'m votarIA, how can I help you?' }
  ];

  /**
   * Adds user message to history and triggers a simulated AI response delay.
   */
  handleSend(text: string): void {
    this.messages.push({ from: 'user', text });

    setTimeout(() => {
      this.messages.push({
        from: 'ai',
        text: 'AI answer'
      });
    }, 600);
  }
}