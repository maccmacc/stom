import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { PlanRada } from '../models/plan-rada';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanRadaService {
  private readonly API_URL = environment.baseUrl + '/planRada';
    dataChange: BehaviorSubject<PlanRada[]> = new BehaviorSubject<PlanRada[]>([]);
    private dialogData: any;
  constructor(private _http: HttpClient) {}

  public getAllPlanRada(): Observable<PlanRada[]> {
    this._http.get<PlanRada[]>(this.API_URL).subscribe(data => {
        this.dataChange.next(data);
    },

        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    return this.dataChange.asObservable();
}
public addPlanRada(planRada: PlanRada): void {
  this._http.post(this.API_URL, planRada).subscribe(data => {
      this.dialogData = planRada;
  });
}

public updatePlanRada(planRada: PlanRada): void {
  this._http.put(this.API_URL + '/' + planRada.id, planRada).subscribe(data => {
      this.dialogData = planRada;
  });
}

public deletePlanRada(id: number): void {
  this._http.delete(this.API_URL + '/' + id).subscribe(data => {
  });
}

public getNextID(addPlanRada, planRada: PlanRada) {
  this._http.get(this.API_URL + 'NextId').subscribe(
    data => {
    planRada.id = data as number;
    this.addPlanRada(planRada);
  },
  (error: HttpErrorResponse) => {
    console.log(error.name + ' ' + error.message);
  }
  );
}
}
