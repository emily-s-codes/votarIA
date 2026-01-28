import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-sidebar',
  templateUrl: './app-sidebar.component.html',
  styleUrls: ['./app-sidebar.component.scss'],
  animations: [
    trigger('sidebarAnimation', [
      state('open', style({ width: '260px' })),
      state('closed', style({ width: '70px' })),
      transition('open <=> closed', animate('300ms ease-in-out'))
    ])
  ]
})
export class SidebarComponent {
  isCollapsed = false;

  navItems = [
    { icon: 'add', label: 'New Chat', isButton: true },
    { icon: 'home', label: 'Chat' },
    { icon: 'info', label: 'About' },
    { icon: 'description', label: 'Public Sources' }
  ];

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}