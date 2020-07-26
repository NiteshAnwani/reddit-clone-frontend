import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from "./sign-up/sign-up.component";
import { ReactiveFormsModule } from "@angular/forms";
import { LogInComponent } from './log-in/log-in.component';
import { RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';


@NgModule({
  declarations: [
    SignUpComponent,
    LogInComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ]
})
export class AuthModule { }
