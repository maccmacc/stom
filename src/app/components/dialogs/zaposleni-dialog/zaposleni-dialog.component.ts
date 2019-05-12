import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatSnackBarModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Zaposleni } from '../../../models/zaposleni';
import { ZaposleniService } from '../../../services/zaposleni.service';
import { Struka } from '../../../models/struka';
import { StrukaService } from '../../../services/struka.service';


@Component({
  selector: 'app-zaposleni-dialog',
  templateUrl: './zaposleni-dialog.component.html',
  styleUrls: ['./zaposleni-dialog.component.css']
})
export class ZaposleniDialogComponent implements OnInit {
  struke: Struka[];
  flag: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<ZaposleniDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Zaposleni,
              public zaposleniService: ZaposleniService,
              public strukaService: StrukaService
  ) { }

  ngOnInit() {
    this.strukaService.getAllStruka().subscribe(struke =>
      this.struke = struke
    );
  }

  public add(): void {
    this.zaposleniService.getNextID(this.zaposleniService.addZaposleni, this.data);
    /*this.snackBar.open('Uspešno dodat zaposleni: ' + this.data.ime + ' ' + this.data.prezime, 'U redu',
      {
        duration: 2500
      });*/
  }

  public update(): void {
    this.zaposleniService.updateZaposleni(this.data);
   /* this.snackBar.open('Uspešno modifikovan zaposleni: ' + this.data.ime + ' ' + this.data.prezime, 'U redu',
      {
        duration: 2500
      });*/
  }

  public delete(): void {
    this.zaposleniService.deleteZaposleni(this.data.id);
   /* this.snackBar.open('Uspešno obrisan zaposleni: ' + this.data.id, 'U redu',
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
