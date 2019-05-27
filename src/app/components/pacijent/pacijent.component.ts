import { OnInit, Component } from "@angular/core";
import { PacijentService } from "../../services/pacijent.service";
import { Pacijent } from '../../models/pacijent';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ViewChild } from '@angular/core';
import { PacijentDialogComponent } from '../dialogs/pacijent-dialog/pacijent-dialog.component';

@Component({
  selector: 'app-pacijent',
  templateUrl: './pacijent.component.html',
  styleUrls: ['./pacijent.component.css']
})
export class PacijenComponent implements OnInit {
  displayedColumns = ['id', 'adresa', 'ime', 'prezime', 'kontakt', 'napomena',
   'datumRodjenja', 'lookup', 'email', 'datumUpisa', 'ukupno', 'add', 'delete', 'edit'];
  dataSource: MatTableDataSource<Pacijent>;
  size: number;
  page: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private _pacijent: PacijentService, public dialog: MatDialog) {}

  ngOnInit() {
    this.loadData();
  }
  public pageChange(event) {
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
    this._pacijent.getPacijentPage(this.size, this.page).subscribe(
      data => {
        console.log(data);
        this.dataSource = new MatTableDataSource<Pacijent>(data);
      },
      error => {
        console.log(error);
      },
      () => {
        console.log('finish');
      }
    );
  }
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
        this.loadData();
    });
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
