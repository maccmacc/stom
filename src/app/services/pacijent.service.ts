import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Pacijent } from "../models/pacijent";
import { Observable, BehaviorSubject } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { HttpParams } from "@angular/common/http";
import { jsonpCallbackContext } from "@angular/common/http/src/module";
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: "root"
})
export class PacijentService {
  private readonly API_URL = environment.baseUrl + '/pacijent';
  dataChange: BehaviorSubject<Pacijent[]> = new BehaviorSubject<Pacijent[]>([]);
  private dialogData: any;

  constructor(private _http: HttpClient) {}

  public getAllPacijent(): Observable<Pacijent[]> {
    this._http.get<Pacijent[]>(this.API_URL).subscribe(
      data => {
        this.dataChange.next(data);
      },

      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
    return this.dataChange.asObservable();
  }
  public getPacijentPage(pacijentId: number, filter = '', sortOrder = 'asc', pageNumber = 0, pageSize = 3) {
   this._http
      .get<Pacijent[]>(this.API_URL + 'Page').subscribe(
        data => {
          console.log(data);
          this.dataChange.next(data);
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
        }
      );
   return this.dataChange.asObservable();
  }

  public addPacijent(pacijent: Pacijent): void {
    this._http.post(this.API_URL, pacijent).subscribe(
      data => {
        this.dialogData = pacijent;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
  }

  public updatePacijent(pacijent: Pacijent): void {
    this._http
      .put(this.API_URL + "/" + pacijent.id, pacijent)
      .subscribe(data => {
        this.dialogData = pacijent;
      });
  }

  public deletePacijent(id: number): void {
    this._http.delete(this.API_URL + "/" + id).subscribe(data => {});
  }
  public getNextID(addPacijent, pacijent: Pacijent) {
    this._http.get(this.API_URL + 'NextId').subscribe(
      data => {
        pacijent.id = data as number;
        this.addPacijent(pacijent);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
  }
}
