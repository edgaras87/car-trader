import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { NavigationPaths } from '../enums/navigation-paths.enum';
import { Time } from '../enums/time.enum';
import { Advert } from '../interfaces/advert';
import { AdvertService } from '../services/advert.service';
import { FirebaseService } from '../services/firebase.service';
import { NotificationService } from '../services/notification.service';



@Component({
  selector: 'app-my-ads',
  templateUrl: './my-ads.component.html',
  styleUrls: ['./my-ads.component.scss']
})
export class MyAdsComponent implements OnInit {

  homeRoute: NavigationPaths = NavigationPaths.HOME;
  createNewAdRoute: NavigationPaths = NavigationPaths.AD_CREATE;
  editAdRoute: NavigationPaths = NavigationPaths.AD_EDIT;

  ads?: Advert[] = []

  completedAds: Advert[] = []
  incompletedAds: Advert[] = []

  constructor(
    private router: Router,
    private advertService: AdvertService,
    private firebaseService: FirebaseService,
    private notifier: NotificationService
  ) { }

  ngOnInit(): void {
    this.loadData()
  }

  loadData(): void {
    this.advertService.getAll().subscribe(ads => {

      ads.map(ad => {
        (this.isCompleted(ad) && ad.isPublished) ? this.completedAds.push(ad) : this.incompletedAds.push(ad);
      })
      this.ads = ads
    });
  }

  isCompleted(ad: Advert): boolean {
    return (ad?.generalInfo?.completed && ad?.equipmentInfo?.completed && ad?.detailsInfo?.completed && ad?.contactInfo?.completed) ? true : false;
  }


  publish(ad: Advert): void {

    this.advertService.publish(ad).subscribe(results => {


      if (results?.isPublished) {
        this.incompletedAds = this.incompletedAds.filter(incompletedAd => incompletedAd.id != results.id);
        this.completedAds.unshift(results);
        this.notifier.onSuccess('You have successfully published your advertisement');
      }
    })
  }

  unpublish(ad: Advert): void {
    if (ad?.id)
    this.advertService.unpublish(ad.id).subscribe(results => {
      if (results?.isPublished === false) {
        this.completedAds = this.completedAds.filter(completedAd => completedAd.id != results.id);
        this.incompletedAds.unshift(results);
        this.notifier.onWarning('You have unpublished your advertisement. It will not appear in search results any more.');
      }
    })
  }

  editAd(advert: Advert): void {
    this.router.navigate(['/editAd'], { queryParams: { 'id': advert.id } })
  }



  deleteAd(ad: Advert): void {

    if (!ad?.id) return

    // removing images from firebase (frontend) and advertisement from mongodb (backend) simultaneously (move all to backend !?!?)
    const allReq = forkJoin([this.advertService.delete(ad.id), this.firebaseService.deleteAllFolder(ad.id)])

    allReq.subscribe(
      {
        next: ( [removedAd, _] ) => {

          if (removedAd?.id) {
            localStorage.removeItem(removedAd.id);
            this.incompletedAds = this.incompletedAds.filter(incompletedAd => incompletedAd.id != removedAd.id);
          }

          this.notifier.onSuccess('You have successfully removed your advertisement')


        }

      }
    )







  }



  createdBefore(creationDate: string):string|null {


    if (creationDate) {
      let date = new Date(creationDate)

      let current = new Date()

      const difference = current.getTime() - date.getTime()

      //let difference = current.getTime() - date.getTime()
      //difference = Time.DAY * 1 + Time.HOUR
      //difference = Time.DAY * 0 + Time.HOUR * 5
      //difference = Time.DAY * 0 + Time.HOUR * 0 + Time.MIN * 0 + Time.SEC

      let results = null;


      if (results = Math.round(difference / Time.DAY)) {
        return `(more then ${results} day${(results > 1) ? 's' : ''} ago)`
      } else if (results = Math.round(difference / Time.HOUR)) {
        return `(more then ${results} hour${(results > 1) ? 's' : ''} ago)`
      } else if (results = Math.round(difference / Time.MIN)) {
        return `(more then ${results} minute${(results > 1) ? 's' : ''} ago)`
      } else {
        return `(minute ago)`
      }

    }
    return null;
  }


  getTechDataSubtitle(ad: Advert): string[] {

    let result: string[] = []

    if (ad?.generalInfo?.general?.year) result.push(ad.generalInfo.general.year)
    if (ad?.generalInfo?.performance?.fuel) result.push(ad.generalInfo.performance.fuel)
    if (ad?.generalInfo?.engine?.power) result.push(ad.generalInfo.engine.power.toString())
    if (ad?.generalInfo?.condition?.mileage) result.push(ad.generalInfo.condition.mileage.toString())

    return result
  }

}
