import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { StavkaPlanaRada } from '../models/stavka-plana-rada';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StavkaPlanaRadaService {
    private readonly API_URL = 'http://147.91.175.211:8080/stom/stavkaPlanaRada';
    dataChange: BehaviorSubject<StavkaPlanaRada[]> = new BehaviorSubject<StavkaPlanaRada[]>([]);
    private dialogData: any;
  constructor(private _http: HttpClient) {}

  public getAllStavkaPlanaRada(): Observable<StavkaPlanaRada[]> {
    this._http.get<StavkaPlanaRada[]>(this.API_URL).subscribe(data => {
        this.dataChange.next(data);
    },

        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    return this.dataChange.asObservable();
}
public addStavkaPlanaRada(stavkaPlanaRada: StavkaPlanaRada): void {
  this._http.post(this.API_URL, stavkaPlanaRada).subscribe(data => {
      this.dialogData = stavkaPlanaRada;
  });
}

public updateStavkaPlanaRada(stavkaPlanaRada: StavkaPlanaRada): void {
  this._http.put(this.API_URL + '/' + stavkaPlanaRada.id, stavkaPlanaRada).subscribe(data => {
      this.dialogData = stavkaPlanaRada;
  });
}

public deleteStavkaPlanaRada(id: number): void {
  this._http.delete(this.API_URL + '/' + id).subscribe(data => {
  });
}

public getNextID(addStavkaPlanaRada, stavkaPlanaRada: StavkaPlanaRada) {
  this._http.get('http://147.91.175.211:8080/stom/stavkaPlanaRadaNextId').subscribe(
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
