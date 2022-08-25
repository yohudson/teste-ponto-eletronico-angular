import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtividadeFuncionariosComponent } from './atividade-funcionarios.component';

describe('AtividadeFuncionariosComponent', () => {
  let component: AtividadeFuncionariosComponent;
  let fixture: ComponentFixture<AtividadeFuncionariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtividadeFuncionariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtividadeFuncionariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
