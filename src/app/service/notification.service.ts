import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class NotificationService {

    constructor(private toastrService: ToastrService) {
    }

    public showSuccess(title: string, message: string): void {
         this.toastrService.success(message, title);
    }

    public showWarning(title: string, message: string): void {
      this.toastrService.warning(message, title);
    }

    public showError(title: string, message: string): void {
      this.toastrService.error(message, title);
    }
}
