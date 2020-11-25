import {Component, OnInit} from '@angular/core';
import { DocModel } from 'src/app/models/DocModel';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DocsService } from 'src/app/services/docs.service';

@Component({
  selector: 'app-mydocs',
  templateUrl: './mydocs.component.html',
  styleUrls: ['./mydocs.component.scss']
})
export class MydocsComponent implements OnInit {

  myDocsList: DocModel[] = [];

  constructor(private docService: DocsService,
            private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    if (this.authService.currentUserValue && this.authService.currentUserValue.id) {
      this.docService.getMyDocs(this.authService.currentUserValue.id)
      .subscribe(
        data => {
          this.myDocsList = data;
        },
        error => {
          console.log('Failed to fetch docs: '+error);
        }
      ); 
    }
  }

}
