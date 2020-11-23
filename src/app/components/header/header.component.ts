import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedIn = false;

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {

    this.authenticationService.currentUser$.subscribe(
      (userModel) => this.loggedIn = userModel != null
    );
  }

  ngOnInit(): void {
  }

  logoutClicked($event: any) {
    $event.preventDefault();
    this.authenticationService.logout();
    this.router.navigate(['/home']);
  }
}
