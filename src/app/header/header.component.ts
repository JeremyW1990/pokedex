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
  authSub: Subscription;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.isAuth = this.userService.checkLocalAuth();
    this.authSub = this.userService.getAuthStateListener()
      .subscribe(resposne => {
        console.log('Header Auth:', resposne);
        this.isAuth = resposne;
        console.log(this.isAuth);
      });
      console.log(this.isAuth);

  }

  onLogout() {
    this.userService.logout();
  }

  ngOnDestroy () {
    this.authSub.unsubscribe();
  }

}
