import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lazy-load-children',
  templateUrl: './lazy-load-children.component.html'
})
export class LazyLoadChildrenComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['/lazy-load']);
  }

}
