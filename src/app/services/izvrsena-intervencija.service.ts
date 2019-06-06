import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IzvrsenaIntervencija } from '../models/izvrsena-intervencija';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IzvrsenaIntervencijaService {
    private readonly API_URL = 'http://147.91.175.211:8080/stom/izvrsenaIntervencija';
    dataChange: BehaviorSubject<IzvrsenaIntervencija[]> = new BehaviorSubject<IzvrsenaIntervencija[]>([]);
    private dialogData: any;
  constructor(private _http: HttpClient) {}

  public getAllIzvrsenaIntervencija(): Observable<IzvrsenaIntervencija[]> {
    this._http.get<IzvrsenaIntervencija[]>(this.API_URL).subscribe(data => {
        this.dataChange.next(data);
    },

        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    return this.dataChange.asObservable();
}
public addIzvrsenaIntervencija(izvrsenaIntervencija: IzvrsenaIntervencija): void {
  this._http.post(this.API_URL, izvrsenaIntervencija).subscribe(data => {
      this.dialogData = izvrsenaIntervencija;
  });
}

public updateIzvrsenaIntervencija(izvrsenaIntervencija: IzvrsenaIntervencija): void {
  this._http.put(this.API_URL + '/' + izvrsenaIntervencija.id, izvrsenaIntervencija).subscribe(data => {
      this.dialogData = izvrsenaIntervencija;
  });
}

public deleteIzvrsenaIntervencija(id: number): void {
  this._http.delete(this.API_URL + '/' + id).subscribe(data => {
  });
}

public getNextID(addIzvrsenaIntervencija, izvrsenaIntervencija: IzvrsenaIntervencija) {
  this._http.get('http://147.91.175.211:8080/stom/izvrsenaIntervencijaNextId').subscribe(
    data => {
    izvrsenaIntervencija.id = data as number;
    this.addIzvrsenaIntervencija(izvrsenaIntervencija);
  },
  (error: HttpErrorResponse) => {
    console.log(error.name + ' ' + error.message);
  }
  );
}
}
