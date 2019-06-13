import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Dobavljac } from '../models/dobavljac';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DobavljacService {
   private readonly API_URL = environment.baseUrl + '/dobavljac';
    dataChange: BehaviorSubject<Dobavljac[]> = new BehaviorSubject<Dobavljac[]>([]);
    private dialogData: any;
  constructor(private _http: HttpClient) {}

  public getAllDobavljac(): Observable<Dobavljac[]> {
    this._http.get<Dobavljac[]>(this.API_URL).subscribe(data => {
        this.dataChange.next(data);
    },

        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    return this.dataChange.asObservable();
}
public addDobavljac(dobavljac: Dobavljac): void {
  this._http.post(this.API_URL, dobavljac).subscribe(data => {
      this.dialogData = dobavljac;
  });
}

public updateDobavljac(dobavljac: Dobavljac): void {
  this._http.put(this.API_URL + '/' + dobavljac.id, dobavljac).subscribe(data => {
      this.dialogData = dobavljac;
  });
}

public deleteDobavljac(id: number): void {
  this._http.delete(this.API_URL + '/' + id).subscribe(data => {
  });
}
public getNextID(addDobavljac, dobavljac: Dobavljac) {
  this._http.get(this.API_URL + 'NextId').subscribe(
    data => {
    dobavljac.id = data as number;
    this.addDobavljac(dobavljac);
  },
  (error: HttpErrorResponse) => {
    console.log(error.name + ' ' + error.message);
  }
  );
}
}
