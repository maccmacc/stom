import { OnInit, Component } from "@angular/core";
import { ZaposleniService } from "../../services/zaposleni.service";
import { Zaposleni } from '../../models/zaposleni';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ViewChild } from '@angular/core';
import { ZaposleniDialogComponent } from '../dialogs/zaposleni-dialog/zaposleni-dialog.component';
import { Struka } from '../../models/struka';

@Component({
  selector: 'app-zaposleni',
  templateUrl: './zaposleni.component.html',
  styleUrls: ['./zaposleni.component.css']
})
export class ZaposleniComponent implements OnInit {
  displayedColumns = ['id', 'adresa', 'ime', 'prezime', 'kontakt', 'username', 'struka', 'add', 'edit', 'delete'];
  dataSource: MatTableDataSource<Zaposleni>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private _zaposleni: ZaposleniService, public dialog: MatDialog) {}

  ngOnInit() {
    this.loadData();
  }
  public loadData() {
    this._zaposleni.getAllZaposleni().subscribe(
      data => {
        this.dataSource = new MatTableDataSource<Zaposleni>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log(error);
      },
      () => {
        console.log('finish');
      }
    );
  }
  public openDialog(flag: number, id: number, adresa: string, ime: string, prezime: string, kontakt: string,
                    username: string, struka: Struka, lookup: string) {


    const dialogRef = this.dialog.open(ZaposleniDialogComponent, {
    data: { id: id, adresa: adresa, ime: ime, prezime: prezime, kontakt: kontakt,
            username: username, struka: struka, lookup: lookup }
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
