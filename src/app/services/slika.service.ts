import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Slika } from '../models/slika';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SlikaService {
    private readonly API_URL = 'http://147.91.175.211:8080/stom/slika';
    dataChange: BehaviorSubject<Slika[]> = new BehaviorSubject<Slika[]>([]);
    private dialogData: any;
  constructor(private _http: HttpClient) {}

  public getAllSlika(): Observable<Slika[]> {
    this._http.get<Slika[]>(this.API_URL).subscribe(data => {
        this.dataChange.next(data);
    },

        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    return this.dataChange.asObservable();
}
public addSlika(slika: Slika): void {
  this._http.post(this.API_URL, slika).subscribe(data => {
      this.dialogData = slika;
  });
}

public updateSlika(slika: Slika): void {
  this._http.put(this.API_URL + '/' + slika.id, slika).subscribe(data => {
      this.dialogData = slika;
  });
}

public deleteSlika(id: number): void {
  this._http.delete(this.API_URL + '/' + id).subscribe(data => {
  });
}
public getNextID(addSlika, slika: Slika) {
  this._http.get('http://147.91.175.211:8080/stom/slikaNextId').subscribe(
    data => {
    slika.id = data as number;
    this.addSlika(slika);
  },
  (error: HttpErrorResponse) => {
    console.log(error.name + ' ' + error.message);
  }
  );
}
}
