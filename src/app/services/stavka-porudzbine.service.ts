import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { StavkaPorudzbine } from '../models/stavka-porudzbine';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StavkaPorudzbineService {
  private readonly API_URL = environment.baseUrl + '/stavkaPorudzbine';
    dataChange: BehaviorSubject<StavkaPorudzbine[]> = new BehaviorSubject<StavkaPorudzbine[]>([]);
    private dialogData: any;
  constructor(private _http: HttpClient) {}

  public getAllStavkaPorudzbine(): Observable<StavkaPorudzbine[]> {
    this._http.get<StavkaPorudzbine[]>(this.API_URL).subscribe(data => {
        this.dataChange.next(data);
    },

        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    return this.dataChange.asObservable();
}
public getStavkaByPorudzbina(idPorudzbine): Observable<StavkaPorudzbine[]> {
  this._http.get<StavkaPorudzbine[]>('http://147.91.175.211:8080/stom/stavkeZaPorudzbinaId/' + idPorudzbine).subscribe(data => {
    this.dataChange.next(data);
  },
    (error: HttpErrorResponse) => {
      console.log(error.name + ' ' + error.message);
    });
  return this.dataChange.asObservable();
}



public addStavkaPorudzbine(stavkaPorudzbine: StavkaPorudzbine): void {
  this._http.post(this.API_URL, stavkaPorudzbine).subscribe(data => {
      this.dialogData = stavkaPorudzbine;
  });
}

public updateStavkaPorudzbine(stavkaPorudzbine: StavkaPorudzbine): void {
  this._http.put(this.API_URL + '/' + stavkaPorudzbine.id, stavkaPorudzbine).subscribe(data => {
      this.dialogData = stavkaPorudzbine;
  });
}

public deleteStavkaPorudzbine(id: number): void {
  this._http.delete(this.API_URL + '/' + id).subscribe(data => {
  });
}

public getNextID(addStavkaPorudzbine, stavkaPorudzbine: StavkaPorudzbine) {
  this._http.get(this.API_URL + 'NextId').subscribe(
    data => {
    stavkaPorudzbine.id = data as number;
    this.addStavkaPorudzbine(stavkaPorudzbine);
  },
  (error: HttpErrorResponse) => {
    console.log(error.name + ' ' + error.message);
  }
  );
}
}
