import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {interval} from 'rxjs/observable/interval';

@Injectable()
export class TimeService {

  time;

  constructor() {
    // Create an Observable that will publish a value on an interval
    const secondsCounter = interval(1000);
    // Subscribe to begin publishing values
    // secondsCounter.subscribe(n =>
    //   console.log(`It's been ${n} seconds since subscribing!`));
  }

  tickerFunc(tick) {
    this.time = tick;
  }

  getTime() {
    return this.time;
  }

}
