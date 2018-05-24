import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageSendComponent } from './message-send.component';

describe('MessageSendComponent', () => {
  let component: MessageSendComponent;
  let fixture: ComponentFixture<MessageSendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageSendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
