import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { Killer } from '../models';
import { KillerService, AuthenticationService } from '../services';

@Component({ templateUrl: 'home.component.html',
              styleUrls: ['home.component.less']
})
export class HomeComponent {
  killers: Killer[] = [];

  constructor(private killerService: KillerService) { }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    this.killerService.getAll().pipe(first()).subscribe(killers => {
      this.killers = killers;
    });
  }
}
