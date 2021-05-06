import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ScriptComponent } from './script.component';
import { ScriptService } from './script.service';

describe('ScriptComponent', () => {
  let component: ScriptComponent;
  let fixture: ComponentFixture<ScriptComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ScriptComponent ],
      providers: [ ScriptService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
