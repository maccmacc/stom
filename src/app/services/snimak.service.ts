import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Snimak } from '../models/snimak';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SnimakService {
    private readonly API_URL = environment.baseUrl + '/snimak';
    dataChange: BehaviorSubject<Snimak[]> = new BehaviorSubject<Snimak[]>([]);
    private dialogData: any;
  constructor(private http: HttpClient) {}

  public getAllSnimak(): Observable<Snimak[]> {
    this.http.get<Snimak[]>(this.API_URL).subscribe(data => {
        this.dataChange.next(data);
    },

        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
    return this.dataChange.asObservable();
}
public addSnimak(snimak: Snimak): void {
  this.http.post(this.API_URL, snimak).subscribe(data => {
      this.dialogData = snimak;
  });
}

public updateSnimak(snimak: Snimak): void {
  this.http.put(this.API_URL + '/' + snimak.id, snimak).subscribe(data => {
      this.dialogData = snimak;
  });
}

public deleteSnimak(id: number): void {
  this.http.delete(this.API_URL + '/' + id).subscribe(data => {
  });
}

public getNextID(addSnimak, snimak: Snimak) {
  this.http.get(this.API_URL + 'NextId').subscribe(
    data => {
      snimak.id = data as number;
      this.addSnimak(snimak);
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + ' ' + error.message);
    }
  );
}
}
