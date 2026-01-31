import { ChangeDetectorRef, Component } from '@angular/core';
import { PromptComponent } from '../prompt/prompt.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { ChatService } from '../../services/chat.service';
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
    { from: 'ai', text: "Hi, I'm votarIA, how can I help you?" }
  ];

  private sessionId = crypto.randomUUID();
  streaming = false;

  constructor(private chatService: ChatService, private cdr: ChangeDetectorRef) {}

   /**
   * Adds user message to history and triggers the AI streaming response.
   */
  async handleSend(text: string) {
    if (this.streaming) {
      this.chatService.abort();
      this.streaming = false;
    }

    // User message
    this.messages.push({ from: 'user', text });

    // AI placeholder with typing cursor ON
    const aiMessage: Message = {
      from: 'ai',
      text: ''
    };

    this.messages.push(aiMessage);
    this.streaming = true;

    try {
      await this.chatService.streamChat(
        text,
        this.sessionId,
        (chunk) => {
          aiMessage.text += chunk;
          this.cdr.detectChanges();
        }
      );
    } catch (err) {
      aiMessage.text += '\n\n⚠️ Error generating response.';
    } finally {
      this.streaming = false;
    }
  }

  /**
   * Stops the current AI streaming session.
   */
  stop() {
    this.chatService.abort();
    this.streaming = false;
  }
}