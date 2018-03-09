import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
      './app.component.css'
  ]
})
export class AppComponent {
  title = 'app';

  form = new FormGroup({
    ttt: new FormControl(0)
  });
  opt = [
    { key: 'a', value: 'A' },
    { key: 'b', value: 'B' },
    { key: 'c', value: 'C' },
  ];
}
