import { Component, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @Output() novoFuncionario = new EventEmitter();

  capitals: string = '';

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
    var capitals: any = localStorage.getItem('@TestePonto:login');
    capitals = JSON.parse(capitals);
    this.capitals = capitals.capitals;
  }

  criarNovoFuncionario = () => {
    this.novoFuncionario.emit(true)
  }

  logout = () => {
    var pontos: any = localStorage.getItem('@TestePonto:listaPontos')
    pontos = JSON.parse(pontos)
    for (let ponto of pontos) {
      ponto.entrada = ''
      ponto.pausa = ''
      ponto.retorno = ''
      ponto.saida = ''
      ponto.status = '1'
    }
    localStorage.setItem('@TestePonto:listaPontos', JSON.stringify(pontos))
    localStorage.removeItem('@TestePonto:login');
    this.router.navigate(['/login']);
  }

}
