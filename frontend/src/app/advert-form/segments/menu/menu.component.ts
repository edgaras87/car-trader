import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdvertService } from 'src/app/services/advert.service';

import { NotificationService } from 'src/app/services/notification.service';
import { ScrollService } from 'src/app/services/scroll.service';
import { MenuDirections } from 'src/app/enums/types/directions';
import { NavigationPaths } from 'src/app/enums/navigation-paths.enum';
import { Advert } from 'src/app/interfaces/advert';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnDestroy, OnInit {


  @Input() mainForm?: FormGroup;
  @Output() changeStep: EventEmitter<MenuDirections> = new EventEmitter<MenuDirections>()
  submited: boolean = false;


  constructor(
    private router: Router,
    private advertService: AdvertService,
    private notifier: NotificationService,
    private scrollService: ScrollService
  ) { }
  ngOnInit(): void {
    this.scrollService.scrollToTheTop()
  }


  // save changes before leaving page. Check if it was not already saved.
  ngOnDestroy(): void {
    if (!this.submited) localStorage.setItem(this.mainForm?.value.id, JSON.stringify(this.mainForm?.value));
  }



  onChangeStep(section: MenuDirections) {
    this.changeStep.emit(section)
  }

  get isPublishable() {
    return (this.mainForm?.valid &&
      this.mainForm.get('generalInfo')?.value.completed &&
      this.mainForm.get('equipmentInfo')?.value.completed &&
      this.mainForm.get('detailsInfo')?.value.completed &&
      this.mainForm.get('contactInfo')?.value.completed);
  }



  update() {
    let advert: Advert = this.mainForm?.value;

    this.advertService.update(advert).subscribe(
      {
        next: (v) => {
          this.submited = true;
          if (v?.id) localStorage.removeItem(v.id);
          this.router.navigate([NavigationPaths.ADS_LIST]);
          this.notifier.onSuccess('You have successfully updated your new advertisement')
        }
      }
    );

  }

  publish() {
    let advert: Advert = this.mainForm?.value;

    if (advert?.equipmentInfo?.comfort?.seatsHeated) {
      advert.equipmentInfo.comfort.seatsHeated.reverse()

      if (advert?.equipmentInfo?.comfort?.seatsElectricAdjustable) advert.equipmentInfo.comfort.seatsElectricAdjustable.reverse()


      this.advertService.publish(advert).subscribe(
        {
          next: (v) => {
            this.submited = true;
            if (v?.id) localStorage.removeItem(v.id);
            this.router.navigate([NavigationPaths.ADS_LIST]);
            this.notifier.onSuccess('You have successfully published your advertisement')

          }
          // ,
          // error: (e) => {
          //   if (e.error?.status === HttpStatusCode.Unauthorized)
          //     this.router.navigate(['/login'])
          //   throw e;
          // }
        }
      )
    }



  }
}
