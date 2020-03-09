import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {Debtor} from '../models';
import {Observable, of} from 'rxjs';
import {catchError, map, mapTo} from 'rxjs/operators';

interface DebtorRequestBody {
  name: string;
  lastname: string;
  age: number;
  debt: number;
  location: string;
}

@Injectable({ providedIn: 'root' })
export class DebtorsService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Debtor[]>(`http://localhost:8443/api/debtors/list`);
  }

  /*public addDebtor(debtor: DebtorRequestBody): Observable<boolean> {
    return this.http.post<string>(`http://localhost:8443/api/debtors/add`, debtor).pipe(
      mapTo(true),
      catchError(error => {
        console.log(error);
        return of(false);
      })
    );
  }*/
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

  private handleError(error: any) {
    if (error instanceof HttpErrorResponse) {
      alert(`${error.message}`);
    } else {
      alert(error);
    }
  }
  /*deleteDebtor(id: number): Observable<any> {
    return this.http.delete(`http://localhost:8443/api/debtors/remove/:` + id);
  }*/
}
