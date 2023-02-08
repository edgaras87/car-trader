import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private notifier: NotificationsService) { }

  onSuccess(message:string):void {
    this.notifier.success(Type.SUCCESS, message, {
      timeOut:5000

    });
  }


  onError(message:string):void {
    this.notifier.error(Type.ERROR, message, {
      timeOut:5000

    });
  }

  onWarning(message:string):void {
    this.notifier.warn(Type.WARNING, message, {
      timeOut:5000

    });
  }

}

enum Type {
  DEFAULT = 'default',
  INFO = 'info',
  SUCCESS = 'success',
  WARNING='warning',
  ERROR='error'
}
