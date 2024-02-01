import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private navigationSignalSubject = new Subject<string>();
  navigationSignal$: Observable<string> = this.navigationSignalSubject.asObservable();

  emitNavigationSignal(signal: string): void {
    this.navigationSignalSubject.next(signal);
  }
}
