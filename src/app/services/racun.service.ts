import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Racun } from '../models/racun';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RacunService {
    private readonly API_URL = 'http://147.91.175.211:8080/stom/racun';
    dataChange: BehaviorSubject<Racun[]> = new BehaviorSubject<Racun[]>([]);
    private dialogData: any;
  constructor(private _http: HttpClient) {}

  public getAllRacun(): Observable<Racun[]> {
    this._http.get<Racun[]>(this.API_URL).subscribe(data => {
        this.dataChange.next(data);
    },

        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    return this.dataChange.asObservable();
}
public addRacun(racun: Racun): void {
  this._http.post(this.API_URL, racun).subscribe(data => {
      this.dialogData = racun;
  });
}

public updateRacun(racun: Racun): void {
  this._http.put(this.API_URL + '/' + racun.id, racun).subscribe(data => {
      this.dialogData = racun;
  });
}

public deleteRacun(id: number): void {
  this._http.delete(this.API_URL + '/' + id).subscribe(data => {
  });
}
public getNextRacunID(): number {
  this._http.get('http://147.91.175.211:8080/stom/racunNextId').subscribe(x => {
    return x;
  });
  return 0;
}
public getNextID(addRacun, racun: Racun) {
  this._http.get('http://147.91.175.211:8080/stom/racunNextId').subscribe(
    data => {
    racun.id = data as number;
    this.addRacun(racun);
  },
  (error: HttpErrorResponse) => {
    console.log(error.name + ' ' + error.message);
  }
  );
}
}
