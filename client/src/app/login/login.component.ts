import { Component, OnInit } from '@angular/core';
import { SplashService } from '../common/splash/splash.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor(private splashService: SplashService) {
  }


  ngOnInit() {
    this.splashService.close();
  }

}
