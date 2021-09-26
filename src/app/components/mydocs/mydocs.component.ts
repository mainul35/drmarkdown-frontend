import {Component, OnInit} from '@angular/core';
import {DocModel} from '../../models/DocModel';
import {DocsService} from '../../services/docs.service';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-mydocs',
  templateUrl: './mydocs.component.html',
  styleUrls: ['./mydocs.component.scss']
})
export class MydocsComponent implements OnInit {
  myDocsList: DocModel[] = [];

  constructor(private docsService: DocsService, private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    if (this.authService.currentUserValue && this.authService.currentUserValue.id) {
      this.docsService.getMyDocs(this.authService.currentUserValue.id)
        .subscribe(
          data => {
            this.myDocsList = data;
          },
          error => {
            alert(`${error}`);
          }
        );
    }
  }

  cellDeleted(docChildId: string) {
    this.myDocsList = this.myDocsList.filter(doc => doc.id !== docChildId);
  }
}
