import { Component, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

/**
 * @component PromptComponent
 * @description A standalone input component that provides a textarea for user prompts,
 * supporting keyboard shortcuts and emitting the input text to parent components.
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

  /**
   * Handles keyboard events on the textarea.
   * If the 'Enter' key is pressed without 'Shift', it prevents the default newline
   * behavior and triggers the submission process.
   * @param {KeyboardEvent} event - The keyboard event object from the input.
   */
  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.submit();
    }
  }

  /**
   * Validates, trims, and emits the current input value.
   * Clears the input field upon a successful submission.
   * @returns {void}
   */
  submit() {
    const text = this.value.trim();
    if (!text) return;

    console.log('Submitting prompt:', text);

    this.send.emit(text);
    this.value = '';
  }  
}