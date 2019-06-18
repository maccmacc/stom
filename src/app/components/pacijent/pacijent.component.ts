import { OnInit, Component, ElementRef } from "@angular/core";
import { PacijentService } from "../../services/pacijent.service";
import { Pacijent } from '../../models/pacijent';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ViewChild } from '@angular/core';
import { PacijentDialogComponent } from '../dialogs/pacijent-dialog/pacijent-dialog.component';
import { PacijentDataSource } from './pacijent.datasource';
import { fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { tap } from 'rxjs/internal/operators/tap';

@Component({
  selector: 'app-pacijent',
  templateUrl: './pacijent.component.html',
  styleUrls: ['./pacijent.component.css']
})
export class PacijenComponent implements OnInit {
  pacijent: Pacijent;
  displayedColumns = ['id', 'adresa', 'ime', 'prezime', 'kontakt', 'napomena',
   'datumRodjenja', 'email', 'datumUpisa', 'ukupno', 'add', 'delete', 'edit'];
  dataSource: PacijentDataSource;
  dataSource2: MatTableDataSource<Pacijent>;
  size: number;
  page: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;


  constructor(private pacijentService: PacijentService, public dialog: MatDialog) {}

  ngOnInit() {
    this.pacijentService.getAllPacijent().subscribe(
      data => {
        this.dataSource2 = new MatTableDataSource<Pacijent>(data);
        this.dataSource2.paginator = this.paginator;
        this.dataSource2.sort = this.sort;
      },
      error => {
        console.log(error);
      }
    );

    // this.dataSource = new PacijentDataSource(this.pacijentService);
    // this.dataSource.loadPacijent(1, '', 'asc', 0, 5);
  }
  // tslint:disable-next-line:use-life-cycle-interface
  // ngAfterViewInit() {
  //   this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

  //   fromEvent(this.input.nativeElement, 'keyup')
  //           .pipe(
  //               debounceTime(150),
  //               distinctUntilChanged(),
  //               tap(() => {
  //                   this.paginator.pageIndex = 0;

  //                   this.pacijentService.getAllPacijent();
  //               })
  //           )
  //           .subscribe();

  //   merge(this.sort.sortChange, this.paginator.page)
  //       .pipe(
  //           tap(() => this.pacijentService.getAllPacijent())
  //       )
  //       .subscribe();
  // }

  loadPacijentPage() {
    this.dataSource.loadPacijent(
      this.pacijent.id,
      this.input.nativeElement.filterValue,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);

  }
 /* public pageChange(event) {
    this.loadData();
  }
  public loadData() {
    if (this.paginator.pageSize == null || this.paginator.pageIndex == null) {
      this.page = 1;
      this.size = 1;
  } else {
      this.page = this.paginator.pageIndex;
      this.size = this.paginator.pageSize;
  }
    this.pacijentService.getPacijentPage(this.size, this.page).subscribe(
      data => {
        console.log(data);
      //  this.dataSource = new MatTableDataSource<Pacijent>(data);
      },
      error => {
        console.log(error);
      },
      () => {
        console.log('finish');
      }
    );
  }*/
  public openDialog(flag: number, id: number, adresa: string, ime: string, prezime: string,
                    datumRodjenja: string, lookup: string, email: string, kontakt: string, napomena: string,
                    datumUpisa: string, ukupno: number) {


    const dialogRef = this.dialog.open(PacijentDialogComponent, {
      data: { id: id, adresa: adresa, ime: ime, prezime: prezime,
        datumRodjenja: datumRodjenja, lookup: lookup, email: email, kontakt: kontakt,
         napomena: napomena, datumUpisa: datumUpisa, ukupno: ukupno}
    });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
       // this.loadData();
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource2.filter = filterValue;
  }
}
