import { Component, OnInit } from '@angular/core';
import { NavigationService } from './services/navigation.service';

import { SpecificationService } from './services/specification.service';

// import { environment } from 'src/environments/environment';

declare const window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'car-trader-frontend';

  googleApiKey?: string;
  constructor(private specificationService: SpecificationService, private navigationService:NavigationService){

  }



}
