import { Component, OnInit } from '@angular/core';
import { SplashService } from '../common/splash/splash.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor(
    private splashService: SplashService,
    private httpClient: HttpClient,
    private router: Router) {
  }

  username: string;
  password: string;

  ngOnInit() {
    this.splashService.close();
  }

  login(): void {
    this.httpClient.post(`/api/login`, { username: this.username, password: this.password } )
      .subscribe(() => this.router.navigateByUrl('/'), (e) => {
        console.log(e);
      });
  }

}
