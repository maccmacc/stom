import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Pacijent } from '../models/pacijent';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PacijentService {
    private readonly API_URL = 'http://147.91.175.211:8080/stom/pacijent';
    dataChange: BehaviorSubject<Pacijent[]> = new BehaviorSubject<Pacijent[]>([]);
    private dialogData: any;

  constructor(private _http: HttpClient) {}

  public getAllPacijent(): Observable<Pacijent[]> {
    this._http.get<Pacijent[]>(this.API_URL).subscribe(data => {
        this.dataChange.next(data);
    },

        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    return this.dataChange.asObservable();
}
public getPacijentPage(size: number, page: number): Observable<Pacijent[]> {
  this._http.get<Pacijent[]>(this.API_URL + 'Page', {
    params: new HttpParams().set('size', size.toString()).set('page', page.toString())
  }).subscribe(data => {
      this.dataChange.next(data);
  },

      (error: HttpErrorResponse) => {
          console.log(error.name + ' ' + error.message);
      });
  return this.dataChange.asObservable();
}

public addPacijent(pacijent: Pacijent): void {
  this._http.post(this.API_URL, pacijent).subscribe(data => {
      this.dialogData = pacijent;
  },
  (error: HttpErrorResponse) => {
    console.log(error.name + ' ' + error.message);
  }
);
}

public updatePacijent(pacijent: Pacijent): void {
  this._http.put(this.API_URL + '/' + pacijent.id, pacijent).subscribe(data => {
      this.dialogData = pacijent;
  });
}


public deletePacijent(id: number): void {
  this._http.delete(this.API_URL + '/' + id).subscribe(data => {
  });
}
public getNextID(addPacijent, pacijent: Pacijent) {
  this._http.get('http://147.91.175.211:8080/stom/pacijentNextId').subscribe(
    data => {
    pacijent.id = data as number;
    this.addPacijent(pacijent);
  },
  (error: HttpErrorResponse) => {
    console.log(error.name + ' ' + error.message);
  }
  );
}



}
