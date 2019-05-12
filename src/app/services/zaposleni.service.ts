import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Zaposleni } from '../models/zaposleni';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ZaposleniService {
    private readonly API_URL = 'http://147.91.175.211:8080/stom/zaposleni';
    dataChange: BehaviorSubject<Zaposleni[]> = new BehaviorSubject<Zaposleni[]>([]);
    private dialogData: any;
  constructor(private _http: HttpClient) {}

  public getAllZaposleni(): Observable<Zaposleni[]> {
    this._http.get<Zaposleni[]>(this.API_URL).subscribe(data => {
        this.dataChange.next(data);
    },

        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    return this.dataChange.asObservable();
}
public addZaposleni(zaposleni: Zaposleni): void {
  this._http.post(this.API_URL, zaposleni).subscribe(data => {
      this.dialogData = zaposleni;
  });
}

public updateZaposleni(zaposleni: Zaposleni): void {
  this._http.put(this.API_URL + '/' + zaposleni.id, zaposleni).subscribe(data => {
      this.dialogData = zaposleni;
  });
}

public deleteZaposleni(id: number): void {
  this._http.delete(this.API_URL + '/' + id).subscribe(data => {
  });
}
public getNextzaposleniID(): number {
  this._http.get('http://147.91.175.211:8080/stom/zaposleniNextId').subscribe(x => {
    return x;
  });
  return 0;
}
public getNextID(addZaposleni, zaposleni: Zaposleni) {
  this._http.get('http://147.91.175.211:8080/stom/zaposleniNextId').subscribe(
    data => {
    zaposleni.id = data as number;
    this.addZaposleni(zaposleni);
  },
  (error: HttpErrorResponse) => {
    console.log(error.name + ' ' + error.message);
  }
  );
}
}
