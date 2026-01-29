import { Injectable, signal, effect, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

/**
 * Service responsible for managing the application's visual theme.
 * Handles persistence via LocalStorage and syncs with the user's system preferences.
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  /** Reference to the global Document object for DOM manipulation */
  private document = inject(DOCUMENT);
  
  /**
   * Reactive state of the current theme.
   * `true` for Dark Mode, `false` for Light Mode.
   */
  isDarkMode = signal<boolean>(this.getInitialTheme());

  /**
   * Initializes the theme effect.
   * Automatically updates the `<html>` class list and LocalStorage 
   * whenever the `isDarkMode` signal changes.
   */
  constructor() {
    effect(() => {
      const mode = this.isDarkMode();
      if (mode) {
        this.document.documentElement.classList.add('dark-theme');
      } else {
        this.document.documentElement.classList.remove('dark-theme');
      }
      localStorage.setItem('theme', mode ? 'dark' : 'light');
    });
  }

  /**
   * Toggles the current theme between 'light' and 'dark'.
   */
  toggleTheme(): void {
    this.isDarkMode.update(dark => !dark);
  }

  /**
   * Determines the starting theme based on:
   * 1. Previously saved user preference in LocalStorage.
   * 2. System-level color scheme (prefers-color-scheme).
   * * @returns {boolean} Initial dark mode state.
   * @private
   */
  private getInitialTheme(): boolean {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || 
           (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }
}