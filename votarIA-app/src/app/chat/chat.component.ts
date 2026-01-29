import { Component } from '@angular/core';
import { PromptComponent } from '../prompt/prompt.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { SidebarComponent } from "../sidebar/sidebar.component";

/**
 * Represents a single message in the chat conversation.
 * @interface Message
 * @property {('user' | 'ai')} from - Indicates the sender of the message.
 * @property {string} text - The content of the message.
 */
interface Message {
  from: 'user' | 'ai';
  text: string;
}

/**
 * @component ChatComponent
 * @description The main chat interface component responsible for displaying message history 
 * and handling communication between the user input and AI responses.
 */
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: true,
  imports: [TopbarComponent, PromptComponent, SidebarComponent]
})
export class ChatComponent {
  /**
   * An array containing the history of the current conversation.
   * Initialized with a default greeting from the AI.
   * @type {Message[]}
   */
  messages: Message[] = [
    { from: 'ai', text: 'Hi, I\'m votarAI, how can I help you?' }
  ];

  /**
   * Processes a new message sent by the user. 
   * Immediately appends the user's message to the list and triggers a 
   * simulated AI response after a short delay.
   * * @method handleSend
   * @param {string} text - The message string provided by the user.
   * @returns {void}
   */
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