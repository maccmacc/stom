import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StavkaPlanaRada } from '../models/stavka-plana-rada';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StavkaPlanaRadaService {
  private readonly API_URL = environment.baseUrl + '/stavkaPlanaRada';
  dataChange: BehaviorSubject<StavkaPlanaRada[]> = new BehaviorSubject<StavkaPlanaRada[]>([]);
  private dialogData: any;

  constructor(private http: HttpClient) {}

  public getAllStavkaPlanaRada(): Observable<StavkaPlanaRada[]> {
    this.http.get<StavkaPlanaRada[]>(this.API_URL).subscribe(data => {
        this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + ' ' + error.message);
    });
    return this.dataChange.asObservable();
  }

  public getStavkaByPlanRada(idPlana): Observable<StavkaPlanaRada[]> {
    this.http.get<StavkaPlanaRada[]>(this.API_URL + '/stavkeZaPlanRadaId/' + idPlana).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + ' ' + error.message);
    });
    return this.dataChange.asObservable();
  }

  public addStavkaPlanaRada(stavkaPlanaRada: StavkaPlanaRada): void {
    this.http.post(this.API_URL, stavkaPlanaRada).subscribe(data => {
      this.dialogData = stavkaPlanaRada;
    });
  }

  public updateStavkaPlanaRada(stavkaPlanaRada: StavkaPlanaRada): void {
    this.http.put(this.API_URL + '/' + stavkaPlanaRada.id, stavkaPlanaRada).subscribe(data => {
      this.dialogData = stavkaPlanaRada;
    });
  }

  public deleteStavkaPlanaRada(id: number): void {
    this.http.delete(this.API_URL + '/' + id).subscribe(data => {
    });
  }

  public getNextID(addStavkaPlanaRada, stavkaPlanaRada: StavkaPlanaRada) {
    this.http.get(this.API_URL + 'NextId').subscribe(
      data => {
        stavkaPlanaRada.id = data as number;
        this.addStavkaPlanaRada(stavkaPlanaRada);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }
}
