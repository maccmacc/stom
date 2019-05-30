import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable } from "rxjs";
import { Pacijent } from "../../models/pacijent";
import { PacijentService } from "../../services/pacijent.service";
import { BehaviorSubject } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { of } from "rxjs";

export class PacijentDataSource implements DataSource<Pacijent> {
  private pacijentSubject = new BehaviorSubject<Pacijent[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private pacijentService: PacijentService) {}

  loadPacijent(
    pacijentId: number,
    filter: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number
  ) {
    this.loadingSubject.next(true);

    this.pacijentService
      .getPacijentPage(pacijentId, filter, sortDirection, pageIndex, pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(pacijent => this.pacijentSubject.next(pacijent));

  }

  connect(collectionViewer: CollectionViewer): Observable<Pacijent[]> {
    console.log("Connecting data source");
    return this.pacijentSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.pacijentSubject.complete();
    this.loadingSubject.complete();
  }
}
