import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { Global } from './global'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RegistrarPontoComponent } from './components/registrar-ponto/registrar-ponto.component';
import { AtividadeFuncionariosComponent } from './components/atividade-funcionarios/atividade-funcionarios.component';
import { FuncionarioComponent } from './components/funcionario/funcionario.component';
import { AddFuncionarioComponent } from './components/add-funcionario/add-funcionario.component';

// Firebase services + environment module
import { initializeApp } from 'node_modules/firebase/app/';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavBarComponent,
    RegistrarPontoComponent,
    AtividadeFuncionariosComponent,
    FuncionarioComponent,
    AddFuncionarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    Global
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    AddFuncionarioComponent
  ]
})
export class AppModule { }
