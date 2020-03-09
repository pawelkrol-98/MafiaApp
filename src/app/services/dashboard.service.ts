import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Widget} from '../models';
import {Observable, of} from 'rxjs';
import {catchError, map, mapTo} from 'rxjs/operators';

interface DashResponse {
  widgets: string;
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(private http: HttpClient) { }

  getWidgets(userId): Observable<Widget[]> {
    return this.http.get<DashResponse>(`http://localhost:8443/api/dashboard/get/${userId}` ).pipe(
      map(value => JSON.parse(value.widgets))
    );
  }

  public saveWidgets(userId: number, widgets: Widget[]): Observable<boolean> {
    return this.http.post<string>(`http://localhost:8443/api/dashboard/add`, {
      userId, widgets: JSON.stringify(widgets) }).pipe(
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      })
    );
  }
}
