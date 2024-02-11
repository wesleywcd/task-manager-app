import { Component, OnInit } from '@angular/core';
import { AccountService } from '../shared/account.service';
import { NotificationService } from 'src/app/service/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  account = {
    name: '',
    email: '',
    password: ''
  }

  constructor(
    private router: Router,
    private accountService: AccountService,
    private notificationService: NotificationService) {

  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.accountService.createAccount(this.account).subscribe((ret) => {
      this.notificationService.showSuccess('Login created.')
      this.router.navigate(['login']);
    });
  }

}
