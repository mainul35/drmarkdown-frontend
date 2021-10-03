import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DocModel} from '../../models/DocModel';
import {AuthenticationService} from '../../services/authentication.service';
import {DocsService} from '../../services/docs.service';
import {Router} from '@angular/router';
import {SpinnerVisibilityService} from 'ng-http-loader';

@Component({
  selector: 'app-doc-cell',
  templateUrl: './doc-cell.component.html',
  styleUrls: ['./doc-cell.component.scss']
})
export class DocCellComponent implements OnInit {

  @Input()
    // @ts-ignore
  doc: DocModel;

  @Output()
  availabilityChanged: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  docDeleted: EventEmitter<string> = new EventEmitter<string>();

  constructor(private authenticationService: AuthenticationService,
              private docService: DocsService,
              private router: Router,
              private spinner: SpinnerVisibilityService
  ) {
  }

  ngOnInit(): void {
  }

  deleteDocument($event: MouseEvent) {
    // TODO: Call API delete document endpoint
    $event.stopPropagation();
    this.spinner.show();
    this.docService.deleteDocument(this.doc?.id)
      .subscribe(
        data => {
          this.docDeleted.emit(this.doc?.id);
          this.spinner.hide();
        },
        e => {
          console.log('Error: ', e);
          alert('Failed to delete document');
          this.spinner.hide();
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

  cellClicked() {
    if (this.doc?.id && this.currentUserIsOwner()) {
      this.router.navigate(['/doc', this.doc.id]);
    } else {
      alert(`This doc with id ${this.doc?.id} is not owned by current user`);
    }
  }

  cellStatusChanged(event: any) {
    const status = event.target.checked;
    const updatedAtTemp = this.doc.updatedAt;
    this.doc.updatedAt = '';
    this.doc.available = status;
    this.spinner.show();
    this.docService.updateDoc(this.doc)
      .subscribe(
        data => {
          this.doc = data;
          this.availabilityChanged.emit();
          this.spinner.hide();
        },
        error => {
          this.doc.available = !status;
          this.doc.updatedAt = updatedAtTemp;
          console.error('Error: ' + error.getMessage());
          this.spinner.hide();
        }
      );
  }
}
