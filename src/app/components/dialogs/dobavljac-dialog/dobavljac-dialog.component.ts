import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatSnackBarModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Dobavljac } from '../../../models/dobavljac';
import { DobavljacService } from '../../../services/dobavljac.service';

@Component({
  selector: 'app-dobavljac-dialog',
  templateUrl: './dobavljac-dialog.component.html',
  styleUrls: ['./dobavljac-dialog.component.css']
})
export class DobavljacDialogComponent implements OnInit {
  flag: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<DobavljacDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Dobavljac,
              public dobavljacService: DobavljacService
  ) { }

  ngOnInit() {
  }

  public add(): void {
    this.dobavljacService.getNextID(this.dobavljacService.addDobavljac, this.data);
    /*this.snackBar.open('Uspešno dodat dobavljac: ' + this.data.ime + ' ' + this.data.prezime, 'U redu',
      {
        duration: 2500
      });*/
  }

  public update(): void {
    this.dobavljacService.updateDobavljac(this.data);
   /* this.snackBar.open('Uspešno modifikovan dobavljac: ' + this.data.ime + ' ' + this.data.prezime, 'U redu',
      {
        duration: 2500
      });*/
  }

  public delete(): void {
    this.dobavljacService.deleteDobavljac(this.data.id);
   /* this.snackBar.open('Uspešno obrisan dobavljac: ' + this.data.id, 'U redu',
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
