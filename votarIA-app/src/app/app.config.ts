import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes'; 

/**
 * @constant appConfig
 * @description Global application configuration for Angular.
 * This object defines the core providers required for the application to bootstrap,
 * including browser animations and the centralized routing logic.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(appRoutes),     
  ]
};