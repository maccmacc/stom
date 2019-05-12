import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatSnackBarModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Isplata } from '../../../models/isplata';
import { IsplataService } from '../../../services/isplata.service';
import { Zaposleni } from '../../../models/zaposleni';
import { ZaposleniService } from '../../../services/zaposleni.service';



@Component({
  selector: 'app-isplata-dialog',
  templateUrl: './isplata-dialog.component.html',
  styleUrls: ['./isplata-dialog.component.css']
})
export class IsplataDialogComponent implements OnInit {
  sviZaposleni: Zaposleni[];
  flag: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<IsplataDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Isplata,
              public isplataService: IsplataService,
              public zaposleniService: ZaposleniService
  ) { }

  ngOnInit() {
    this.zaposleniService.getAllZaposleni().subscribe(zaposleni =>
      this.sviZaposleni = zaposleni
    );
  }

  public add(): void {
    this.isplataService.getNextID(this.isplataService.addIsplata, this.data);
    /*this.snackBar.open('Uspešno dodat isplata: ' + this.data.ime + ' ' + this.data.prezime, 'U redu',
      {
        duration: 2500
      });*/
  }

  public update(): void {
    this.isplataService.updateIsplata(this.data);
   /* this.snackBar.open('Uspešno modifikovan isplata: ' + this.data.ime + ' ' + this.data.prezime, 'U redu',
      {
        duration: 2500
      });*/
  }

  public delete(): void {
    this.isplataService.deleteIsplata(this.data.id);
   /* this.snackBar.open('Uspešno obrisan isplata: ' + this.data.id, 'U redu',
      {
        duration: 2500
      });*/
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'U redu',
      {
        duration: 1000
      });
  }

  public compareTo(a, b) {
    return a.id === b.id;
  }

}
