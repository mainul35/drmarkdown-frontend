import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DocModel} from '../../models/DocModel';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-doc-cell',
  templateUrl: './doc-cell.component.html',
  styleUrls: ['./doc-cell.component.scss']
})
export class DocCellComponent implements OnInit {

  @Input()
  doc: DocModel | undefined;
  @Output()
  docDeleted: EventEmitter<string> = new EventEmitter<string>();

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
  }

  deleteDocument($event: MouseEvent) {
    // TODO: Call API delete document endpoint
    alert(`Doc ${this.doc?.id} has been deleted.`);
    // If successful
    // TODO: Notify the parent ->
    this.docDeleted.emit(this.doc?.id);
  }

  currentUserIsOwner() {
    if (this.doc == null || this.doc.id || this.authenticationService.currentUserValue == null) {
      return false;
    }
    const docOwner = this.doc?.userId;
    const currentUserId = this.authenticationService.currentUserValue.id;
    return docOwner === currentUserId;
  }
}
