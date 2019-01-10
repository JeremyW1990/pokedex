import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  isLoading = false;
  authStatusSubscription: Subscription;
  form: FormGroup;

  constructor (private userService: UserService) {}

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl('test@test.com', {validators: [Validators.required, Validators.email]}),
      'password': new FormControl('test', {validators: [Validators.required, Validators.minLength(3)]}),
    });
    this.authStatusSubscription = this.userService.getAuthStateListener()
    .subscribe(authStatus => {
      this.isLoading = false;
    });
  }

  onSignup () {
    this.isLoading = true;
    this.userService.signup(this.form.value);
  }

  ngOnDestroy(): void {
    this.authStatusSubscription.unsubscribe();
  }
}
