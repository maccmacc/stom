import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IzvrsenaIntervencija } from '../models/izvrsena-intervencija';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { IzvrsenaIntervencijaComponent } from '../components/izvrsena-intervencija/izvrsena-intervencija.component';
import { SortModel } from '../models/SortModel';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IzvrsenaIntervencijaService {

  private readonly API_URL = environment.baseUrl + '/izvrsenaIntervencija';
  dataChange: BehaviorSubject<IzvrsenaIntervencija[]> = new BehaviorSubject<IzvrsenaIntervencija[]>([]);

  constructor(public snackBar: MatSnackBar, private _http: HttpClient) { }

  public getAllIzvrsenaIntervencija(izvrsenaIntervencijaComponent: IzvrsenaIntervencijaComponent, onInit: boolean) {

    this._http.get<IzvrsenaIntervencija[]>(this.API_URL + '?size=' + izvrsenaIntervencijaComponent.pageSortModel.size
      + '&page=' + izvrsenaIntervencijaComponent.pageSortModel.number
      + '&sort=' + izvrsenaIntervencijaComponent.pageSortModel.sort.property
      + ',' + izvrsenaIntervencijaComponent.pageSortModel.sort.direction)
      .subscribe(data => {

        izvrsenaIntervencijaComponent.pageSortModel = JSON.parse(JSON.stringify(data));
        izvrsenaIntervencijaComponent.dataSource = new MatTableDataSource<IzvrsenaIntervencija>(izvrsenaIntervencijaComponent.pageSortModel.content);
        izvrsenaIntervencijaComponent.dataSource.sort = izvrsenaIntervencijaComponent.sort;

        //Check is data sorted
        if (data.sort != null) {
          izvrsenaIntervencijaComponent.pageSortModel.sort = JSON.parse(JSON.stringify(data.sort[0]));
        }
        else {
          izvrsenaIntervencijaComponent.pageSortModel.sort = new SortModel();
        }

        //Check is called from init
        if (onInit) {
          izvrsenaIntervencijaComponent.dataSource.paginator = izvrsenaIntervencijaComponent.paginator;
        }
      },
        (error: HttpErrorResponse) => {
          console.log(error.name + ' ' + error.message);
        });
  }

  public addIzvrsenaIntervencija(izvrsenaIntervencija: IzvrsenaIntervencija, izvrsenaIntervencijaComponent: IzvrsenaIntervencijaComponent): void {
    this._http.post(this.API_URL, izvrsenaIntervencija).subscribe(
      data => {

        izvrsenaIntervencijaComponent.loadData(false);

        this.snackBar.open('Uspešno dodata izvrsena intervencija', 'U redu',
          {
            duration: 2500
          });
      });
  }

  public updateIzvrsenaIntervencija(izvrsenaIntervencija: IzvrsenaIntervencija, izvrsenaIntervencijaComponent: IzvrsenaIntervencijaComponent): void {
    this._http.put(this.API_URL + '/' + izvrsenaIntervencija.id, izvrsenaIntervencija)
      .subscribe(data => {

        izvrsenaIntervencijaComponent.loadData(false);

        this.snackBar.open('Uspešno modifikovana izvrsena intervencija', 'U redu',
          {
            duration: 2500
          });
      });
  }

  public deleteIzvrsenaIntervencija(id: number, izvrsenaIntervencijaComponent: IzvrsenaIntervencijaComponent): void {
    this._http.delete(this.API_URL + '/' + id)
      .subscribe(data => {

        izvrsenaIntervencijaComponent.loadData(false);

        this.snackBar.open('Uspešno obrisana izvrsena intervencija', 'U redu',
          {
            duration: 2500
          });
      });
  }

  public getNextID(izvrsenaIntervencija: IzvrsenaIntervencija, izvrsenaIntervencijaComponent: IzvrsenaIntervencijaComponent) {
    this._http.get(this.API_URL + 'NextId').subscribe(
      data => {
        izvrsenaIntervencija.id = data as number;
        this.addIzvrsenaIntervencija(izvrsenaIntervencija, izvrsenaIntervencijaComponent);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }
}
