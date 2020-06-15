import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import { Killer } from '../models';
import {Observable, of} from 'rxjs';
import {catchError, mapTo} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class KillerService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Killer[]>(`http://localhost:8443/api/killers/list`);
  }

  addKiller(data): Observable<any> {
    return this.http.post(`http://localhost:8443/api/killers/add`, data);
  }

  public deleteKiller(killerId: number): Observable<boolean> {
    return this.http.delete<string>(`http://localhost:8443/api/killers/remove/${killerId}`).pipe(
      mapTo(true),
      catchError(error => {
        this.handleError(error);
        return of(false);
      })
    );
  }

  public updateKiller(killerId: number, data): Observable<boolean> {
    return this.http.put<string>(`http://localhost:8443/api/killers/edit/${killerId}`, data).pipe(
      mapTo(true),
      catchError(error => {
        this.handleError(error);
        return of(false);
      })
    );
  }

  public setTarget(targetRequestBody: { killerId: number; targetId: number }): Observable<boolean> {
    return this.http.post<string>(`http://localhost:8443/api/killers/set-target`, targetRequestBody).pipe(
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      }));
  }

  public cancelTarget(targetId: number): Observable<boolean> {
    return this.http.delete<string>(`http://localhost:8443/api/killers/cancel-target/${targetId} `).pipe(
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
