import {Component, OnInit} from '@angular/core';
import {DocModel} from '../../models/DocModel';
import {ActivatedRoute, Router} from '@angular/router';
import {DocsService} from '../../services/docs.service';

@Component({
  selector: 'app-doc-component',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.scss']
})
export class DocComponent implements OnInit {
  // @ts-ignore
  doc: DocModel;
  content: string | undefined = '';
  docIdParam = '';
  docTitle: string | undefined = '';

  constructor(private route: ActivatedRoute, private docsService: DocsService, private router: Router) {
    this.route.params.subscribe(params => {
      if (params?.id) {
        this.docIdParam = params.id;
      }
    });
  }

  ngOnInit(): void {
    if (this.docIdParam) {
      this.fetchDocument();
    }
  }

  loadSuccessful($event: string) {
    console.log(`loading successful`);
  }

  onError(event: string) {
    alert(`Could not load doc ${this.docIdParam}: ${event}`);
  }

  saveDoc() {
    this.doc.content = this.content;
    this.doc.updatedAt = '';
    this.doc.title = this.docTitle;
    this.docsService.updateDoc(this.doc)
      .subscribe(
        data => {
          console.log('Doc saved successfully');
          this.router.navigate(['/my-docs']);
        },
        error => {
          alert('Failed to save doc');
          console.error(error);
        }
      );
  }

  private fetchDocument() {
    this.docsService.fetchDoc(this.docIdParam)
      .subscribe(
        data => {
          this.doc = data;
          this.content = this.doc?.content;
          this.docTitle = this.doc.title;
        },
        error => {
          alert(`Could not fetch doc ${this.docIdParam}: ${error}`);
        }
      );
    //
  }
}
