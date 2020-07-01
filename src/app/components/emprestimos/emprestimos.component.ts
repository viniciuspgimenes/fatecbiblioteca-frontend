import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EmprestimoDTO } from '../../services/apis/emprestimo-api/interfaces/emprestimoDTO';
import { EmprestimoApiService } from '../../services/apis/emprestimo-api/emprestimo-api.service';
import { LivrosApiService } from '../../services/apis/livros-api/livros-api.service';
import { LeitoresApiService } from '../../services/apis/leitores-api/leitores-api.service';
import { LeitorDTO } from '../../services/apis/leitores-api/interfaces/leitorDTO';
import { LivroDTO } from '../../services/apis/livros-api/interfaces/livroDTO';

@Component({
  selector: 'app-emprestimos',
  templateUrl: './emprestimos.component.html',
  styleUrls: ['./emprestimos.component.scss']
})
export class EmprestimosComponent implements OnInit {
  emprestimos: Array<EmprestimoDTO>;
  leitores: Array<LeitorDTO>;
  livros: Array<LivroDTO>;
  modalRef: BsModalRef;
  emprestimoSelecionado: EmprestimoDTO;
  leitorSelecionadoId: number;
  livroSelecionadoId: number;

  constructor(
    private emprestimoApiService: EmprestimoApiService,
    private livrosApiService: LivrosApiService,
    private leitoresApiService: LeitoresApiService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.listarEmprestimos();
  }

  abrirModal(template: TemplateRef<any>, emprestimo: EmprestimoDTO) {
    this.emprestimoSelecionado = {...emprestimo};
    this.modalRef = this.modalService.show(template);
  }

  fecharModal() {
    this.modalRef.hide();
  }

  private listarEmprestimos() {
    this.emprestimoApiService.listarEmprestimos().subscribe(emprestimos => this.emprestimos = emprestimos);
    this.livrosApiService.listarLivros().subscribe(livros => this.livros = livros);
    this.leitoresApiService.listarLeitores().subscribe(leitores => this.leitores = leitores);

  }

  editarEmprestimo(emprestimo: EmprestimoDTO) {
    this.emprestimoApiService.atualizarEmprestimo(emprestimo.id, {
      leitorId: this.leitorSelecionadoId,
      livroId: this.livroSelecionadoId,
      movimentacao: emprestimo.movimentacao,
      dataMovimentacao: emprestimo.dataMovimentacao
    }).subscribe(() => {
      this.fecharModal();
      this.listarEmprestimos();
    });
  }

  emprestarLivro(livroSelecionadoId: number, leitorSelecionadoId: number) {
    this.emprestimoApiService.criarEmprestimo({
      livroId: livroSelecionadoId,
      leitorId: leitorSelecionadoId,
      movimentacao: 'Emprestado'
    }).subscribe(() => {
      this.fecharModal();
      this.listarEmprestimos();
    });
  }

  obterLeitor(leitorId: number) {
    return (this.leitores || []).find(leitor => leitor.id === leitorId)?.nome;
  }

  obterLivro(livroId: number) {
    return (this.livros || []).find(livro => livro.id === livroId)?.titulo;
  }
}
