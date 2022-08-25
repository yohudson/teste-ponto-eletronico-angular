import { Component, OnInit, OnChanges, Output, EventEmitter, Input } from '@angular/core';
import { Global } from '../../global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-ponto',
  templateUrl: './registrar-ponto.component.html',
  styleUrls: ['./registrar-ponto.component.css']
})
export class RegistrarPontoComponent implements OnInit {

  registro: any = {};
  listaFuncionarios: any = []
  listaPontos: any = []

  @Input() atualizarListaFuncionarios: any;
  @Output() refreshListaPontos = new EventEmitter<boolean>();
  @Output() permitirNovoCadastro = new EventEmitter();

  constructor(
    public global: Global
  ) { }

  ngOnInit(): void {
    this.listaFuncionarios = localStorage.getItem('@TestePonto:listaFuncionarios')
    this.listaFuncionarios = JSON.parse(this.listaFuncionarios)
    this.listaPontos = localStorage.getItem('@TestePonto:listaPontos')
    this.listaPontos = JSON.parse(this.listaPontos)
  }
  
  ngOnChanges(): void {
    this.listaFuncionarios = localStorage.getItem('@TestePonto:listaFuncionarios')
    this.listaFuncionarios = JSON.parse(this.listaFuncionarios)
    this.listaPontos = localStorage.getItem('@TestePonto:listaPontos')
    this.listaPontos = JSON.parse(this.listaPontos)
    if (this.atualizarListaFuncionarios){
      this.obterListaPontos()
    }
  }

  validaHora = (input:any) => {
    this.registro.hora = this.registro.hora.replace(/\D/g, '');
    this.registro.hora = this.registro.hora.replace(/(\d)(\d{2})$/, "$1:$2");
  }

  obterListaPontos = () => {
    this.listaPontos = localStorage.getItem('@TestePonto:listaPontos')
    this.listaPontos = JSON.parse(this.listaPontos)
    this.retornarVariavel()
  }
  
  registraPonto = () => {
    Swal.fire('Favor aguarde');
    Swal.showLoading();
    this.listaPontos = localStorage.getItem('@TestePonto:listaPontos')
    this.listaPontos = JSON.parse(this.listaPontos)
    setTimeout(() => {
      this.validaPonto().then(
        result => {
        var objeto: any = {};
        objeto = result;
        for (let ponto of this.listaPontos){
          if(objeto.funcionario_id == ponto.funcionario_id){
            if (!ponto.entrada){
                ponto.entrada = ('0'+objeto.hora).slice(-5);
                if (ponto.status == ''){
                  ponto.status = '2'
                }
                localStorage.setItem('@TestePonto:listaPontos', JSON.stringify(this.listaPontos))                
                this.refreshListaPontos.emit(true)
                Swal.close()
            }
            else { 
              Swal.fire('Atenção','O ponto de entrada já foi registrado, procure o gestor para realizar o ajuste', 'warning');
            }
          }
        }
      },
      error => {
        Swal.fire('Erro', error, 'error')
      }
      )
    },1000)
  }

  validaPonto = () => {
    return new Promise((resolve, reject) => {
      if (!this.registro.funcionario_id){
        reject('É preciso informar um funcionário')
      }
      if (!this.registro.hora){
        reject('É preciso informar um horário de entrada')
      }
      if (this.registro.hora.length < 4){
        reject('É preciso informar um horário válido para a entrada')
      }
      if (this.registro.hora.split(':')[0] > 23 || this.registro.hora.split(':')[0] < 0 ||this.registro.hora.split(':')[1] > 59 || this.registro.hora.split(':')[1] < 0){
        reject('É preciso informar uma hora válida')
      }
      resolve(this.registro)
    })
  }

  retornarVariavel = () => {
    setTimeout(() => {
      this.permitirNovoCadastro.emit(true)
    }, 1000)
  }

}
