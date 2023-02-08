import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavigationService } from '../services/navigation.service';
import { NotificationService } from '../services/notification.service';
import { User, UserService } from '../services/user.service';
import { AccountType, AccountTypeLabelMapping } from '../enums/user-account-types';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user:User = {
    account:AccountType.Private,
  }

  accountTypeLabelMapping:Record<AccountType, string> = AccountTypeLabelMapping;
  accounts = Object.keys(AccountType) as [keyof Record<AccountType, string>];


  constructor(
    private userService: UserService,
    private navigation: NavigationService,
    private notifier: NotificationService
  ) { }

  ngOnInit(): void {

  }

  get isDealer() { return this.user.account === AccountType.Dealer }



  signup(userForm?: NgForm):void {


    if (userForm) this.markAllAsTouched(userForm)
    if (!userForm?.valid) return

    this.userService.signup(this.user).subscribe({
      next: (v) => {
        this.navigation.backToWhereWeLeft();
        this.notifier.onSuccess(v.message);
      }
    });


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
