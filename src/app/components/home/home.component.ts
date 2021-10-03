import {Component, OnInit} from '@angular/core';
import {DocModel} from '../../models/DocModel';
import {DocsService} from '../../services/docs.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  recentDocs: DocModel[] = [];

  constructor(private docsService: DocsService) {
  }

  ngOnInit(): void {
    this.fetchRecentDocs();
  }

  reloadRecentDocs() {
    this.fetchRecentDocs();
  }

  fetchRecentDocs() {
    this.docsService.fetchRecentDocs().subscribe(
      data => {
        this.recentDocs = data;
      },
      error => {
        console.error(`Error: ${error.message}`);
      }
    );
  }
}
