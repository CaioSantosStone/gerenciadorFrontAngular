import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionCadastroAlunoComponent } from './option-cadastro-aluno.component';

describe('OptionCadastroAlunoComponent', () => {
  let component: OptionCadastroAlunoComponent;
  let fixture: ComponentFixture<OptionCadastroAlunoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionCadastroAlunoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionCadastroAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
