import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmprestimosComponent } from './components/emprestimos/emprestimos.component';
import { LeitoresComponent } from './components/leitores/leitores.component';
import { LivrosComponent } from './components/livros/livros.component';

const routes: Routes = [
  { path: 'emprestimos', component: EmprestimosComponent },
  { path: 'leitores', component: LeitoresComponent },
  { path: 'livros', component: LivrosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
