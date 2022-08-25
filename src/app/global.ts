import { Injectable } from "@angular/core";

@Injectable()
export class Global {

  constructor() {}

  statusTrabalho: any = [
    {id:1,nome:'Trabalhando'},
    {id:2,nome:'Não iniciado'},
    {id:3,nome:'Em pausa'},
    {id:4,nome:'Finalizado'}
  ]

  capitals: any;
  
}