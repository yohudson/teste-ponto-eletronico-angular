  import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
  import { Global } from '../../global';
  import Swal from 'sweetalert2'
  import { Observable } from 'rxjs';
  
  @Component({
    selector: 'app-add-funcionario',
    templateUrl: './add-funcionario.component.html',
    styleUrls: ['./add-funcionario.component.css']
  })
  export class AddFuncionarioComponent implements OnInit {
  
    usuario: any = {}
    listaFuncionarios: any = []
    listaPontos: any = []
  
    @Input() dadosFuncionario: any = {};
    @Output() obterFuncionarios = new EventEmitter<boolean>();
    @Output() fechar = new EventEmitter<boolean>();

    regex: any = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
    constructor(
      public global: Global
      ) { }
  
    ngOnInit(): void {
      this.usuario = {};
      this.listaFuncionarios = localStorage.getItem('@TestePonto:listaFuncionarios')
      this.listaFuncionarios = JSON.parse(this.listaFuncionarios)
    }
    
    ngOnChanges(): void {
      this.listaFuncionarios = localStorage.getItem('@TestePonto:listaFuncionarios')
      this.listaFuncionarios = JSON.parse(this.listaFuncionarios)
      this.listaPontos = localStorage.getItem('@TestePonto:listaPontos')
      this.listaPontos = JSON.parse(this.listaPontos)
      this.preencherDados(this.dadosFuncionario)
    }
    
    preencherDados = (dados:any) => {
      this.usuario = dados
      if (this.usuario){
        $('#backdrop').toggleClass('offcanvas-backdrop fade show')
        $("#offcanvasNavbar").toggleClass('show')
      }
    }
  
    addFuncionario = () => {
      this.validaDados(this.usuario).then(
        result => {
          var dados: any = {};
          dados = result;
          dados.id = this.listaFuncionarios.length+1;
          this.listaFuncionarios.push(dados)
          localStorage.setItem('@TestePonto:listaFuncionarios', JSON.stringify(this.listaFuncionarios))
          this.incrementPontos(dados)
        },
        error => {
          Swal.fire('Erro', error, 'error');
        }
      )
    }
  
    incrementPontos = (dados:any) => {
      this.listaPontos.push({
        id: this.listaPontos.length + 1,
        funcionario: dados.nome,
        funcionario_id: dados.id,
        entrada:'',
        pausa:'',
        retorno:'',
        saida:''
      });
      localStorage.setItem('@TestePonto:listaPontos', JSON.stringify(this.listaPontos));
      this.postSenha(dados);
    }

    postSenha = (dados:any) =>{
      var senhas: any = [];
      senhas = localStorage.getItem('@TestePonto:listaSenhas');
      senhas = JSON.parse(senhas)
      senhas.push({
        funcionario_id: dados.id,
        senha: '123'
      })
      localStorage.setItem('@TestePonto:listaSenhas', JSON.stringify(senhas))
      this.atualizarListaFuncionarios();
    }
  
    validaDados = (dado:any) => {
      return new Promise((resolve, reject) => {
        if (!dado.nome){
          reject('?? preciso informar o nome do funcion??rio')
          return
        }
        if (!dado.cargo){
          reject('?? preciso informar o cargo do funcion??rio')
          return
        }
        if (!dado.email){
          reject('?? preciso informar o e-mail do funcion??rio')
          return
        }
        if (dado.email) {
          if (!this.regex.test(dado.email)){
            reject('Informe um e-mail v??lido para o cadastro do funcion??rio')
          }
        }
        resolve(dado)
      })
    }
  
    atualizarListaFuncionarios = () => {
      this.usuario = {}
      this.obterFuncionarios.emit(true)
    }
    
    fecharCanvas = () => {
      this.usuario = {};
      this.fechar.emit();
    }  

    updateFuncionario = () => {
      Swal.fire('Favor aguarde')
      Swal.showLoading()
      for (let item of this.listaFuncionarios){
        if (item.id == this.usuario.id){
          item.nome = this.usuario.nome;
          if (!item.nome){
            Swal.fire('Erro', 'N??o ?? poss??vel salvar o usu??rio sem um nome v??lido','error')
            return
          }
          item.cargo = this.usuario.cargo;
          if (!item.cargo){
            Swal.fire('Erro', 'N??o ?? poss??vel salvar o usu??rio sem um cargo','error')
            return
          }
          item.email = this.usuario.email;
          if (!item.email){
            Swal.fire('Erro', 'N??o ?? poss??vel salvar o usu??rio sem um e-mail v??lido','error')
            return
          }
          if (item.email) {
            if (!this.regex.test(item.email)){
              Swal.fire('Erro','Informe um e-mail v??lido para o cadastro do funcion??rio','error')
              return
            }
          }
        }
      }
      localStorage.setItem('@TestePonto:listaFuncionarios', JSON.stringify(this.listaFuncionarios));
      for (let item of this.listaPontos) {
        if (item.funcionario_id == this.usuario.id){
          if (item.funcionario != this.usuario.nome){
            item.funcionario = this.usuario.nome
          }
        }
      }
      localStorage.setItem('@TestePonto:listaPontos', JSON.stringify(this.listaPontos));
      setTimeout(() => {
        this.atualizarListaFuncionarios();
        Swal.close()
      }, 500)
    }
  }  