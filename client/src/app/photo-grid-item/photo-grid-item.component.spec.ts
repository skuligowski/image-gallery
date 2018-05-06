import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoGridItemComponent } from './photo-grid-item.component';

describe('PhotoGridItemComponent', () => {
  let component: PhotoGridItemComponent;
  let fixture: ComponentFixture<PhotoGridItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoGridItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoGridItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
