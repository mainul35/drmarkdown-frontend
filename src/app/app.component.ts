import {Component} from '@angular/core';
import {SpinnerService} from './services/spinner.service';
import {Spinkit} from 'ng-http-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  public spinkit = Spinkit;

  constructor(public spinnerService: SpinnerService) {
  }
}
