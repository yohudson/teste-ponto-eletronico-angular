import { Component, OnInit, OnChanges, Input, AfterContentInit } from '@angular/core';
import { Global } from '../../global';
import * as $ from 'jquery';
import Swal from 'sweetalert2';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  dados: any;
  listaFuncionarios: any;
  funcionario: any;
  listaPontos: any;
  login: any;

  @Input() atualizarListaPontos: any;
  buscarPontos: boolean = false;
  buscarPontosFuncionarios: boolean = false;
  buscarNovosFuncionarios: boolean = false;
  
  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
    var log =  localStorage.getItem('@TestePonto:login')
    if (!log){
      this.router.navigate(['/login'])
    }
  }
  
  ngOnChanges(): void {}

  recebeDadosFuncionario = (id:any) => {
    if(id){
      this.obterListaFuncionarios().then(
        result => {
          for (let item of this.listaFuncionarios){
            if (item.id == id){
              this.funcionario = item;
              if (this.funcionario){
                this.dados = this.funcionario;
              }
            }
          }
        },
        error => {
          Swal.fire('Erro', error, 'error')
        }
      )
    }
  }
  
  obterListaFuncionarios = () => {
    return new Promise((resolve, reject) => {
      if(localStorage.getItem('@TestePonto:listaFuncionarios')){
        this.listaFuncionarios = localStorage.getItem('@TestePonto:listaFuncionarios')
        this.listaFuncionarios = JSON.parse(this.listaFuncionarios)
        resolve('Dados carregados')
      }
      else { 
        reject('Dados não encontrados')
      }
    })
  }

  fecharBackdrop = () => {
    $('#backdrop').toggleClass('offcanvas-backdrop show')
    $("#offcanvasNavbar").toggleClass('show')
    this.funcionario = {}
    this.buscarPontosFuncionarios = false;
    this.buscarNovosFuncionarios = false;
  }

  novoFuncionario = () => {
    this.dados = {};
  }

  obterListaPontosAtualizada = () => {
    this.buscarPontosFuncionarios = true;
  }
  
  obterListaFuncionariosAtualizada = () => {
    this.buscarNovosFuncionarios = true;
  }

  resetaVariavel = () => {
    this.buscarPontosFuncionarios = false;
    this.buscarNovosFuncionarios = false;
  }

}
