import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = true;
  username: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.loggedIn.subscribe((data: boolean) => { this.isLoggedIn = data });
    this.authService.username.subscribe((data: string) => { this.username = data });
    this.username = this.authService.getUserName();
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  goToUserProfile() {
    this.router.navigateByUrl("/user-profile/" + this.username);
  }
  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('');
  }

}
