import { Component, OnInit, TemplateRef } from '@angular/core';
import { LivrosApiService } from '../../services/apis/livros-api/livros-api.service';
import { LivroDTO } from '../../services/apis/livros-api/interfaces/livroDTO';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
  styleUrls: ['./livros.component.scss']
})
export class LivrosComponent implements OnInit {
  livros: Array<LivroDTO>;
  modalRef: BsModalRef;
  livroSelecionado: LivroDTO;

  constructor(
    private livrosApiService: LivrosApiService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.listarLivros();
  }

  abrirModal(template: TemplateRef<any>, livro: LivroDTO) {
    this.livroSelecionado = {...livro};
    this.modalRef = this.modalService.show(template);
  }

  fecharModal() {
    this.modalRef.hide();
  }

  excluirLivro(id: number) {
    this.livrosApiService.excluirLivro(id).subscribe(() => {
      this.fecharModal();
      this.listarLivros();
    });
  }

  private listarLivros() {
    this.livrosApiService.listarLivros().subscribe(livros => this.livros = livros);
  }

  editarLivro(livroSelecionado: LivroDTO) {
    this.livrosApiService.atualizarLivro(livroSelecionado.id, livroSelecionado).subscribe(() => {
      this.fecharModal();
      this.listarLivros();
    });
  }

  criarLivro(livro: LivroDTO) {
    this.livrosApiService.criarLivro(livro).subscribe(() => {
      this.fecharModal();
      this.listarLivros();
    });
  }
}
