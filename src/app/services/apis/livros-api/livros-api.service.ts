import { Inject, Injectable, Optional } from '@angular/core';
import { ApiService } from '../../api.service';
import { environment } from '../../../../environments/environment';
import { LivroDTO } from './interfaces/livroDTO';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LivrosApiService {

  protected basePath = environment.basePath;

  constructor(
    protected apiService: ApiService,
    @Optional() @Inject('basePath') basePath: string) {
    if (basePath) {
      this.basePath = basePath;
    }
  }


  /**
   * atualizarLivro
   *
   * @param id id
   * @param novoLivro novoLivro
   */
  public atualizarLivro(id: number, novoLivro: LivroDTO): Observable<LivroDTO> {

    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling atualizarLivroUsingPUT.');
    }

    if (novoLivro === null || novoLivro === undefined) {
      throw new Error('Required parameter novoLivro was null or undefined when calling atualizarLivroUsingPUT.');
    }

    return this.apiService.put<LivroDTO>(`${this.basePath}/livros/${encodeURIComponent(String(id))}`, novoLivro).pipe(map(response => response.body));
  }

  /**
   * buscarLivro
   *
   * @param id id
   */
  public buscarLivro(id: number): Observable<LivroDTO> {

    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling buscarLivroUsingGET.');
    }

    return this.apiService.get<LivroDTO>(`${this.basePath}/livros/${encodeURIComponent(String(id))}`).pipe(map(response => response.body));
  }

  /**
   * criarLivro
   *
   * @param novoLivro novoLivro
   */
  public criarLivro(novoLivro: LivroDTO): Observable<LivroDTO> {

    if (novoLivro === null || novoLivro === undefined) {
      throw new Error('Required parameter novoLivro was null or undefined when calling criarLivroUsingPOST.');
    }

    return this.apiService.post<LivroDTO>(`${this.basePath}/livros`, novoLivro).pipe(map(response => response.body));
  }

  /**
   * excluirLivro
   *
   * @param id id
   */
  public excluirLivro(id: number): Observable<any> {

    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling excluirLivroUsingDELETE.');
    }

    return this.apiService.delete<any>(`${this.basePath}/livros/${encodeURIComponent(String(id))}`).pipe(map(response => response.body));
  }

  /**
   * listarLivros
   *
   */
  public listarLivros(): Observable<Array<LivroDTO>> {

    return this.apiService.get<Array<LivroDTO>>(`${this.basePath}/livros`).pipe(map(response => response.body));
  }
}
