import { Component, OnInit } from '@angular/core';
import { SplashService } from '../common/splash/splash.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor(
    private splashService: SplashService,
    private httpClient: HttpClient,
    private router: Router,
    private authService: AuthService) {
  }

  username: string;
  password: string;

  ngOnInit() {
    this.splashService.close();
  }

  login(): void {
    this.httpClient.post(`/api/login`, { username: this.username, password: this.password } )
      .subscribe(() => this.router.navigateByUrl(this.authService.popRedirectUrl('/')), (e) => {
          console.log(e);
        });
  }

}
