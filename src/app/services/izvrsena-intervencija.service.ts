import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IzvrsenaIntervencija } from '../models/izvrsena-intervencija';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IzvrsenaIntervencijaService {
    private readonly API_URL = 'http://147.91.175.211:8080/stom/planRada';
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
public addIzvrsenaIntervencija(planRada: IzvrsenaIntervencija): void {
  this._http.post(this.API_URL, planRada).subscribe(data => {
      this.dialogData = planRada;
  });
}

public updateIzvrsenaIntervencija(planRada: IzvrsenaIntervencija): void {
  this._http.put(this.API_URL + '/' + planRada.id, planRada).subscribe(data => {
      this.dialogData = planRada;
  });
}

public deleteIzvrsenaIntervencija(id: number): void {
  this._http.delete(this.API_URL + '/' + id).subscribe(data => {
  });
}

public getNextID(addIzvrsenaIntervencija, planRada: IzvrsenaIntervencija) {
  this._http.get('http://147.91.175.211:8080/stom/planRadaNextId').subscribe(
    data => {
    planRada.id = data as number;
    this.addIzvrsenaIntervencija(planRada);
  },
  (error: HttpErrorResponse) => {
    console.log(error.name + ' ' + error.message);
  }
  );
}
}
