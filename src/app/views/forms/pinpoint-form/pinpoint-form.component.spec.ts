import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinpointFormComponent } from './pinpoint-form.component';

describe('PinpointFormComponent', () => {
  let component: PinpointFormComponent;
  let fixture: ComponentFixture<PinpointFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PinpointFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PinpointFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
