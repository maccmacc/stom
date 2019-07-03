import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Zub } from '../models/zub';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ZubService {
   private readonly API_URL = environment.baseUrl + '/zub';
    dataChange: BehaviorSubject<Zub[]> = new BehaviorSubject<Zub[]>([]);
    private dialogData: any;
  constructor(private _http: HttpClient) {}

  public getAllZub(): Observable<Zub[]> {
    this._http.get<Zub[]>(this.API_URL).subscribe(data => {
        this.dataChange.next(data);
    },

        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    return this.dataChange.asObservable();
}
public addZub(zub: Zub): void {
  zub.statusPovDesnoAkt = 0;
  zub.statusPovDesnoIni = 0;
  zub.statusPovDoleAkt = 0;
  zub.statusPovDoleIni = 0;
  zub.statusPovGoreAkt = 0;
  zub.statusPovGoreIni = 0;
  zub.statusPovLijevoAkt = 0;
  zub.statusPovLijevoIni = 0;
  zub.statusPovSredinaAkt = 0;
  zub.statusPovSredinaIni = 0;
  zub.zub = 0;
  this._http.post(this.API_URL, zub).subscribe(data => {
      this.dialogData = zub;
  });
}

public updateZub(zub: Zub): void {
  zub.statusPovDesnoAkt = 0;
  zub.statusPovDesnoIni = 0;
  zub.statusPovDoleAkt = 0;
  zub.statusPovDoleIni = 0;
  zub.statusPovGoreAkt = 0;
  zub.statusPovGoreIni = 0;
  zub.statusPovLijevoAkt = 0;
  zub.statusPovLijevoIni = 0;
  zub.statusPovSredinaAkt = 0;
  zub.statusPovSredinaIni = 0;
  zub.zub = 0;
  this._http.put(this.API_URL + '/' + zub.id, zub).subscribe(data => {
      this.dialogData = zub;
  });
}

public deleteZub(id: number): void {
  this._http.delete(this.API_URL + '/' + id).subscribe(data => {
  });
}
public getNextID(addZub, zub: Zub) {
  this._http.get(this.API_URL + 'NextId').subscribe(
    data => {
    zub.id = data as number;
    this.addZub(zub);
  },
  (error: HttpErrorResponse) => {
    console.log(error.name + ' ' + error.message);
  }
  );
}
}
