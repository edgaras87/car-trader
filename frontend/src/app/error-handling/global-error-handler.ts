import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { NotificationService } from "../services/notification.service";


import { ErrorService } from "./services/error.service";
import { LoggingService } from "./services/logging.service";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) { }

  handleError(error: Error | HttpErrorResponse) {
    const errorService = this.injector.get(ErrorService);
    const logger = this.injector.get(LoggingService);
    const notifier = this.injector.get(NotificationService);


    let message = null;
    if (error instanceof HttpErrorResponse) {

      // Server error
      message = errorService.getServerErrorMessage(error)
      notifier.onError(message);
    } else {

      // Client Error
      message = errorService.getClientErrorMessage(error);
    }


    // Always log errors
    logger.logError(error);

  }
}
