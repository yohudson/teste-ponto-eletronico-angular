import { Component } from '@angular/core';
import { Global } from './global';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'teste-ponto-eletronico-angular';

  listaFuncionarios: any = [
    {id:1, nome:'John Doe', cargo:'Desenvolvedor',email:'johndoe@email.com'},
    {id:2, nome:'Jane Doe', cargo:'Desenvolvedor',email:'janedoe@email.com'},
    {id:3, nome:'Morgan Threeman', cargo:'Desenvolvedor',email:'morgan3man@email.com'},
    {id:4, nome:'Gene Simmons', cargo:'Desenvolvedor',email:'gsimmons@email.com'}
  ]

  listaPontos: any = [
    {id:1, funcionario:'Jonh Doe', funcionario_id:'1', status: '1', entrada:'', pausa:'', retorno:'', saida:''},
    {id:2, funcionario:'Jane Doe', funcionario_id:'2', status: '1', entrada:'', pausa:'', retorno:'', saida:''},
    {id:3, funcionario:'Morgan Threeman', funcionario_id:'3', status: '1', entrada:'', pausa:'', retorno:'', saida:''},
    {id:4, funcionario:'Gene Simmons', funcionario_id:'4', status: '1', entrada:'', pausa:'', retorno:'', saida:''},
  ]

  listaSenhas: any = [
    {funcionario_id: 1, senha: '123'},
    {funcionario_id: 2, senha: '123'},
    {funcionario_id: 3, senha: '123'},
    {funcionario_id: 4, senha: '123'},
  ]

  constructor(
    public global: Global,
    private router: Router,

  ) { }

  ngOnInit() {
    var validaListaFuncionarios = localStorage.getItem('@TestePonto:listaFuncionarios')
    if (!validaListaFuncionarios) {
      localStorage.setItem('@TestePonto:listaFuncionarios', JSON.stringify(this.listaFuncionarios));
    }
    if (validaListaFuncionarios){
      this.listaFuncionarios = JSON.parse(validaListaFuncionarios)
    }
    var validaListaPontos = localStorage.getItem('@TestePonto:listaPontos')
    if (!validaListaPontos) {
      localStorage.setItem('@TestePonto:listaPontos', JSON.stringify(this.listaPontos));
      localStorage.setItem('@TestePonto:listaSenhas', JSON.stringify(this.listaSenhas));
    }
    if (validaListaPontos){
      this.listaPontos = JSON.parse(validaListaPontos)
    }
    var log: any = localStorage.getItem('@TestePonto:login')
    if (!log){
      this.router.navigate(['/login']);
    }
    else{
      this.router.navigate(['/']);
    }
  }

  ngOnChanges() {
    this.listaPontos = localStorage.getItem('@TestePonto:listaPontos')
    this.listaPontos = JSON.parse(this.listaPontos)
    this.listaFuncionarios = localStorage.getItem('@TestePonto:listaFuncionarios')
    this.listaFuncionarios = JSON.parse(this.listaFuncionarios)
  }

}
