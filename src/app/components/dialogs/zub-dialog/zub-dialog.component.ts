import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatSnackBarModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Zub } from '../../../models/zub';
import { ZubService } from '../../../services/zub.service';
import { Status } from '../../../models/status';
import { StatusService } from '../../../services/status.service';
import { PacijentService } from '../../../services/pacijent.service';
import { Pacijent } from '../../../models/pacijent';


@Component({
  selector: 'app-zub-dialog',
  templateUrl: './zub-dialog.component.html',
  styleUrls: ['./zub-dialog.component.css']
})
export class ZubDialogComponent implements OnInit {
  statusi: Status[];
  pacijenti: Pacijent[];
  flag: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<ZubDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Zub,
              public zubService: ZubService,
              public statusService: StatusService,
              public pacijentService: PacijentService
  ) { }

  ngOnInit() {
    this.statusService.getAllStatus().subscribe(statusi =>
      this.statusi = statusi
    );
    this.pacijentService.getAllPacijent().subscribe(pacijenti =>
      this.pacijenti = pacijenti
    );

  }

  public add(): void {
    this.zubService.getNextID(this.zubService.addZub, this.data);
    /*this.snackBar.open('Uspešno dodat zub: ' + this.data.ime + ' ' + this.data.prezime, 'U redu',
      {
        duration: 2500
      });*/
  }

  public update(): void {
    this.zubService.updateZub(this.data);
   /* this.snackBar.open('Uspešno modifikovan zub: ' + this.data.ime + ' ' + this.data.prezime, 'U redu',
      {
        duration: 2500
      });*/
  }

  public delete(): void {
    this.zubService.deleteZub(this.data.id);
   /* this.snackBar.open('Uspešno obrisan zub: ' + this.data.id, 'U redu',
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
