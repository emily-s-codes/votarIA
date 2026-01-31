import { Component, signal, WritableSignal } from '@angular/core';

/**
 * SidebarComponent handles the primary navigation and collapsible state 
 * of the application's side menu.
 * * @example
 * <app-sidebar></app-sidebar>
 */
@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  /**
   * Represents the current visual state of the sidebar.
   * `true` if the sidebar is minimized, `false` if fully expanded.
   */
  isCollapsed: WritableSignal<boolean> = signal(false);

  /**
   * The list of navigation links to be rendered in the sidebar.
   * Each item contains a Material Design icon identifier and a display label.
   */
  navItems = [
    { icon: 'chat_bubble_outline', label: 'Chat' },
    { icon: 'info', label: 'About' },
    { icon: 'library_books', label: 'Sources' },
  ];

  /**
   * Toggles the sidebar between collapsed and expanded states.
   * Updates the `isCollapsed` signal.
   */
  toggleSidebar(): void {
    this.isCollapsed.update(v => !v);
  }
}