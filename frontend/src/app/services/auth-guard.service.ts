import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { NavigationPaths } from '../enums/navigation-paths.enum';
import { UserService } from './user.service';



/**
 * intercept app routing
 */
@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private userServices: UserService,
    private router: Router
  ) { }

  /**
   * Guards apps routing from unauthenticated users by checking theirs JWT token.
   * If users token is expired or does not exists, redirects them to login page for acquire new JWT token.
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
    if (this.userServices.isLoggedIn()) {
      return true
    } else {
      // users latest intended url is attached to route url
      this.router.navigate([NavigationPaths.LOGIN], { queryParams: {intendedUrl:state.url} })
      return false
    }
  }
}
