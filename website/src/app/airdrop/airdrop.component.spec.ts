import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirdropComponent } from './airdrop.component';

describe('AirdropComponent', () => {
  let component: AirdropComponent;
  let fixture: ComponentFixture<AirdropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirdropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirdropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
