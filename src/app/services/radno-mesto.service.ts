import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RadnoMesto } from '../models/radno-mesto';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RadnoMestoService {
    private readonly API_URL = environment.baseUrl + '/radnoMjesto';
    dataChange: BehaviorSubject<RadnoMesto[]> = new BehaviorSubject<RadnoMesto[]>([]);
    private dialogData: any;
  constructor(private _http: HttpClient) {}

  public getAllRadnoMesto(): Observable<RadnoMesto[]> {
    this._http.get<RadnoMesto[]>(this.API_URL).subscribe(data => {
        this.dataChange.next(data);
    },

        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    return this.dataChange.asObservable();
}
public addRadnoMesto(radnoMesto: RadnoMesto): void {
  this._http.post(this.API_URL, radnoMesto).subscribe(data => {
      this.dialogData = radnoMesto;
  });
}

public updateRadnoMesto(radnoMesto: RadnoMesto): void {
  this._http.put(this.API_URL + '/' + radnoMesto.id, radnoMesto).subscribe(data => {
      this.dialogData = radnoMesto;
  });
}

public deleteRadnoMesto(id: number): void {
  this._http.delete(this.API_URL + '/' + id).subscribe(data => {
  });
}
public getNextID(addRadnoMesto, radnoMesto: RadnoMesto) {
  this._http.get(this.API_URL + 'NextId').subscribe(
    data => {
    radnoMesto.id = data as number;
    this.addRadnoMesto(radnoMesto);
  },
  (error: HttpErrorResponse) => {
    console.log(error.name + ' ' + error.message);
  }
  );
}
}
