import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoGridComponent } from './photo-grid.component';

describe('PhotoGridComponent', () => {
  let component: PhotoGridComponent;
  let fixture: ComponentFixture<PhotoGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
