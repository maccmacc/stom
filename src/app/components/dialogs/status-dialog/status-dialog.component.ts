import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatSnackBarModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Status } from '../../../models/status';
import { StatusService } from '../../../services/status.service';
import { Slika } from '../../../models/slika';
import { SlikaService } from '../../../services/slika.service';



@Component({
  selector: 'app-status-dialog',
  templateUrl: './status-dialog.component.html',
  styleUrls: ['./status-dialog.component.css']
})
export class StatusDialogComponent implements OnInit {
  sveSlike: Slika[];
  flag: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<StatusDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Status,
              public statusService: StatusService,
              public slikaService: SlikaService
  ) { }

  ngOnInit() {
    this.slikaService.getAllSlika().subscribe(slika =>
      this.sveSlike = slika
    );
  }

  public add(): void {
    this.statusService.getNextID(this.statusService.addStatus, this.data);
    this.snackBar.open('Uspešno dodat status', 'U redu',
      {
        duration: 2500
      });
  }

  public update(): void {
    this.statusService.updateStatus(this.data);
    this.snackBar.open('Uspešno modifikovan status', 'U redu',
      {
        duration: 2500
      });
  }

  public delete(): void {
    this.statusService.deleteStatus(this.data.id);
    this.snackBar.open('Uspešno obrisan status', 'U redu',
      {
        duration: 2500
      });
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
