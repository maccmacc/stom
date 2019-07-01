import { OnInit, Component, ElementRef } from "@angular/core";
import { PacijentService } from "../../services/pacijent.service";
import { Pacijent } from '../../models/pacijent';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, PageEvent } from '@angular/material';
import { ViewChild } from '@angular/core';
import { PacijentDialogComponent } from '../dialogs/pacijent-dialog/pacijent-dialog.component';
import { fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { tap } from 'rxjs/internal/operators/tap';
import { PageSortModel } from 'src/app/models/PageSortModel';
import { SortModel } from 'src/app/models/SortModel';

@Component({
  selector: 'app-pacijent',
  templateUrl: './pacijent.component.html',
  styleUrls: ['./pacijent.component.css']
})
export class PacijentComponent implements OnInit {
  pacijent: Pacijent;
  displayedColumns = ['id', 'adresa', 'ime', 'prezime', 'kontakt', 'napomena',
    'datumRodjenja', 'email', 'datumUpisa', 'ukupno', 'add', 'delete', 'edit'];

  dataSource: MatTableDataSource<Pacijent>;

  // MatPaginator Output
  pageEvent: PageEvent;

  pageSortModel: PageSortModel;

  // 0 is no filtering, 1 is for filtering by name, 2 is for filtering by surname
  filteringOn: number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('inputName') inputName: ElementRef;
  @ViewChild('inputSurname') inputSurname: ElementRef;


  constructor(private pacijentService: PacijentService, public dialog: MatDialog) { }

  ngOnInit() {
    this.pageSortModel = PageSortModel.defaultPatient();
    this.pacijentService.getPacijentPage(this, true);
  }

  //tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {

    //Sort
    this.sort.sortChange.subscribe(
      data => {
        this.sortChanged(data);
      });

    //Search by Name
    fromEvent(this.inputName.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {

          //Reset filter by surname
          (<HTMLInputElement>document.getElementById("inputSurname")).value = "";

          var inputNameField = (<HTMLInputElement>document.getElementById("inputName"));

          this.pageSortModel = PageSortModel.defaultPatient();

          if (inputNameField.value != "") {
            this.filteringOn = 1;
          }
          else {
            this.filteringOn = 0;
          }

          this.loadData();
        })
      )
      .subscribe();

    //Search by Surname
    fromEvent(this.inputSurname.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {

          //Reset filter by name
          (<HTMLInputElement>document.getElementById("inputName")).value = "";

          var inputSurnameField = (<HTMLInputElement>document.getElementById("inputSurname"));

          this.pageSortModel = PageSortModel.defaultPatient();

          if (inputSurnameField.value != "") {
            this.filteringOn = 2;
          }
          else {
            this.filteringOn = 0;
          }

          this.loadData();
        })
      )
      .subscribe();
  }

  sortChanged(data) {

    if (this.pageSortModel.sort.property == data.active) {
      if (data.direction != "") {
        this.pageSortModel.sort.direction = data.direction;
      }
      else {
        this.pageSortModel.sort.property = "";
      }
    }
    else {
      this.pageSortModel = PageSortModel.setParams(0, this.paginator.pageSize, data.active, data.direction);
    }

    this.loadData();
  }

  public pageChange(event) {
    this.loadData();
  }

  public loadData() {

    switch (this.filteringOn) {

      case 0:
        this.pageSortModel.number = this.paginator.pageIndex;
        this.pageSortModel.size = this.paginator.pageSize;
        this.pacijentService.getPacijentPage(this, false);
        break;

      case 1:
        this.pageSortModel.number = this.paginator.pageIndex;
        this.pageSortModel.size = this.paginator.pageSize;
        this.pacijentService.getPacijentByNamePage(this, (<HTMLInputElement>document.getElementById("inputName")).value);
        break;

      case 2:
        this.pageSortModel.number = this.paginator.pageIndex;
        this.pageSortModel.size = this.paginator.pageSize;
        this.pacijentService.getPacijentBySurnamePage(this, (<HTMLInputElement>document.getElementById("inputSurname")).value);
        break;
    }
  }

  public openDialog(flag: number, id: number, adresa: string, ime: string, prezime: string,
    datumRodjenja: string, lookup: string, email: string, kontakt: string, napomena: string,
    datumUpisa: string, ukupno: number) {


    const dialogRef = this.dialog.open(PacijentDialogComponent, {
      data: {
        id: id, adresa: adresa, ime: ime, prezime: prezime,
        datumRodjenja: datumRodjenja, lookup: lookup, email: email, kontakt: kontakt,
        napomena: napomena, datumUpisa: datumUpisa, ukupno: ukupno, component: this
      },
    });
    dialogRef.componentInstance.flag = flag;
  }
}
