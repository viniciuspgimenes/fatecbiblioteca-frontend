import { Inject, Injectable, Optional } from '@angular/core';
import { ApiService } from '../../api.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { EmprestimoDTO } from './interfaces/emprestimoDTO';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmprestimoApiService {

  protected basePath = environment.basePath;

  constructor(
    protected apiService: ApiService,
    @Optional() @Inject('basePath') basePath: string) {
    if (basePath) {
      this.basePath = basePath;
    }
  }

  /**
   * atualizarEmprestimo
   *
   * @param id id
   * @param novoEmprestimo novoEmprestimo
   */
  public atualizarEmprestimo(id: number, novoEmprestimo: EmprestimoDTO): Observable<EmprestimoDTO> {

    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling atualizarEmprestimoUsingPUT.');
    }

    if (novoEmprestimo === null || novoEmprestimo === undefined) {
      throw new Error('Required parameter novoEmprestimo was null or undefined when calling atualizarEmprestimoUsingPUT.');
    }

    return this.apiService.put<EmprestimoDTO>(`${this.basePath}/emprestimos/${encodeURIComponent(String(id))}`, novoEmprestimo).pipe(map(response => response.body));
  }

  /**
   * buscarEmprestimo
   *
   * @param id id
   */
  public buscarEmprestimo(id: number): Observable<EmprestimoDTO> {

    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling buscarEmprestimoUsingGET.');
    }

    return this.apiService.get<EmprestimoDTO>(`${this.basePath}/emprestimos/${encodeURIComponent(String(id))}`).pipe(map(response => response.body));
  }

  /**
   * criarEmprestimo
   *
   * @param novoEmprestimo novoEmprestimo
   */
  public criarEmprestimo(novoEmprestimo: EmprestimoDTO): Observable<EmprestimoDTO> {

    if (novoEmprestimo === null || novoEmprestimo === undefined) {
      throw new Error('Required parameter novoEmprestimo was null or undefined when calling criarEmprestimoUsingPOST.');
    }

    return this.apiService.post<EmprestimoDTO>(`${this.basePath}/emprestimos`, novoEmprestimo).pipe(map(response => response.body));
  }

  /**
   * excluirEmprestimo
   *
   * @param id id
   */
  public excluirEmprestimo(id: number): Observable<any> {

    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling excluirEmprestimoUsingDELETE.');
    }

    return this.apiService.delete<any>(`${this.basePath}/emprestimos/${encodeURIComponent(String(id))}`).pipe(map(response => response.body));
  }

  /**
   * listarEmprestimos
   *
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public listarEmprestimos(observe?: 'response', reportProgress?: boolean): Observable<Array<EmprestimoDTO>> {
    return this.apiService.get<Array<EmprestimoDTO>>(`${this.basePath}/emprestimos`).pipe(map(response => response.body));
  }
}
