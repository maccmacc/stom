import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Pacijent } from "../models/pacijent";
import { Observable, BehaviorSubject } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { HttpParams } from "@angular/common/http";
import { jsonpCallbackContext } from "@angular/common/http/src/module";
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: "root"
})
export class PacijentService {
  private readonly API_URL = "http://147.91.175.211:8080/stom/pacijent";
  dataChange: BehaviorSubject<Pacijent[]> = new BehaviorSubject<Pacijent[]>([]);
  private dialogData: any;

  constructor(private _http: HttpClient, public snackBar: MatSnackBar,) {}

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
  public getPacijentPage(pacijentId: number, filter = '', sortOrder = 'asc', pageNumber = 0, pageSize = 5) {
   this._http
      .get<Pacijent[]>(this.API_URL + 'Page').subscribe(
        data => {
          console.log(data);
          this.dataChange.next(data["content"]);
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
        this.getPacijentPage(1, "", "asc", 0, 5);

        this.snackBar.open('Uspešno dodat pacijent ' + pacijent.ime + " " + pacijent.prezime + "!", 'U redu',
      {
        duration: 2500
      });
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
    this._http.delete(this.API_URL + "/" + id).subscribe(data => {
      this.getPacijentPage(1, "", "asc", 0, 5);

      this.snackBar.open('Uspešno obrisan pacijent!', 'U redu',
      {
        duration: 2500
      });
    });
  }
  public getNextID(addPacijent, pacijent: Pacijent) {
    this._http.get("http://147.91.175.211:8080/stom/pacijentNextId").subscribe(
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
