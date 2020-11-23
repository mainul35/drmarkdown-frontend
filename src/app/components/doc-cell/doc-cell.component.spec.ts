import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DocCellComponent} from './doc-cell.component';

describe('DocCellComponent', () => {
  let component: DocCellComponent;
  let fixture: ComponentFixture<DocCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocCellComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
