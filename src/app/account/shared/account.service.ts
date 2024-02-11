import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { NotificationService } from 'src/app/service/notification.service';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl: string = environments.api + 'login'

  constructor(
    private router: Router,
    private http: HttpClient,
    private notificationService: NotificationService) { }

  login(user: any){
    this.http.post(`${this.baseUrl}`, user, { responseType: 'text' })
    .subscribe((ret: any) => {
      var token = ret;
      window.localStorage.setItem('token', token);
      this.router.navigate(['']);
    }, err => {
      console.log('errou', err)
      this.notificationService.showError(err);
    });

  }

  createAccount(account: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create-account`, account);
  }
}
