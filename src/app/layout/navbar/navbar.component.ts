import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
import {NavbarItemComponent} from './navbar-item/navbar-item.component';
import {TimeService} from '../../service/time.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  menuItems: any[];
  level = NavbarItemComponent.mainLevel;
  user = 'guest';
  fullName;
  time;
  timezone = '+00:00';
  timezoneByMoscow = '+00:00';

  constructor(private http: HttpClient,
              private timeService: TimeService) {
  }

  ngOnInit() {
    // TODO сделать тикающие часы и вынести их в отдельный компонент!!!
    // setInterval(() => {
    //   const date = new Date(this.time);
    //   date.setSeconds(date.getSeconds() + 1);
    //   console.log(date.getTimezoneOffset());
    //   this.time = date.toString();
    // }, 1000);

    // console.log(this.timeService);
    this.http
      .get<any>(environment.apiBaseUrl + '/Menu/index/index', {})
      .subscribe((data: any[]) => {
        this.menuItems = data;
      });
    this.http
      .get<any>(environment.apiBaseUrl + '/Menu/index/user', {})
      .subscribe((data: any) => {
        if (data.hasOwnProperty('user')) {
          this.user = data.user;
        }
        if (data.hasOwnProperty('fullName')) {
          this.fullName = data.fullName;
        }
        if (data.hasOwnProperty('timezone')) {
          this.timezone = data.timezone;
          // let timezoneByMoscow =
          this.timezoneByMoscow = data.timezone;
        }
      });


    //////////
    this.http
      .get<any>('/date-time/synctime/', {})
      .subscribe((data: {dt: number}) => {
        this.time = new Date(data.dt * 1000).toString();
      });


  }

}
