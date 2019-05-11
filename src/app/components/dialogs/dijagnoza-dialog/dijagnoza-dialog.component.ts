import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatSnackBarModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Dijagnoza } from '../../../models/dijagnoza';
import { DijagnozaService } from '../../../services/dijagnoza.service';

@Component({
  selector: 'app-dijagnoza-dialog',
  templateUrl: './dijagnoza-dialog.component.html',
  styleUrls: ['./dijagnoza-dialog.component.css']
})
export class DijagnozaDialogComponent implements OnInit {
  flag: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<DijagnozaDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Dijagnoza,
              public dijagnozaService: DijagnozaService
  ) { }

  ngOnInit() {
  }

  public add(): void {
    this.dijagnozaService.getNextID(this.dijagnozaService.addDijagnoza, this.data);
    /*this.snackBar.open('Uspešno dodat dijagnoza: ' + this.data.ime + ' ' + this.data.prezime, 'U redu',
      {
        duration: 2500
      });*/
  }

  public update(): void {
    this.dijagnozaService.updateDijagnoza(this.data);
   /* this.snackBar.open('Uspešno modifikovan dijagnoza: ' + this.data.ime + ' ' + this.data.prezime, 'U redu',
      {
        duration: 2500
      });*/
  }

  public delete(): void {
    this.dijagnozaService.deleteDijagnoza(this.data.id);
   /* this.snackBar.open('Uspešno obrisan dijagnoza: ' + this.data.id, 'U redu',
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

