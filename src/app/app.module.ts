import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppBootstrapModule } from './app-bootstrap.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { EmprestimosComponent } from './components/emprestimos/emprestimos.component';
import { LeitoresComponent } from './components/leitores/leitores.component';
import { LivrosComponent } from './components/livros/livros.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EmprestimosComponent,
    LeitoresComponent,
    LivrosComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppBootstrapModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
