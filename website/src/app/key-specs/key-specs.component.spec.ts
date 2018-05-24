import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeySpecsComponent } from './key-specs.component';

describe('KeySpecsComponent', () => {
  let component: KeySpecsComponent;
  let fixture: ComponentFixture<KeySpecsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeySpecsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeySpecsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
