import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { google } from "google-maps";

declare var google : google;





if (environment.production) {
  enableProdMode();
}


localStorage.clear();

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


