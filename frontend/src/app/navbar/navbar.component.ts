import { Component, OnInit } from '@angular/core';
import { NavigationPaths } from '../enums/navigation-paths.enum';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private userService: UserService) { }

  homeRoute:NavigationPaths = NavigationPaths.HOME
  createNewAdRoute:NavigationPaths = NavigationPaths.AD_CREATE
  adsListRoute:NavigationPaths = NavigationPaths.ADS_LIST
  loginRoute:NavigationPaths = NavigationPaths.LOGIN
  signupRoute:NavigationPaths = NavigationPaths.SIGNUP


  // isActive(instruction: any[]): boolean {
  //   return this.router.isRouteActive(this.router.generate(instruction));
  // }

  ngOnInit(): void {
  }

  logout() {
    this.userService.logout()
  }

  isLoggedIn(): boolean {
    return this.userService.isLoggedIn()
  }

  isLoggedOut(): boolean {
    return this.userService.isLoggedOut()
  }

}
