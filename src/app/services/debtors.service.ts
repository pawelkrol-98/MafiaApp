import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {Debtor} from '../models';
import {Observable, of} from 'rxjs';
import {catchError, map, mapTo} from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class DebtorsService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Debtor[]>(`http://localhost:8443/api/debtors/list`);
  }

  addDebtor(data): Observable<any> {
    return this.http.post(`http://localhost:8443/api/debtors/add`, data);
  }

  public deleteDebtor(debtorId: number): Observable<boolean> {
    return this.http.delete<string>(`http://localhost:8443/api/debtors/remove/${debtorId}`).pipe(
      mapTo(true),
      catchError(error => {
        this.handleError(error);
        return of(false);
      })
    );
  }

  public updateDebtor(debtorId: number, data): Observable<boolean> {
    return this.http.put<string>(`http://localhost:8443/api/debtors/edit/${debtorId}`, data).pipe(
      mapTo(true),
      catchError(error => {
        this.handleError(error);
        return of(false);
      })
    );
  }

  public cancelOrder(id: number): Observable<boolean> {
    return this.http.delete<string>(`http://localhost:8443/api/debtors/cancel-task/${id} `).pipe(
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      }));
  }

  private handleError(error: any) {
    if (error instanceof HttpErrorResponse) {
      alert(`${error.message}`);
    } else {
      alert(error);
    }
  }

}
