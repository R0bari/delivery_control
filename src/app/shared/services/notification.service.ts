import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  toastOptions = {
    timeOut: 3000,
    positionClass: 'toast-bottom-right'
  };

  constructor(private toast: ToastrService) { }

  showSuccess(title, message): void {
    this.toast.success(message, title, this.toastOptions);
  }

  showError(title, message): void {
    this.toast.error(message, title, this.toastOptions);
  }

  showInfo(title, message): void {
    this.toast.info(message, title, this.toastOptions);
  }

  showWarning(title, message): void {
    this.toast.warning(message, title, this.toastOptions);
  }
}
