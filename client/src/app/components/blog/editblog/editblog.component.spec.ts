import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditblogComponent } from './editblog.component';

describe('EditblogComponent', () => {
  let component: EditblogComponent;
  let fixture: ComponentFixture<EditblogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditblogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditblogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
