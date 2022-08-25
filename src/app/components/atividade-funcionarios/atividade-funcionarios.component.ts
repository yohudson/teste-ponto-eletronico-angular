import { Component, OnInit, OnChanges, Output, EventEmitter, Input } from '@angular/core';
import { Global } from '../../global';
import * as $ from 'jquery';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-atividade-funcionarios',
  templateUrl: './atividade-funcionarios.component.html',
  styleUrls: ['./atividade-funcionarios.component.css']
})
export class AtividadeFuncionariosComponent implements OnInit {

  listaStatus: any = []
  dados: any = {};
  listaFuncionarios: any = []
  listaPontos: any = []
  today: any = new Date();
  hora: any;
  busca: any;

  @Output() dadosFuncionario = new EventEmitter();
  @Input() atualizarListaPontos: any;
  @Input() atualizarListaFuncionarios: any;
  @Output() permitirNovoCadastro = new EventEmitter();

  filtro: any = '99';
  totalPorPagina: any = 0;
  paginaAtual: any = 1;
  totalPaginas: any = 1;

  constructor(
    public global: Global
  ) { }

  ngOnInit(): void {
    this.listaStatus = [
      {id:1,nome:'Não iniciado'},
      {id:2,nome:'Trabalhando'},
      {id:3,nome:'Em pausa'},
      {id:4,nome:'Finalizado'}
    ]
    this.listaFuncionarios = localStorage.getItem('@TestePonto:listaFuncionarios')
    this.listaFuncionarios = JSON.parse(this.listaFuncionarios)
    this.obterListaPontos();
  }

  ngOnChanges(): void {
    this.filtro = '99';
    this.listaFuncionarios = localStorage.getItem('@TestePonto:listaFuncionarios')
    this.listaFuncionarios = JSON.parse(this.listaFuncionarios)
    if (this.atualizarListaPontos){
      this.obterListaPontos()
    }
    if (this.atualizarListaFuncionarios){
      this.obterListaPontos()
    }
  }
  
  editarFuncionario = (ponto:any) => {
    this.dadosFuncionario.emit(ponto.funcionario_id)
  }

  obterListaPontos = () => {
    this.listaPontos = localStorage.getItem('@TestePonto:listaPontos')
    this.listaPontos = JSON.parse(this.listaPontos)
    this.totalPorPagina = this.listaPontos.length;
    // this.paginarItens()
    this.retornarVariavel()
  }

  novaAtividade = (ponto:any, atividade:any) => {
    Swal.fire('Favor aguarde')
    Swal.showLoading()
    this.hora = ('0'+this.today.getHours()).slice(-2)+':'+('0'+this.today.getMinutes()).slice(-2);
    for (let itemPonto of this.listaPontos){
      if (ponto == itemPonto.id){
        if (atividade == 3){
          if (!itemPonto.entrada){
            Swal.fire('Atenção!', 'Não é possível indicar uma pausa sem ter iniciado o trabalho', 'warning');
            return
          }
          itemPonto.pausa = this.hora;
          if (ponto.status != 4){
            itemPonto.status = 3;
          }
        }
        if (atividade == 2){
          if (!itemPonto.pausa){
            Swal.fire('Atenção!', 'Não é possível indicar um retorno sem ter iniciado uma pausa', 'warning');
            return
          }
          itemPonto.retorno = this.hora;
          if (ponto.status != 4){
            itemPonto.status = 2;
          }
        }
        if (atividade == 4){
          itemPonto.saida = this.hora;
            itemPonto.status = 4;
        }
        setTimeout(() => {
          localStorage.setItem('@TestePonto:listaPontos',JSON.stringify(this.listaPontos));
          Swal.close()
        }, 1000)
      }
    }
  }

  retornarVariavel = () => {
    setTimeout(() => {
      this.permitirNovoCadastro.emit(true)
    }, 1000)
  }

  filtraStatus = (status:any) => {
    Swal.fire('Favor aguarde')
    Swal.showLoading()
    this.listaPontos = localStorage.getItem('@TestePonto:listaPontos')
    this.listaPontos = JSON.parse(this.listaPontos)
    var lista: any = [];
    if (status != 0){
      for (let item of this.listaPontos){
        if(item.status == status){
          lista.push(item)
        }
      }
      this.listaPontos = lista;
    }
    Swal.close()
  }

  buscaAtiva = () => {
    this.listaPontos = localStorage.getItem('@TestePonto:listaPontos')
    this.listaPontos = JSON.parse(this.listaPontos)
    var lista: any = [];
    for (let item of this.listaPontos) {
      if (item.funcionario.toLowerCase().includes(this.busca.toLowerCase())) {
        lista.push(item)
      }
    }
    this.listaPontos = lista
  }

  paginarItens = () => {
    var lista: any = []
    this.listaPontos = localStorage.getItem('@TestePonto:listaPontos')
    this.listaPontos = JSON.parse(this.listaPontos)
    if (this.totalPorPagina == 0){
      this.listaPontos = lista;
      this.paginaAtual = 1;
      this.totalPaginas = 1;
      return
    }
    if (this.totalPorPagina < 0){
      this.totalPorPagina = 0;
      this.listaPontos = lista;
      this.paginaAtual = 1;
      this.totalPaginas = 1;
      return
    }
    this.totalPaginas = Math.ceil(this.listaPontos.length / this.totalPorPagina)
    
    for (var i = (this.paginaAtual - 1) * this.totalPorPagina; i < this.paginaAtual * this.totalPorPagina; i++) {
      if (this.listaPontos[i]){
        lista.push(this.listaPontos[i])
      }
    }
    this.listaPontos = lista;
  }

  proximaPagina = () => {
    this.paginaAtual += 1
    this.paginarItens()
  }
  paginaAnterior = () => {
    this.paginaAtual -= 1
    this.paginarItens()
  }

}
