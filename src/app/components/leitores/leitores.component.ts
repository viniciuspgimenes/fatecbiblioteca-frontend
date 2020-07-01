import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LeitorDTO } from '../../services/apis/leitores-api/interfaces/leitorDTO';
import { LeitoresApiService } from '../../services/apis/leitores-api/leitores-api.service';

@Component({
  selector: 'app-leitores',
  templateUrl: './leitores.component.html',
  styleUrls: ['./leitores.component.scss']
})
export class LeitoresComponent implements OnInit {
  leitores: Array<LeitorDTO>;
  modalRef: BsModalRef;
  leitorSelecionado: LeitorDTO;

  constructor(
    private leitoresApiService: LeitoresApiService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.listarLeitores();
  }

  abrirModal(template: TemplateRef<any>, leitor: LeitorDTO) {
    this.leitorSelecionado = {...leitor};
    this.modalRef = this.modalService.show(template);
  }

  fecharModal() {
    this.modalRef.hide();
  }

  excluirLeitor(id: number) {
    this.leitoresApiService.excluirLeitor(id).subscribe(() => {
      this.fecharModal();
      this.listarLeitores();
    });
  }

  private listarLeitores() {
    this.leitoresApiService.listarLeitores().subscribe(leitores => this.leitores = leitores);
  }

  editarLeitor(leitorSelecionado: LeitorDTO) {
    this.leitoresApiService.atualizarLeitor(leitorSelecionado.id, leitorSelecionado).subscribe(() => {
      this.fecharModal();
      this.listarLeitores();
    });
  }

  criarLeitor(leitorSelecionado: LeitorDTO) {
    this.leitoresApiService.criarLeitor(leitorSelecionado).subscribe(() => {
      this.fecharModal();
      this.listarLeitores();
    });
  }
}
