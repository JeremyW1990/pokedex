import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonIndexComponent } from './pokemon-index.component';

describe('PokemonIndexComponent', () => {
  let component: PokemonIndexComponent;
  let fixture: ComponentFixture<PokemonIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
