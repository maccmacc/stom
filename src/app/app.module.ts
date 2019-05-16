import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { LayoutModule } from "@angular/cdk/layout";
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatSnackBar,
  MatSnackBarModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule
} from "@angular/material";
import { PacijentService } from "./services/pacijent.service";
import { PacijenComponent } from './components/pacijent/pacijent.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterijalComponent } from './components/materijal/materijal.component';
import { OrdinacijaComponent } from './components/ordinacija/ordinacija.component';
import { DobavljacComponent } from './components/dobavljac/dobavljac.component';
import { DijagnozaComponent } from './components/dijagnoza/dijagnoza.component';
import { SlikaComponent } from './components/slika/slika.component';
import { StrukaComponent } from './components/struka/struka.component';
import { ArtiklComponent } from './components/artikl/artikl.component';
import { ArtiklService } from './services/artikl.service';
import { DobavljacService } from './services/dobavljac.service';
import { DijagnozaService } from './services/dijagnoza.service';
import { OrdinacijaService } from './services/ordinacija.service';
import { StrukaService } from './services/struka.service';
import { MaterijalService } from './services/materijal.service';
import { TableComponent } from './table/table.component';
import { PacijentDialogComponent } from './components/dialogs/pacijent-dialog/pacijent-dialog.component';
import { MaterijalDialogComponent } from './components/dialogs/materijal-dialog/materijal-dialog.component';
import { DobavljacDialogComponent } from './components/dialogs/dobavljac-dialog/dobavljac-dialog.component';
import { DijagnozaDialogComponent } from './components/dialogs/dijagnoza-dialog/dijagnoza-dialog.component';
import { OrdinacijaDialogComponent } from './components/dialogs/ordinacija-dialog/ordinacija-dialog.component';
import { SlikaDialogComponent } from './components/dialogs/slika-dialog/slika-dialog.component';
import { StrukaDialogComponent } from './components/dialogs/struka-dialog/struka-dialog.component';
import { ArtiklDialogComponent } from './components/dialogs/artikl-dialog/artikl-dialog.component';
import { FormsModule } from '@angular/forms';
import { IsplataComponent } from './components/isplata/isplata.component';
import { IsplataDialogComponent } from './components/dialogs/isplata-dialog/isplata-dialog.component';
import { ZaposleniDialogComponent } from './components/dialogs/zaposleni-dialog/zaposleni-dialog.component';
import { ZaposleniComponent } from './components/zaposleni/zaposleni.component';
import { IsplataService } from './services/isplata.service';
import { ZaposleniService } from './services/zaposleni.service';
import { PorudzbinaDialogComponent } from './components/dialogs/porudzbina-dialog/porudzbina-dialog.component';
import { PorudzbinaComponent } from './components/porudzbina/porudzbina.component';
import { PorudzbinaService } from './services/porudzbina.service';
import { RadnoMestoDialogComponent } from './components/dialogs/radno-mesto-dialog/radno-mesto-dialog.component';
import { RadnoMestoComponent } from './components/radno-mesto/radno-mesto.component';
import { RadnoMestoService } from './services/radno-mesto.service';
import { StatusDialogComponent } from './components/dialogs/status-dialog/status-dialog.component';
import { StatusComponent } from './components/status/status.component';
import { StatusService } from './services/status.service';
import { VrstaIntervencijeComponent } from './components/vrsta-intervencije/vrsta-intervencije.component';
import { VrstaIntervencijeDialogComponent } from './components/dialogs/vrsta-intervencije-dialog/vrsta-intervencije-dialog.component';
import { VrstaIntervencijeService } from './services/vrsta-intervencije.service';
import { StavkaPorudzbineComponent } from './components/stavka-porudzbine/stavka-porudzbine.component';
import { StavkaPorudzbineDialogComponent } from './components/dialogs/stavka-porudzbine-dialog/stavka-porudzbine-dialog.component';
import { StavkaPorudzbineService } from './services/stavka-porudzbine.service';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    PacijenComponent,
    MaterijalComponent,
    OrdinacijaComponent,
    DobavljacComponent,
    DijagnozaComponent,
    SlikaComponent,
    StrukaComponent,
    ArtiklComponent,
    TableComponent,
    PacijentDialogComponent,
    MaterijalDialogComponent,
    DobavljacDialogComponent,
    DijagnozaDialogComponent,
    OrdinacijaDialogComponent,
    SlikaDialogComponent,
    StrukaDialogComponent,
    ArtiklDialogComponent,
    IsplataComponent,
    IsplataDialogComponent,
    ZaposleniDialogComponent,
    ZaposleniComponent,
    PorudzbinaDialogComponent,
    PorudzbinaComponent,
    RadnoMestoDialogComponent,
    RadnoMestoComponent,
    StatusDialogComponent,
    StatusComponent,
    VrstaIntervencijeComponent,
    VrstaIntervencijeDialogComponent,
    StavkaPorudzbineComponent,
    StavkaPorudzbineDialogComponent
  ],
  entryComponents: [PacijentDialogComponent, MaterijalDialogComponent,
    DobavljacDialogComponent, DijagnozaDialogComponent, SlikaDialogComponent,
    OrdinacijaDialogComponent, PorudzbinaDialogComponent, StrukaDialogComponent,
    ArtiklDialogComponent, IsplataDialogComponent, ZaposleniDialogComponent, RadnoMestoDialogComponent, StatusDialogComponent,
    VrstaIntervencijeDialogComponent, StavkaPorudzbineDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  providers: [PacijentService, ArtiklService, PorudzbinaService, DobavljacService,
    DijagnozaService, OrdinacijaService, StrukaService, MaterijalService,
    ZaposleniService, IsplataService, PorudzbinaService, RadnoMestoService, StatusService, VrstaIntervencijeService,
     StavkaPorudzbineService],
  bootstrap: [AppComponent]

})
export class AppModule {}
