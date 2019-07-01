import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Pacijent } from "../models/pacijent";
import { Observable, BehaviorSubject } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { HttpParams } from "@angular/common/http";
import { jsonpCallbackContext } from "@angular/common/http/src/module";
import { map } from 'rxjs/operators';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { PageSortModel } from '../models/PageSortModel';
import { PacijentComponent } from '../components/pacijent/pacijent.component';
import { SortModel } from '../models/SortModel';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: "root"
})
export class PacijentService {
  private readonly API_URL = environment.baseUrl + '/pacijent';
  dataChange: BehaviorSubject<Pacijent[]> = new BehaviorSubject<Pacijent[]>([]);
  private dialogData: any;

  constructor(private _http: HttpClient, public snackBar: MatSnackBar, ) { }

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

  //Get paged patients
  public getPacijentPage(pacijentComponent: PacijentComponent, onInit: boolean) {

    this._http.get<Pacijent[]>(this.API_URL + 'Page?' + 'size=' + pacijentComponent.pageSortModel.size
                              + '&page=' + pacijentComponent.pageSortModel.number
                              + '&sort=' + pacijentComponent.pageSortModel.sort.property
                              + ',' + pacijentComponent.pageSortModel.sort.direction).subscribe(
        data => {

          pacijentComponent.pageSortModel = JSON.parse(JSON.stringify(data));
          pacijentComponent.dataSource = new MatTableDataSource<Pacijent>(pacijentComponent.pageSortModel.content);
          pacijentComponent.dataSource.sort = pacijentComponent.sort;

          //Check is data sorted
          if (data.sort != null) {
            pacijentComponent.pageSortModel.sort = JSON.parse(JSON.stringify(data.sort[0]));
          }
          else{
            pacijentComponent.pageSortModel.sort = new SortModel();
          }

          //Check is called from init
          if (onInit) {
            pacijentComponent.dataSource.paginator = pacijentComponent.paginator;
          }
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
        }
      );
  }

  //Get paged patients filtered by Name
  public getPacijentByNamePage(pacijentComponent: PacijentComponent, filter: string) {

    this._http.get<Pacijent[]>(this.API_URL + 'ImeLike/' + filter + 'Page?' + 'size=' + pacijentComponent.pageSortModel.size
                              + '&page=' + pacijentComponent.pageSortModel.number
                              + '&sort=' + pacijentComponent.pageSortModel.sort.property
                              + ',' + pacijentComponent.pageSortModel.sort.direction).subscribe(
        data => {

          pacijentComponent.pageSortModel = JSON.parse(JSON.stringify(data));
          pacijentComponent.dataSource = new MatTableDataSource<Pacijent>(pacijentComponent.pageSortModel.content);
          pacijentComponent.dataSource.sort = pacijentComponent.sort;

          //Check is data sorted
          if (data.sort != null) {
            pacijentComponent.pageSortModel.sort = JSON.parse(JSON.stringify(data.sort[0]));
          }
          else{
            pacijentComponent.pageSortModel.sort = new SortModel();
          }
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
        }
      );
  }

  //Get paged patients filtered by Surname
  public getPacijentBySurnamePage(pacijentComponent: PacijentComponent, filter: string) {

    this._http.get<Pacijent[]>(this.API_URL + 'PrezimeLike/' + filter + 'Page?' + 'size=' + pacijentComponent.pageSortModel.size
                              + '&page=' + pacijentComponent.pageSortModel.number
                              + '&sort=' + pacijentComponent.pageSortModel.sort.property
                              + ',' + pacijentComponent.pageSortModel.sort.direction).subscribe(
        data => {

          pacijentComponent.pageSortModel = JSON.parse(JSON.stringify(data));
          pacijentComponent.dataSource = new MatTableDataSource<Pacijent>(pacijentComponent.pageSortModel.content);
          pacijentComponent.dataSource.sort = pacijentComponent.sort;

          //Check is data sorted
          if (data.sort != null) {
            pacijentComponent.pageSortModel.sort = JSON.parse(JSON.stringify(data.sort[0]));
          }
          else{
            pacijentComponent.pageSortModel.sort = new SortModel();
          }
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
        }
      );
  }

  public addPacijent(pacijent: Pacijent, pacijentComponent: PacijentComponent): void {
    this._http.post(this.API_URL, pacijent).subscribe(
      data => {

        pacijentComponent.loadData();

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

  public updatePacijent(pacijent: Pacijent, pacijentComponent: PacijentComponent): void {
    this._http
      .put(this.API_URL + '/' + pacijent.id, pacijent)
      .subscribe(data => {

        pacijentComponent.loadData();

        this.snackBar.open('Uspešno užuriran pacijent!', 'U redu',
          {
            duration: 2500
          });
      });
  }

  public deletePacijent(id: number, pacijentComponent: PacijentComponent): void {
    this._http.delete(this.API_URL + '/' + id).subscribe(data => {

      pacijentComponent.loadData();

      this.snackBar.open('Uspešno obrisan pacijent!', 'U redu',
        {
          duration: 2500
        });
    });
  }
  public getNextID(pacijent: Pacijent, pacijentComponent: PacijentComponent) {
    this._http.get(this.API_URL + 'NextId').subscribe(
      data => {
        pacijent.id = data as number;
        this.addPacijent(pacijent, pacijentComponent);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }
}
