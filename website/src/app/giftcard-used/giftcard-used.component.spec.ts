import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftcardUsedComponent } from './giftcard-used.component';

describe('GiftcardUsedComponent', () => {
  let component: GiftcardUsedComponent;
  let fixture: ComponentFixture<GiftcardUsedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftcardUsedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftcardUsedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
