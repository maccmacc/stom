import { Component, OnInit, Inject } from '@angular/core';

import { MatSnackBar, MatSnackBarModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Slika } from '../../../models/slika';
import { SlikaService } from '../../../services/slika.service';



@Component({
  selector: 'app-slika-dialog',
  templateUrl: './slika-dialog.component.html',
  styleUrls: ['./slika-dialog.component.css']
})
export class SlikaDialogComponent implements OnInit {
  flag: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<SlikaDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Slika,
              public slikaService: SlikaService
  ) { }

  ngOnInit() {
  }

  public add(): void {
    this.slikaService.getNextID(this.slikaService.addSlika, this.data);
    /*this.snackBar.open('Uspešno dodat slika: ' + this.data.ime + ' ' + this.data.prezime, 'U redu',
      {
        duration: 2500
      });*/
  }

  public update(): void {
    this.slikaService.updateSlika(this.data);
   /* this.snackBar.open('Uspešno modifikovan slika: ' + this.data.ime + ' ' + this.data.prezime, 'U redu',
      {
        duration: 2500
      });*/
  }

  public delete(): void {
    this.slikaService.deleteSlika(this.data.id);
   /* this.snackBar.open('Uspešno obrisan slika: ' + this.data.id, 'U redu',
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
