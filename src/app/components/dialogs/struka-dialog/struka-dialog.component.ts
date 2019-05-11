import { Component, OnInit, Inject } from '@angular/core';

import { MatSnackBar, MatSnackBarModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Struka } from '../../../models/struka';
import { StrukaService } from '../../../services/struka.service';



@Component({
  selector: 'app-struka-dialog',
  templateUrl: './struka-dialog.component.html',
  styleUrls: ['./struka-dialog.component.css']
})
export class StrukaDialogComponent implements OnInit {
  flag: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<StrukaDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Struka,
              public strukaService: StrukaService
  ) { }

  ngOnInit() {
  }

  public add(): void {
    this.strukaService.getNextID(this.strukaService.addStruka, this.data);
    /*this.snackBar.open('Uspešno dodat struka: ' + this.data.ime + ' ' + this.data.prezime, 'U redu',
      {
        duration: 2500
      });*/
  }

  public update(): void {
    this.strukaService.updateStruka(this.data);
   /* this.snackBar.open('Uspešno modifikovan struka: ' + this.data.ime + ' ' + this.data.prezime, 'U redu',
      {
        duration: 2500
      });*/
  }

  public delete(): void {
    this.strukaService.deleteStruka(this.data.id);
   /* this.snackBar.open('Uspešno obrisan struka: ' + this.data.id, 'U redu',
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

}
