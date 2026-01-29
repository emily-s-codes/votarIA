import { Injectable, signal, effect, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

/**
 * Service responsible for managing the application's visual theme.
 * Handles persistence via LocalStorage and syncs with the user's system preferences.
 * Uses the View Transition API for synchronized, lag-free theme switching.
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private document = inject(DOCUMENT);
  
  /**
   * Reactive state of the current theme.
   * `true` for Dark Mode, `false` for Light Mode.
   */
  isDarkMode = signal<boolean>(this.getInitialTheme());

  constructor() {
    /**
     * Syncs the initial theme state and persistence.
     * * @remarks
     * This effect ensures that on application load, the correct class is applied
     * and LocalStorage remains the source of truth for the signal's value.
     */
    effect(() => {
      const mode = this.isDarkMode();
      this.updateRenderedTheme(mode);
      localStorage.setItem('theme', mode ? 'dark' : 'light');
    });
  }

  /**
   * Toggles the current theme between 'light' and 'dark'.
   * * @remarks
   * Utilizes the View Transition API to capture a snapshot of the current UI
   * and cross-fade to the new theme state, preventing sequential component rendering lag.
   */
  toggleTheme(): void {
    const doc = this.document as any;

    // Fallback for browsers that do not support View Transitions
    if (!doc.startViewTransition) {
      this.isDarkMode.update(dark => !dark);
      return;
    }

    /**
     * startViewTransition takes a snapshot of the "old" state,
     * then executes the callback to reach the "new" state.
     */
    doc.startViewTransition(() => {
      this.isDarkMode.update(dark => !dark);
      // We manually trigger the DOM update inside the transition callback
      // to ensure the API captures the change synchronously.
      this.updateRenderedTheme(this.isDarkMode());
    });
  }

  /**
   * Updates the physical DOM to reflect the theme state.
   * @param {boolean} isDark - Whether to apply the dark theme.
   * @private
   */
  private updateRenderedTheme(isDark: boolean): void {
    const host = this.document.documentElement;
    if (isDark) {
      host.classList.add('dark-theme');
    } else {
      host.classList.remove('dark-theme');
    }
  }

  /**
   * Determines the starting theme based on persistence and system settings.
   * @returns {boolean} Initial dark mode state.
   * @private
   */
  private getInitialTheme(): boolean {
    try {
      const saved = localStorage.getItem('theme');
      if (saved) {
        return saved === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch (e) {
      return false;
    }
  }
}