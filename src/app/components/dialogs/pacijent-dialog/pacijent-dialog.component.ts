import { Component, OnInit, Inject } from '@angular/core';

import { MatSnackBar, MatSnackBarModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Pacijent } from '../../../models/pacijent';
import { PacijentService } from '../../../services/pacijent.service';



@Component({
  selector: 'app-pacijent-dialog',
  templateUrl: './pacijent-dialog.component.html',
  styleUrls: ['./pacijent-dialog.component.css']
})
export class PacijentDialogComponent implements OnInit {
  flag: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<PacijentDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Pacijent,
              public pacijentService: PacijentService
  ) { }

  ngOnInit() {
  }

  public add(): void {
    this.pacijentService.getNextID(this.pacijentService.addPacijent, this.data);
    /*this.snackBar.open('Uspešno dodat pacijent: ' + this.data.ime + ' ' + this.data.prezime, 'U redu',
      {
        duration: 2500
      });*/
  }

  public update(): void {
    this.pacijentService.updatePacijent(this.data);
   /* this.snackBar.open('Uspešno modifikovan pacijent: ' + this.data.ime + ' ' + this.data.prezime, 'U redu',
      {
        duration: 2500
      });*/
  }

  public delete(): void {
    this.pacijentService.deletePacijent(this.data.id);
   /* this.snackBar.open('Uspešno obrisan pacijent: ' + this.data.id, 'U redu',
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
