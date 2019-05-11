import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatSnackBarModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Materijal } from '../../../models/materijal';
import { MaterijalService } from '../../../services/materijal.service';

@Component({
  selector: 'app-materijal-dialog',
  templateUrl: './materijal-dialog.component.html',
  styleUrls: ['./materijal-dialog.component.css']
})
export class MaterijalDialogComponent implements OnInit {
  flag: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<MaterijalDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Materijal,
              public materijalService: MaterijalService
  ) { }

  ngOnInit() {
  }

  public add(): void {
    this.materijalService.getNextID(this.materijalService.addMaterijal, this.data);
    /*this.snackBar.open('Uspešno dodat materijal: ' + this.data.ime + ' ' + this.data.prezime, 'U redu',
      {
        duration: 2500
      });*/
  }

  public update(): void {
    this.materijalService.updateMaterijal(this.data);
   /* this.snackBar.open('Uspešno modifikovan materijal: ' + this.data.ime + ' ' + this.data.prezime, 'U redu',
      {
        duration: 2500
      });*/
  }

  public delete(): void {
    this.materijalService.deleteMaterijal(this.data.id);
   /* this.snackBar.open('Uspešno obrisan materijal: ' + this.data.id, 'U redu',
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

