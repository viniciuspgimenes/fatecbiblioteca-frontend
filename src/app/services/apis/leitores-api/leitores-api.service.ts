import { Inject, Injectable, Optional } from '@angular/core';
import { ApiService } from '../../api.service';
import { LeitorDTO } from './interfaces/leitorDTO';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeitoresApiService {

  protected basePath = environment.basePath;

  constructor(
    protected apiService: ApiService,
    @Optional() @Inject('basePath') basePath: string) {
    if (basePath) {
      this.basePath = basePath;
    }
  }

  /**
   * atualizarLeitor
   *
   * @param id id
   * @param novoLeitor novoLeitor
   */
  public atualizarLeitor(id: number, novoLeitor: LeitorDTO): Observable<HttpResponse<LeitorDTO>> {

    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling atualizarLeitorUsingPUT.');
    }

    if (novoLeitor === null || novoLeitor === undefined) {
      throw new Error('Required parameter novoLeitor was null or undefined when calling atualizarLeitorUsingPUT.');
    }

    return this.apiService.put<LeitorDTO>(`${this.basePath}/leitores/${encodeURIComponent(String(id))}`, novoLeitor);
  }

  /**
   * buscarLeitor
   *
   * @param id id
   */
  public buscarLeitor(id: number): Observable<LeitorDTO> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling buscarLeitorUsingGET.');
    }

    return this.apiService.get<LeitorDTO>(`${this.basePath}/leitores//${encodeURIComponent(String(id))}`).pipe(map(response => response.body));
  }

  /**
   * criarLeitor
   *
   * @param novoLeitor novoLeitor
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public criarLeitor(novoLeitor: LeitorDTO, observe?: 'response', reportProgress?: boolean): Observable<LeitorDTO> {
    if (novoLeitor === null || novoLeitor === undefined) {
      throw new Error('Required parameter novoLeitor was null or undefined when calling criarLeitorUsingPOST.');
    }

    return this.apiService.post<LeitorDTO>(`${this.basePath}/leitores/`, novoLeitor).pipe(map(response => response.body));
  }

  /**
   * excluirLeitor
   *
   * @param id id
   */
  public excluirLeitor(id: number): Observable<any> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling excluirLeitorUsingDELETE.');
    }

    return this.apiService.delete<any>(`${this.basePath}/leitores/${encodeURIComponent(String(id))}`).pipe(map(response => response.body));
  }

  /**
   * listarLeitores
   *
   */
  public listarLeitores(): Observable<Array<LeitorDTO>> {
    return this.apiService.get<Array<LeitorDTO>>(`${this.basePath}/leitores/`).pipe(map(response => response.body));
  }
}
