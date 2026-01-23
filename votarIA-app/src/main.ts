import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom, isDevMode } from '@angular/core';
import { RouterModule } from '@angular/router';
import { App } from './app/app.component';
import { appRoutes } from './app/app.routes';

bootstrapApplication(App, {
  providers: [
    importProvidersFrom(RouterModule.forRoot(appRoutes))
]
}).catch(err => console.error(err));
