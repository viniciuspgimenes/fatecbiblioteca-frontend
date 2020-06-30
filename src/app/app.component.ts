import { Component, OnInit } from '@angular/core';
import { LeitoresApiService } from './services/apis/leitores-api/leitores-api.service';
import { LivrosApiService } from './services/apis/livros-api/livros-api.service';
import { EmprestimoApiService } from './services/apis/emprestimo-api/emprestimo-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'fatecbiblioteca-frontend';

  constructor(private leitoresApiService: LeitoresApiService, private livrosApiService: LivrosApiService, private emprestimoApiService: EmprestimoApiService) {
  }

  ngOnInit(): void {
    this.leitoresApiService.listarLeitores().subscribe(leitores => console.log(leitores));
    this.livrosApiService.listarLivros().subscribe(leitores => console.log(leitores));
    this.emprestimoApiService.listarEmprestimos().subscribe(leitores => console.log(leitores));
  }
}
