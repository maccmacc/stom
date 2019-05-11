import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Ordinacija } from '../models/ordinacija';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdinacijaService {
    private readonly API_URL = 'http://147.91.175.211:8080/stom/ordinacija';
    dataChange: BehaviorSubject<Ordinacija[]> = new BehaviorSubject<Ordinacija[]>([]);
    private dialogData: any;
  constructor(private _http: HttpClient) {}

  public getAllOrdinacija(): Observable<Ordinacija[]> {
    this._http.get<Ordinacija[]>(this.API_URL).subscribe(data => {
        this.dataChange.next(data);
    },

        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    return this.dataChange.asObservable();
}
public addOrdinacija(ordinacija: Ordinacija): void {
  this._http.post(this.API_URL, ordinacija).subscribe(data => {
      this.dialogData = ordinacija;
  });
}

public updateOrdinacija(ordinacija: Ordinacija): void {
  this._http.put(this.API_URL + '/' + ordinacija.id, ordinacija).subscribe(data => {
      this.dialogData = ordinacija;
  });
}

public deleteOrdinacija(id: number): void {
  this._http.delete(this.API_URL + '/' + id).subscribe(data => {
  });
}
public getNextID(addOrdinacija, ordinacija: Ordinacija) {
  this._http.get('http://147.91.175.211:8080/stom/ordinacijaNextId').subscribe(
    data => {
    ordinacija.id = data as number;
    this.addOrdinacija(ordinacija);
  },
  (error: HttpErrorResponse) => {
    console.log(error.name + ' ' + error.message);
  }
  );
}
}
