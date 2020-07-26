import { Component, OnInit } from '@angular/core';
import { LoginRequest } from './login-request';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  loginForm: FormGroup;

  loginRequest: LoginRequest;

  isError: boolean;

  registerSuccessMessage: string;

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute, private toastr: ToastrService, private router: Router) {
    this.loginRequest = {
      username: '',
      password: ''
    };
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.activatedRoute.queryParams.subscribe(params => {
      if (params.registered !== undefined && params.registered === 'true') {
        this.toastr.success('Signup Successfull');
        this.registerSuccessMessage = 'Please Check your inbox for activation email' + 'activate your account before you Login!';
      }
    });

  }

  login(): void {
    this.loginRequest.username = this.loginForm.get('username').value;
    this.loginRequest.password = this.loginForm.get('password').value;
    this.authService.login(this.loginRequest).subscribe(data => {
      if (data) {
        this.isError = false;
        this.router.navigateByUrl('/');
        this.toastr.success('Login Successfull');
      }
      else {
        console.log('IN ERROR');
        this.isError = true;
      }
    })
  }

}
