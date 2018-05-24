import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageFailedComponent } from './message-failed.component';

describe('MessageFailedComponent', () => {
  let component: MessageFailedComponent;
  let fixture: ComponentFixture<MessageFailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageFailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
