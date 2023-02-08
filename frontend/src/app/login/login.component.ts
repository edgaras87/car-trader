
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Messages } from '../enums/messages.enum';
import { NavigationService } from '../services/navigation.service';
import { NotificationService } from '../services/notification.service';
import { User, UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user:User = {
    email:'',
    password:''
  }

  intendedUrl?: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private notifier: NotificationService,
    private navigation: NavigationService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.intendedUrl = params['intendedUrl']

      if (this.userService.isLoggedIn()){
        (this.intendedUrl) ? this.router.navigate([this.intendedUrl]):this.navigation.backToWhereWeLeft();
      }
    })
  }

  login(userForm?: NgForm):void {

    if (userForm) this.markAllAsTouched(userForm)
    if (!userForm?.valid) return

    this.userService.login(this.user).subscribe({
      next: (v) => {
        (this.intendedUrl) ? this.router.navigate([this.intendedUrl]):this.navigation.backToWhereWeLeft();
        this.notifier.onSuccess(v.message)
      }
    });

  }


  inProgress() {
    this.notifier.onWarning(Messages.IN_PROGRESS)
  }


  private markAllAsTouched(form: NgForm) {
    (Object as any).values(form.controls).forEach((control: any) => {
        control.markAsTouched();
        if (control.controls) {
            this.markAllAsTouched(control);
        }
    });
    return true;
  }

}
