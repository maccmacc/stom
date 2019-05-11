import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Materijal } from '../models/materijal';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MaterijalService {
    private readonly API_URL = 'http://147.91.175.211:8080/stom/materijal';
    dataChange: BehaviorSubject<Materijal[]> = new BehaviorSubject<Materijal[]>([]);
    private dialogData: any;
  constructor(private _http: HttpClient) {}

  public getAllMaterijal(): Observable<Materijal[]> {
    this._http.get<Materijal[]>(this.API_URL).subscribe(data => {
        this.dataChange.next(data);
    },

        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    return this.dataChange.asObservable();
}
public addMaterijal(materijal: Materijal): void {
  this._http.post(this.API_URL, materijal).subscribe(data => {
      this.dialogData = materijal;
  });
}

public updateMaterijal(materijal: Materijal): void {
  this._http.put(this.API_URL + '/' + materijal.id, materijal).subscribe(data => {
      this.dialogData = materijal;
  });
}

public deleteMaterijal(id: number): void {
  this._http.delete(this.API_URL + '/' + id).subscribe(data => {
  });
}
public getNextID(addMaterijal, materijal: Materijal) {
  this._http.get('http://147.91.175.211:8080/stom/materijalNextId').subscribe(
    data => {
    materijal.id = data as number;
    console.log(materijal.id, materijal.naziv, materijal.proizvodjac);
    this.addMaterijal(materijal);
  },
  (error: HttpErrorResponse) => {
    console.log(error.name + ' ' + error.message);
  }
  );
}
}
