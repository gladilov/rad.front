import {Component} from '@angular/core';
import {TimeService} from './service/time.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css'
  ],
  providers: [
    TimeService
  ],
})
export class AppComponent {

  constructor(
    public time: TimeService
  ) {

  }
}
