import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Porudzbina } from '../models/porudzbina';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PorudzbinaService {
    private readonly API_URL = 'http://147.91.175.211:8080/stom/porudzbina';
    dataChange: BehaviorSubject<Porudzbina[]> = new BehaviorSubject<Porudzbina[]>([]);
    private dialogData: any;
  constructor(private _http: HttpClient) {}

  public getAllPorudzbina(): Observable<Porudzbina[]> {
    this._http.get<Porudzbina[]>(this.API_URL).subscribe(data => {
        this.dataChange.next(data);
    },

        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    return this.dataChange.asObservable();
}
public addPorudzbina(porudzbina: Porudzbina): void {
  this._http.post(this.API_URL, porudzbina).subscribe(data => {
      this.dialogData = porudzbina;
  });
}

public updatePorudzbina(porudzbina: Porudzbina): void {
  this._http.put(this.API_URL + '/' + porudzbina.id, porudzbina).subscribe(data => {
      this.dialogData = porudzbina;
  });
}

public deletePorudzbina(id: number): void {
  this._http.delete(this.API_URL + '/' + id).subscribe(data => {
  });
}
public getNextPorudzbinaID(): number {
  this._http.get('http://147.91.175.211:8080/stom/porudzbinaNextId').subscribe(x => {
    return x;
  });
  return 0;
}
public getNextID(addPorudzbina, porudzbina: Porudzbina) {
  this._http.get('http://147.91.175.211:8080/stom/porudzbinaNextId').subscribe(
    data => {
    porudzbina.id = data as number;
    this.addPorudzbina(porudzbina);
  },
  (error: HttpErrorResponse) => {
    console.log(error.name + ' ' + error.message);
  }
  );
}
}
