import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDialogLayoutComponent } from './detail-dialog-layout.component';

describe('DetailDialogLayoutComponent', () => {
  let component: DetailDialogLayoutComponent;
  let fixture: ComponentFixture<DetailDialogLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailDialogLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailDialogLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
