import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Snimak } from '../models/snimak';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SnimakService {
    private readonly API_URL = 'http://147.91.175.211:8080/stom/snimak';
    dataChange: BehaviorSubject<Snimak[]> = new BehaviorSubject<Snimak[]>([]);
    private dialogData: any;
  constructor(private _http: HttpClient) {}

  public getAllSnimak(): Observable<Snimak[]> {
    this._http.get<Snimak[]>(this.API_URL).subscribe(data => {
        this.dataChange.next(data);
    },

        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    return this.dataChange.asObservable();
}
public addSnimak(snimak: Snimak): void {
  this._http.post(this.API_URL, snimak).subscribe(data => {
      this.dialogData = snimak;
  });
}

public updateSnimak(snimak: Snimak): void {
  this._http.put(this.API_URL + '/' + snimak.id, snimak).subscribe(data => {
      this.dialogData = snimak;
  });
}

public deleteSnimak(id: number): void {
  this._http.delete(this.API_URL + '/' + id).subscribe(data => {
  });
}
public getNextSnimakID(): number {
  this._http.get('http://147.91.175.211:8080/stom/SnimakNextId').subscribe(x => {
    return x;
  });
  return 0;
}
public getNextID(addSnimak, snimak: Snimak) {
  this._http.get('http://147.91.175.211:8080/stom/snimakNextId').subscribe(
    data => {
    snimak.id = data as number;
    this.addSnimak(snimak);
  },
  (error: HttpErrorResponse) => {
    console.log(error.name + ' ' + error.message);
  }
  );
}
}
