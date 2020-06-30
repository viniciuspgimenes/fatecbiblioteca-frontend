import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly contentTypeHeaderName: string = 'Content-Type';
  private readonly contentTypeHeaderJsonValue: string = 'application/json';

  constructor(private httpClient: HttpClient) { }

  get<T, S = {}>(url: string, queryParams?: S, headers?: Array<HeadersRequest>): Observable<HttpResponse<T>> {
    return this.httpClient.get<T>(url,
      {
        headers: this.getHeadersRequestOptions(headers),
        params: queryParams as any,
        observe: 'response'
      });
  }

  patch<T, S = {}>(url: string, data: any, headers?: Array<HeadersRequest>, queryParams?: S): Observable<HttpResponse<T>> {
    return this.httpClient.patch<T>(url,
      data,
      {
        headers: this.getHeadersRequestOptions(headers),
        params: queryParams as any,
        observe: 'response'
      });
  }

  delete<T, S = {}>(url: string, headers?: Array<HeadersRequest>, queryParams?: S): Observable<HttpResponse<T>> {
    return this.httpClient.delete<T>(url,
      {
        headers: this.getHeadersRequestOptions(headers),
        params: queryParams as any,
        observe: 'response'
      }
    );
  }

  post<T, S = {}>(url: string, data: any, headers?: Array<HeadersRequest>, queryParams?: S): Observable<HttpResponse<T>> {
    return this.httpClient.post<T>(url,
      data,
      {
        headers: this.getHeadersRequestOptions(headers),
        params: queryParams as any,
        observe: 'response'
      });
  }

  put<T, S = {}>(url: string, data: any, headers?: Array<HeadersRequest>, queryParams?: S): Observable<HttpResponse<T>> {
    return this.httpClient.put<T>(url,
      data,
      {
        headers: this.getHeadersRequestOptions(headers),
        params: queryParams as any,
        observe: 'response'
      });
  }

  private getHeadersRequestOptions(headers?: Array<HeadersRequest>): HttpHeaders {
    let httpHeaders: HttpHeaders = new HttpHeaders({
      [this.contentTypeHeaderName]: this.contentTypeHeaderJsonValue
    });

    if (headers) {
      headers.forEach(({param, value}) => httpHeaders = httpHeaders.set(param, value));
    }

    return httpHeaders;
  }
}

interface HeadersRequest {
  param: string;
  value: string;
}
