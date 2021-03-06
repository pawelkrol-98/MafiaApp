import { Component } from '@angular/core';
import {User} from './models';
import {Router} from '@angular/router';
import {AuthenticationService} from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'Mafia';
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authenticationService.logout(this.currentUser.login, this.currentUser.id);
    this.router.navigate(['/login']);
    this.authenticationService.endSession();
  }
}
