import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Artikl } from '../models/artikl';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ArtiklService {
    private readonly API_URL = environment.baseUrl + '/artikl';
    dataChange: BehaviorSubject<Artikl[]> = new BehaviorSubject<Artikl[]>([]);
    private dialogData: any;
  constructor(private _http: HttpClient) {}

  public getAllArtikl(): Observable<Artikl[]> {
    this._http.get<Artikl[]>(this.API_URL).subscribe(data => {
        this.dataChange.next(data);
    },

        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    return this.dataChange.asObservable();
}
public addArtikl(artikl: Artikl): void {
  this._http.post(this.API_URL, artikl).subscribe(data => {
      this.dialogData = artikl;
  });
}

public updateArtikl(artikl: Artikl): void {
  this._http.put(this.API_URL + '/' + artikl.id, artikl).subscribe(data => {
      this.dialogData = artikl;
  });
}

public deleteArtikl(id: number): void {
  this._http.delete(this.API_URL + '/' + id).subscribe(data => {
  });
}

public getNextID(addArtikl, artikl: Artikl) {
  this._http.get(this.API_URL + 'NextId').subscribe(
    data => {
    artikl.id = data as number;
    this.addArtikl(artikl);
  },
  (error: HttpErrorResponse) => {
    console.log(error.name + ' ' + error.message);
  }
  );
}
}
