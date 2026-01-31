import { Component, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

/**
 * Input component for user prompts. 
 * Supports 'Enter' to submit and 'Shift+Enter' for new lines.
 */
@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, FormsModule]
})
export class PromptComponent {
  /** Emits the processed string content when the user submits the prompt. */
  @Output() send = new EventEmitter<string>();

  /** Reference to the underlying HTML textarea element for DOM manipulation or focus management. */
  @ViewChild('textarea') textarea!: ElementRef<HTMLTextAreaElement>;

  /** The current raw string value bound to the textarea input. */
  value = '';

  /** Prevents newline on 'Enter' to trigger submission. */
  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.submit();
    }
  }

  /** Trims input and emits non-empty strings. */
  submit() {
    const text = this.value.trim();
    if (!text) return;

    this.send.emit(text);
    this.value = '';
  }  
}