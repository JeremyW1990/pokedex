import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuth: boolean;
  isAdmin: boolean;
  email: string;
  authSub: Subscription;
  dropdownClass = '';
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.isAuth = this.userService.checkLocalAuth();
    this.isAdmin = this.userService.getLocalStorageisAdmin();
    this.email = this.userService.getLocalStorageEmail();
    this.authSub = this.userService.getAuthStateListener()
      .subscribe(resposne => {
        this.isAuth = resposne.isLogin;
        this.isAdmin = resposne.isAdmin;
        this.email = this.userService.getLocalStorageEmail();
      });

  }

  onLogout() {
    this.userService.logout();
  }

  ngOnDestroy () {
    this.authSub.unsubscribe();
  }

  onDropdownClick () {
    this.dropdownClass = this.dropdownClass === '' ? 'show' : '';
  }

  outsideClicked () {
    this.dropdownClass = '';
  }
}
