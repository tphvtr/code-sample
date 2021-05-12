import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedItemComponent } from './breed-item.component';

describe('BreedItemComponent', () => {
  let component: BreedItemComponent;
  let fixture: ComponentFixture<BreedItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreedItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
