import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DocModel} from '../../models/DocModel';
import {AuthenticationService} from '../../services/authentication.service';
import {DocsService} from '../../services/docs.service';

@Component({
  selector: 'app-doc-cell',
  templateUrl: './doc-cell.component.html',
  styleUrls: ['./doc-cell.component.scss']
})
export class DocCellComponent implements OnInit {

  @Input()
  doc ?: DocModel;
  @Output()
  docDeleted: EventEmitter<string> = new EventEmitter<string>();

  constructor(private authenticationService: AuthenticationService, private docService: DocsService) {
  }

  ngOnInit(): void {
  }

  deleteDocument($event: MouseEvent) {
    // TODO: Call API delete document endpoint
    this.docService.deleteDocument(this.doc?.id)
      .subscribe(
        data => {
          this.docDeleted.emit(this.doc?.id);
        },
        e => {
          console.log('Error: ', e);
          alert('Failed to delete document');
        }
      );
    // If successful
    // TODO: Notify the parent ->

  }

  currentUserIsOwner() {
    if (this.doc == null || this.doc.id == null || this.authenticationService.currentUserValue == null) {
      return false;
    }
    const docOwner = this.doc?.userId;
    const currentUserId = this.authenticationService.currentUserValue.id;
    return docOwner === currentUserId;
  }
}
