import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { UserRoutingModule } from './user-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material/angular-material.module';


@NgModule({
  declarations: [SignupComponent, LoginComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ]
})
export class UserModule { }
