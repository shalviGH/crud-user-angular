import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

export const appConfig: ApplicationConfig = {

  providers: [
    provideRouter(
     routes,
    ),
    //para recargar data con hhtpClient
    importProvidersFrom(
     HttpClientModule,
    )
   ]
  // providers: [
  //   provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration()]



  };
