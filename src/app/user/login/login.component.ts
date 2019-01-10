import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  isLoading = false;
  form: FormGroup;
  authStatusSubscription: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl('test@test.com', {validators: [Validators.required, Validators.email]}),
      'password': new FormControl('test', {validators: [Validators.required, Validators.minLength(3)]}),
    });
    this.authStatusSubscription = this.userService.getAuthStateListener()
    .subscribe((authStatus) => {
      this.isLoading = false;
    });
  }

  onLogin () {
    this.isLoading = true;
    this.userService.login(this.form.value);
  }

  ngOnDestroy(): void {
    this.authStatusSubscription.unsubscribe();
  }

}
