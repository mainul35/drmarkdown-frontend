import {Component, OnInit} from '@angular/core';
import {DocModel} from '../../models/DocModel';
import {DocsService} from '../../services/docs.service';
import {SpinnerVisibilityService} from 'ng-http-loader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  recentDocs: DocModel[] = [];

  constructor(private docsService: DocsService, private spinner: SpinnerVisibilityService) {
  }

  ngOnInit(): void {
    this.fetchRecentDocs();
  }

  reloadRecentDocs() {
    this.fetchRecentDocs();
  }

  fetchRecentDocs() {
    this.spinner.show();
    this.docsService.fetchRecentDocs().subscribe(
      data => {
        this.recentDocs = data;
        this.spinner.hide();
      },
      error => {
        console.error(`Error: ${error.message}`);
        this.spinner.hide();
      }
    );
  }
}
