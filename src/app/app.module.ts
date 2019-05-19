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
import { PacijenComponent } from "./components/pacijent/pacijent.component";
import { HttpClientModule } from "@angular/common/http";
import { MaterijalComponent } from "./components/materijal/materijal.component";
import { OrdinacijaComponent } from "./components/ordinacija/ordinacija.component";
import { DobavljacComponent } from "./components/dobavljac/dobavljac.component";
import { DijagnozaComponent } from "./components/dijagnoza/dijagnoza.component";
import { SlikaComponent } from "./components/slika/slika.component";
import { StrukaComponent } from "./components/struka/struka.component";
import { ArtiklComponent } from "./components/artikl/artikl.component";
import { ArtiklService } from "./services/artikl.service";
import { DobavljacService } from "./services/dobavljac.service";
import { DijagnozaService } from "./services/dijagnoza.service";
import { OrdinacijaService } from "./services/ordinacija.service";
import { StrukaService } from "./services/struka.service";
import { MaterijalService } from "./services/materijal.service";
import { TableComponent } from "./table/table.component";
import { PacijentDialogComponent } from "./components/dialogs/pacijent-dialog/pacijent-dialog.component";
import { MaterijalDialogComponent } from "./components/dialogs/materijal-dialog/materijal-dialog.component";
import { DobavljacDialogComponent } from "./components/dialogs/dobavljac-dialog/dobavljac-dialog.component";
import { DijagnozaDialogComponent } from "./components/dialogs/dijagnoza-dialog/dijagnoza-dialog.component";
import { OrdinacijaDialogComponent } from "./components/dialogs/ordinacija-dialog/ordinacija-dialog.component";
import { SlikaDialogComponent } from "./components/dialogs/slika-dialog/slika-dialog.component";
import { StrukaDialogComponent } from "./components/dialogs/struka-dialog/struka-dialog.component";
import { ArtiklDialogComponent } from "./components/dialogs/artikl-dialog/artikl-dialog.component";
import { FormsModule } from "@angular/forms";
import { IsplataComponent } from "./components/isplata/isplata.component";
import { IsplataDialogComponent } from "./components/dialogs/isplata-dialog/isplata-dialog.component";
import { ZaposleniDialogComponent } from "./components/dialogs/zaposleni-dialog/zaposleni-dialog.component";
import { ZaposleniComponent } from "./components/zaposleni/zaposleni.component";
import { IsplataService } from "./services/isplata.service";
import { ZaposleniService } from "./services/zaposleni.service";
import { PorudzbinaDialogComponent } from "./components/dialogs/porudzbina-dialog/porudzbina-dialog.component";
import { PorudzbinaComponent } from "./components/porudzbina/porudzbina.component";
import { PorudzbinaService } from "./services/porudzbina.service";
import { RadnoMestoDialogComponent } from "./components/dialogs/radno-mesto-dialog/radno-mesto-dialog.component";
import { RadnoMestoComponent } from "./components/radno-mesto/radno-mesto.component";
import { RadnoMestoService } from "./services/radno-mesto.service";
import { StatusDialogComponent } from "./components/dialogs/status-dialog/status-dialog.component";
import { StatusComponent } from "./components/status/status.component";
import { StatusService } from "./services/status.service";
import { VrstaIntervencijeComponent } from "./components/vrsta-intervencije/vrsta-intervencije.component";
import { VrstaIntervencijeDialogComponent } from "./components/dialogs/vrsta-intervencije-dialog/vrsta-intervencije-dialog.component";
import { VrstaIntervencijeService } from "./services/vrsta-intervencije.service";
import { StavkaPorudzbineComponent } from "./components/stavka-porudzbine/stavka-porudzbine.component";
import { StavkaPorudzbineDialogComponent } from "./components/dialogs/stavka-porudzbine-dialog/stavka-porudzbine-dialog.component";
import { StavkaPorudzbineService } from "./services/stavka-porudzbine.service";
import { KalendarComponent } from "./components/kalendar/kalendar.component";
import { KalendarDialogComponent } from "./components/dialogs/kalendar-dialog/kalendar-dialog.component";
import { TerminService } from "./services/termin.service";

//kalendar

import { ScheduleModule } from "@syncfusion/ej2-angular-schedule";
import { TimePickerModule } from "@syncfusion/ej2-angular-calendars";
import { DatePickerModule } from "@syncfusion/ej2-angular-calendars";
import { DropDownListComponent } from "@syncfusion/ej2-angular-dropdowns";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "@syncfusion/ej2-angular-buttons";

import {
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  AgendaService,
  MonthAgendaService
} from "@syncfusion/ej2-angular-schedule";

import { MatRippleModule, MatAutocompleteModule } from "@angular/material";
import { MAT_DATE_LOCALE } from "@angular/material";
import {
  DragAndDropService,
  ResizeService,
  ScheduleAllModule
} from "@syncfusion/ej2-angular-schedule";
import { RacunComponent } from './components/racun/racun.component';
import { RacunDialogComponent } from './components/dialogs/racun-dialog/racun-dialog.component';
import { RacunService } from './services/racun.service';
import { SnimakComponent } from './components/snimak/snimak.component';
import { SnimakDialogComponent } from './components/dialogs/snimak-dialog/snimak-dialog.component';
import { SnimakService } from './services/snimak.service';
import { StavkaPlanaRadaComponent } from './components/stavka-plana-rada/stavka-plana-rada.component';
import { PlanRadaComponent } from './components/plan-rada/plan-rada.component';
import { PlanRadaDialogComponent } from './components/dialogs/plan-rada-dialog/plan-rada-dialog.component';
import { StavkaPlanaRadaDialogComponent } from './components/dialogs/stavka-plana-rada-dialog/stavka-plana-rada-dialog.component';
import { PlanRadaService } from './services/plan-rada.service';
import { StavkaPlanaRadaService } from './services/stavka-plana-rada.service';
import { ZubComponent } from './components/zub/zub.component';
import { ZubDialogComponent } from './components/dialogs/zub-dialog/zub-dialog.component';

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
    StavkaPorudzbineDialogComponent,
    KalendarComponent,
    KalendarDialogComponent,
    DropDownListComponent,
    RacunComponent,
    RacunDialogComponent,
    SnimakComponent,
    SnimakDialogComponent,
    StavkaPlanaRadaComponent,
    PlanRadaComponent,
    PlanRadaDialogComponent,
    StavkaPlanaRadaDialogComponent,
    ZubComponent,
    ZubDialogComponent
  ],
  entryComponents: [
    PacijentDialogComponent,
    MaterijalDialogComponent,
    DobavljacDialogComponent,
    DijagnozaDialogComponent,
    SlikaDialogComponent,
    OrdinacijaDialogComponent,
    PorudzbinaDialogComponent,
    StrukaDialogComponent,
    ArtiklDialogComponent,
    IsplataDialogComponent,
    ZaposleniDialogComponent,
    RadnoMestoDialogComponent,
    StatusDialogComponent,
    VrstaIntervencijeDialogComponent,
    StavkaPorudzbineDialogComponent,
    KalendarDialogComponent,
    RacunDialogComponent,
    SnimakDialogComponent,
    StavkaPlanaRadaDialogComponent,
    PlanRadaDialogComponent
  ],
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
    MatSelectModule,
    ScheduleModule,
    TimePickerModule,
    DatePickerModule,
    MatDialogModule,
    MatRippleModule,

    ReactiveFormsModule,
    MatAutocompleteModule,
    ScheduleAllModule,
    ButtonModule
  ],
  providers: [
    PacijentService,
    ArtiklService,
    PorudzbinaService,
    DobavljacService,
    DijagnozaService,
    OrdinacijaService,
    StrukaService,
    MaterijalService,
    ZaposleniService,
    IsplataService,
    PorudzbinaService,
    RadnoMestoService,
    StatusService,
    VrstaIntervencijeService,
    StavkaPorudzbineService,
    TerminService,
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    AgendaService,
    MonthAgendaService,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MAT_DATE_LOCALE, useValue: "sr-Latn" },
    ScheduleAllModule,
    RacunService,
    SnimakService,
    PlanRadaService,
    StavkaPlanaRadaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
