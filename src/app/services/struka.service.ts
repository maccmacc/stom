import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Struka } from '../models/struka';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StrukaService {
  private readonly API_URL = environment.baseUrl + '/struka';
    dataChange: BehaviorSubject<Struka[]> = new BehaviorSubject<Struka[]>([]);
    private dialogData: any;
  constructor(private _http: HttpClient) {}

  public getAllStruka(): Observable<Struka[]> {
    this._http.get<Struka[]>(this.API_URL).subscribe(data => {
        this.dataChange.next(data);
    },

        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    return this.dataChange.asObservable();
}
public addStruka(struka: Struka): void {
  this._http.post(this.API_URL, struka).subscribe(data => {
      this.dialogData = struka;
  });
}

public updateStruka(struka: Struka): void {
  this._http.put(this.API_URL + '/' + struka.id, struka).subscribe(data => {
      this.dialogData = struka;
  });
}

public deleteStruka(id: number): void {
  this._http.delete(this.API_URL + '/' + id).subscribe(data => {
  });
}
public getNextID(addStruka, struka: Struka) {
  this._http.get(this.API_URL + 'NextId').subscribe(
    data => {
    struka.id = data as number;
    this.addStruka(struka);
  },
  (error: HttpErrorResponse) => {
    console.log(error.name + ' ' + error.message);
  }
  );
}
}
