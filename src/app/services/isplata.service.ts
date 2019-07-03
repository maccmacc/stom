import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Isplata } from '../models/isplata';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IsplataService {
    private readonly API_URL = environment.baseUrl + '/isplata';
    dataChange: BehaviorSubject<Isplata[]> = new BehaviorSubject<Isplata[]>([]);
    private dialogData: any;
  constructor(private _http: HttpClient) {}

  public getAllIsplata(): Observable<Isplata[]> {
    this._http.get<Isplata[]>(this.API_URL).subscribe(data => {
        this.dataChange.next(data);
    },

        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    return this.dataChange.asObservable();
}
public addIsplata(isplata: Isplata): void {
  this._http.post(this.API_URL, isplata).subscribe(data => {
      this.dialogData = isplata;
  });
}

public updateIsplata(isplata: Isplata): void {
  this._http.put(this.API_URL + '/' + isplata.id, isplata).subscribe(data => {
      this.dialogData = isplata;
  });
}

public deleteIsplata(id: number): void {
  this._http.delete(this.API_URL + '/' + id).subscribe(data => {
  });
}
public getNextID(addIsplata, isplata: Isplata) {
  this._http.get(this.API_URL + 'NextId').subscribe(
    data => {
    isplata.id = data as number;
    this.addIsplata(isplata);
  },
  (error: HttpErrorResponse) => {
    console.log(error.name + ' ' + error.message);
  }
  );
}
}
