import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { VrstaIntervencije } from '../models/vrsta-intervencije';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VrstaIntervencijeService {
  private readonly API_URL = environment.baseUrl + '/vrstaIntervencije';

    dataChange: BehaviorSubject<VrstaIntervencije[]> = new BehaviorSubject<VrstaIntervencije[]>([]);
    private dialogData: any;
  constructor(private _http: HttpClient) {}

  public getAllVrstaIntervencije(): Observable<VrstaIntervencije[]> {
    this._http.get<VrstaIntervencije[]>(this.API_URL).subscribe(data => {
        this.dataChange.next(data);
    },

        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    return this.dataChange.asObservable();
}
public addVrstaIntervencije(vrstaIntervencije: VrstaIntervencije): void {
  this._http.post(this.API_URL, vrstaIntervencije).subscribe(data => {
      this.dialogData = vrstaIntervencije;
  });
}

public updateVrstaIntervencije(vrstaIntervencije: VrstaIntervencije): void {
  this._http.put(this.API_URL + '/' + vrstaIntervencije.id, vrstaIntervencije).subscribe(data => {
      this.dialogData = vrstaIntervencije;
  });
}

public deleteVrstaIntervencije(id: number): void {
  this._http.delete(this.API_URL + '/' + id).subscribe(data => {
  });
}

public getNextID(addVrstaIntervencije, vrstaIntervencije: VrstaIntervencije) {
  this._http.get(this.API_URL + 'NextId').subscribe(
    data => {
    vrstaIntervencije.id = data as number;
    this.addVrstaIntervencije(vrstaIntervencije);
  },
  (error: HttpErrorResponse) => {
    console.log(error.name + ' ' + error.message);
  }
  );
}
}
