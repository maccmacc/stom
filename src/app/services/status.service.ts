import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Status } from '../models/status';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private readonly API_URL = environment.baseUrl + '/status';
    dataChange: BehaviorSubject<Status[]> = new BehaviorSubject<Status[]>([]);
    private dialogData: any;
  constructor(private _http: HttpClient) {}

  public getAllStatus(): Observable<Status[]> {
    this._http.get<Status[]>(this.API_URL).subscribe(data => {
        this.dataChange.next(data);
    },

        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    return this.dataChange.asObservable();
}
public addStatus(status: Status): void {
  this._http.post(this.API_URL, status).subscribe(data => {
      this.dialogData = status;
  });
}

public updateStatus(status: Status): void {
  this._http.put(this.API_URL + '/' + status.id, status).subscribe(data => {
      this.dialogData = status;
  });
}

public deleteStatus(id: number): void {
  this._http.delete(this.API_URL + '/' + id).subscribe(data => {
  });
}
public getNextID(addStatus, status: Status) {
  this._http.get(this.API_URL + 'NextId').subscribe(
    data => {
    status.id = data as number;
    this.addStatus(status);
  },
  (error: HttpErrorResponse) => {
    console.log(error.name + ' ' + error.message);
  }
  );
}
}
