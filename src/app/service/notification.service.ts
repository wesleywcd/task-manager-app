import {Injectable} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class NotificationService {

  constructor(private snackBar: MatSnackBar) {}

    public showSuccess(message: string) {
      this.snackBar.open(message, 'Close', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
    }

    public showError(message: string) {
      this.snackBar.open(message, 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }

    public showWarning(message: string) {
      this.snackBar.open(message, 'Close', {
        duration: 3000,
        panelClass: ['warning-snackbar']
      });
    }
}
