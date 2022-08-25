import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  log: any = {};
  listaFuncionarios: any = [];

  constructor(    
    public router: Router
  ) { }

  ngOnInit(): void {
    this.listaFuncionarios = localStorage.getItem('@TestePonto:listaFuncionarios')
    this.listaFuncionarios = JSON.parse(this.listaFuncionarios)
  }

  login = () => {
    Swal.fire('Favor aguarde')
    Swal.showLoading()
    if (!this.log.usuario) {
      Swal.fire('Erro', 'É preciso informar um nome de usuário para entrar no sistema', 'error')
    }
    if (!this.log.senha) {
      Swal.fire('Erro', 'É preciso informar a senha do usuário para entrar no sistema', 'error')
    }
    for (let item of this.listaFuncionarios) {
      if (item.email === this.log.usuario){
        var senhas: any = [];
        senhas = localStorage.getItem('@TestePonto:listaSenhas')
        senhas = JSON.parse(senhas)
        for (let reg of senhas){
          if (item.id === reg.funcionario_id){
            if (this.log.senha === reg.senha){
              var save: any = {};
              save.usuario = this.log.usuario
              save.nome = item.nome
              save.usuario_id = item.id
              save.capitals = (item.nome[0]+(item.nome.split(' ').pop())[0]).toUpperCase();
              localStorage.setItem('@TestePonto:login', JSON.stringify(save))
              this.router.navigate(['/']);
              Swal.close()
              return
            }
            else {
              Swal.fire('Atenção', 'A senha digitada está incorreta. Tente novamente', 'warning');
              return
            }
          }
        }
      }
      else {
        Swal.fire('Erro', 'Usuário não encontrado', 'error')
      }
    }
  }

}
