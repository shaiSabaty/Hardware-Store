import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemFullPageComponent } from './item-full-page.component';

describe('ItemFullPageComponent', () => {
  let component: ItemFullPageComponent;
  let fixture: ComponentFixture<ItemFullPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemFullPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemFullPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
