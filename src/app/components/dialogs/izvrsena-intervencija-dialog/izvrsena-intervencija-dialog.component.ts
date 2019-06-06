import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatSnackBarModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IzvrsenaIntervencija } from '../../../models/izvrsena-intervencija';
import { IzvrsenaIntervencijaService } from '../../../services/izvrsena-intervencija.service';
import { Zaposleni } from '../../../models/zaposleni';
import { ZaposleniService } from '../../../services/zaposleni.service';
import { PacijentService } from '../../../services/pacijent.service';
import { Pacijent } from '../../../models/pacijent';
import { VrstaIntervencije } from '../../../models/vrsta-intervencije';
import { DijagnozaService } from '../../../services/dijagnoza.service';
import { MaterijalService } from '../../../services/materijal.service';
import { VrstaIntervencijeService } from '../../../services/vrsta-intervencije.service';
import { RadnoMestoService } from '../../../services/radno-mesto.service';
import { Dijagnoza } from '../../../models/dijagnoza';
import { Materijal } from '../../../models/materijal';
import { Racun } from '../../../models/racun';
import { RadnoMesto } from '../../../models/radno-mesto';
import { RacunService } from '../../../services/racun.service';



@Component({
  selector: 'app-izvrsena-intervencija-dialog',
  templateUrl: './izvrsena-intervencija-dialog.component.html',
  styleUrls: ['./izvrsena-intervencija-dialog.component.css']
})
export class IzvrsenaIntervencijaDialogComponent implements OnInit {
  sveVrsteIntervencije: VrstaIntervencije[];
  svaRadnaMesta: RadnoMesto[];
  sviRacuni: Racun[];
  sviMaterijali: Materijal[];
  sveDijagnoze: Dijagnoza[];
  sviZaposleni: Zaposleni[];
  flag: number;
  sviPacijenti: Pacijent[];

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<IzvrsenaIntervencijaDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IzvrsenaIntervencija,
              public izvrsenaIntervencijaService: IzvrsenaIntervencijaService,
              public zaposleniService: ZaposleniService,
              public pacijentService: PacijentService,
              public dijagnozaService: DijagnozaService,
              public materijalService: MaterijalService,
              public vrstaIntervencijeService: VrstaIntervencijeService,
              public radnoMestoService: RadnoMestoService,
              public racunService: RacunService
  ) { }

  ngOnInit() {
    this.dijagnozaService.getAllDijagnoza().subscribe(dijagnoza =>
      this.sveDijagnoze = dijagnoza
    );
    this.materijalService.getAllMaterijal().subscribe(materijal =>
      this.sviMaterijali = materijal
    );
    this.zaposleniService.getAllZaposleni().subscribe(zaposleni =>
      this.sviZaposleni = zaposleni
    );
    this.racunService.getAllRacun().subscribe(racun =>
      this.sviRacuni = racun
    );
    this.radnoMestoService.getAllRadnoMesto().subscribe(radnoMesto =>
      this.svaRadnaMesta = radnoMesto
    );
    this.vrstaIntervencijeService.getAllVrstaIntervencije().subscribe(vrstaIntervencije =>
      this.sveVrsteIntervencije = vrstaIntervencije
    );
    this.pacijentService.getAllPacijent().subscribe(pacijent =>
      this.sviPacijenti = pacijent
    );
  }

  public add(): void {
    this.izvrsenaIntervencijaService.getNextID(this.izvrsenaIntervencijaService.addIzvrsenaIntervencija, this.data);
    this.snackBar.open('Uspešno dodata izvrsena intervencija', 'U redu',
      {
        duration: 2500
      });
  }

  public update(): void {
    this.izvrsenaIntervencijaService.updateIzvrsenaIntervencija(this.data);
    this.snackBar.open('Uspešno modifikovana izvrsena intervencija', 'U redu',
    {
      duration: 2500
    });
  }

  public delete(): void {
    this.izvrsenaIntervencijaService.deleteIzvrsenaIntervencija(this.data.id);
    this.snackBar.open('Uspešno obrisana izvrsena intervencija', 'U redu',
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
