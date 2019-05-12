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
    ZaposleniComponent
  ],
  entryComponents: [PacijentDialogComponent, MaterijalDialogComponent,
    DobavljacDialogComponent, DijagnozaDialogComponent, SlikaDialogComponent,
    OrdinacijaDialogComponent, StrukaDialogComponent, ArtiklDialogComponent, IsplataDialogComponent, ZaposleniDialogComponent],
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
  providers: [PacijentService, ArtiklService, DobavljacService, DijagnozaService, OrdinacijaService, StrukaService, MaterijalService,
    ZaposleniService, IsplataService],
  bootstrap: [AppComponent]

})
export class AppModule {}
