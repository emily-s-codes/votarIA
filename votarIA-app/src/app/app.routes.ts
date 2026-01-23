import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./chat/chat.routes')
        .then(m => m.CHAT_ROUTES)
  }
];