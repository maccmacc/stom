import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Dijagnoza } from '../models/dijagnoza';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DijagnozaService {
  private readonly API_URL = environment.baseUrl + '/dijagnoza';
     dataChange: BehaviorSubject<Dijagnoza[]> = new BehaviorSubject<Dijagnoza[]>([]);
    private dialogData: any;
  constructor(private _http: HttpClient) {}

  public getAllDijagnoza(): Observable<Dijagnoza[]> {
    this._http.get<Dijagnoza[]>(this.API_URL).subscribe(data => {
        this.dataChange.next(data);
    },

        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    return this.dataChange.asObservable();
}

public addDijagnoza(dijagnoza: Dijagnoza): void {
  this._http.post(this.API_URL, dijagnoza).subscribe(data => {
      this.dialogData = dijagnoza;
  });
}

public updateDijagnoza(dijagnoza: Dijagnoza): void {
  this._http.put(this.API_URL + '/' + dijagnoza.id, dijagnoza).subscribe(data => {
      this.dialogData = dijagnoza;
  });
}

public deleteDijagnoza(id: number): void {
  this._http.delete(this.API_URL + '/' + id).subscribe(data => {
  });
}
public getNextID(addDijagnoza, dijagnoza: Dijagnoza) {
  this._http.get(this.API_URL + 'NextId').subscribe(
    data => {
    dijagnoza.id = data as number;
    this.addDijagnoza(dijagnoza);
  },
  (error: HttpErrorResponse) => {
    console.log(error.name + ' ' + error.message);
  }
  );
}
}


