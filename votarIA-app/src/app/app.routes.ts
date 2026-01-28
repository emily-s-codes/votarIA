import { Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';

/**
 * @constant appRoutes
 * @description Defines the navigation paths for the application.
 * Currently configures the root path to load the ChatComponent by default.
 */
export const appRoutes: Routes = [
  {
    path: '',
    component: ChatComponent
  }
];