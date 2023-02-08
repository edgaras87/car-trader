import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { NavigationPaths } from '../enums/navigation-paths.enum';


/**
 * for navigating back to previous page
 */
@Injectable({
  providedIn: 'root'
})
export class NavigationService {


  private history: string[] = []

  constructor(private router: Router, private location: Location) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects
        this.history.push(url);
      }
    })
  }

  backToWhereWeLeft(): void {


    this.history.pop() // removes current route from history

    /**
     * unnavigableList: list of routes where is not need to navigate back... e.g. never need to go back to signup or loging pages
     * at the moment: if route is unnavigable then navigate to home route
     * possible improve: to navigate to last not unnavigable route...
     * e.g. route1 -> route2 -> log -> sign -> log -> sign : goback => route2
     * how to: count steps back till route2, and then  location.historyGo(-counts)
     *
     */

    const unnavigableList = [`/${NavigationPaths.LOGIN}`,`/${NavigationPaths.SIGNUP}`]
    if (this.history.length > 0 && !unnavigableList.includes(this.history[this.history.length-1])) {
      this.location.back()
    } else {
      this.router.navigateByUrl(NavigationPaths.HOME)
    }
  }

}
