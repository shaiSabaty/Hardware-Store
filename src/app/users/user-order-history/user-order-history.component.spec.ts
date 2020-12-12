import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOrderHistoryComponent } from './user-order-history.component';

describe('UserOrderHistoryComponent', () => {
  let component: UserOrderHistoryComponent;
  let fixture: ComponentFixture<UserOrderHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserOrderHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOrderHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
