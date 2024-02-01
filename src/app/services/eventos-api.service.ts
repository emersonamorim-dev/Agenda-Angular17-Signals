import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EventosApiService {
  private signal: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {}

  // método para emitir sinais
  public emitSignal(signal: string): void {
    this.signal.next(signal);
  }

  // método para ouvir sinais
  public onSignal(): Observable<string> {
    return this.signal.asObservable();
  }

  private addSignalToOptions(options: any, signal: string): any {
    const headers = options.headers || new HttpHeaders();
    const updatedHeaders = headers.append('X-Signal', signal);
    return { ...options, headers: updatedHeaders };
  }
  
  

  public eventosGetApi<ModelType>(url: string, headers = {}, signal: string = ''): Observable<ModelType> {
    const options = this.addSignalToOptions({ headers }, signal);
    return this.http
      .get<ModelType>(url, options)
      .pipe(catchError(this.handleError));
  }

  public eventosPostApi<ModelType>(url: string, body = {}, headers = {}, signal: string = ''): Observable<ModelType> {
    const options = this.addSignalToOptions({ headers }, signal);
    return this.http
      .post<ModelType>(url, body, options)
      .pipe(catchError(this.handleError));
  }

  public eventosPutApi<ModelType>(url: string, body = {}, headers = {}, signal: string = ''): Observable<ModelType> {
    const options = this.addSignalToOptions({ headers }, signal);
    return this.http
      .put<ModelType>(url, body, options)
      .pipe(catchError(this.handleError));
  }

  public eventosDeleteApi(url: string, headers = {}, signal: string = ''): Observable<any> {
    const options = this.addSignalToOptions({ headers }, signal);
    return this.http
      .delete(url, options)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<any> {
    // Aqui você pode tratar o erro conforme necessário
    console.error('Erro na requisição:', error);

    // Emite um sinal de erro para que os componentes possam reagir
    this.emitSignal('error-signal');

    // Retorne um Observable vazio ou lança o erro novamente
    return EMPTY;
  }
}
