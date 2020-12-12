import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsExpandComponent } from './user-details-expand.component';

describe('UserDetailsExpandComponent', () => {
  let component: UserDetailsExpandComponent;
  let fixture: ComponentFixture<UserDetailsExpandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailsExpandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsExpandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
