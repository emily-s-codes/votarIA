import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './app-sidebar.component.html',
  styleUrls: ['./app-sidebar.component.scss']
})
export class SidebarComponent {
  isCollapsed = signal(false);

  navItems = [
    { icon: 'chat_bubble_outline', label: 'Chat' },
    { icon: 'info', label: 'About' },
    { icon: 'library_books', label: 'Sources' },
  ];

  toggleSidebar() {
    this.isCollapsed.update(v => !v);
  }
}