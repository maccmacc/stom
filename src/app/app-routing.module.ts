import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PacijenComponent } from "./components/pacijent/pacijent.component";
import { MaterijalComponent } from "./components/materijal/materijal.component";
import { DobavljacComponent } from "./components/dobavljac/dobavljac.component";
import { StrukaComponent } from "./components/struka/struka.component";
import { SlikaComponent } from "./components/slika/slika.component";
import { DijagnozaComponent } from "./components/dijagnoza/dijagnoza.component";
import { OrdinacijaComponent } from "./components/ordinacija/ordinacija.component";
import { ArtiklComponent } from "./components/artikl/artikl.component";
import { ZaposleniComponent } from "./components/zaposleni/zaposleni.component";
import { IsplataComponent } from "./components/isplata/isplata.component";
import { PorudzbinaComponent } from "./components/porudzbina/porudzbina.component";
import { RadnoMestoComponent } from "./components/radno-mesto/radno-mesto.component";
import { StatusComponent } from "./components/status/status.component";
import { VrstaIntervencijeComponent } from "./components/vrsta-intervencije/vrsta-intervencije.component";
import { StavkaPorudzbineComponent } from "./components/stavka-porudzbine/stavka-porudzbine.component";
import { KalendarComponent } from "./components/kalendar/kalendar.component";
import { RacunComponent } from './components/racun/racun.component';
import { AppComponent } from "./app.component";
import { SnimakComponent } from './components/snimak/snimak.component';
import { StavkaPlanaRadaComponent } from './components/stavka-plana-rada/stavka-plana-rada.component';
import { PlanRadaComponent } from './components/plan-rada/plan-rada.component';
import { ZubComponent } from './components/zub/zub.component';

const routes: Routes = [
  { path: "pacijent", component: PacijenComponent },
  { path: "artikl", component: ArtiklComponent },
  { path: "struka", component: StrukaComponent },
  { path: "slika", component: SlikaComponent },
  { path: "ordinacija", component: OrdinacijaComponent },
  { path: "dobavljac", component: DobavljacComponent },
  { path: "dijagnoza", component: DijagnozaComponent },
  { path: "materijal", component: MaterijalComponent },
  { path: "zaposleni", component: ZaposleniComponent },
  { path: "isplata", component: IsplataComponent },
  { path: "porudzbina", component: PorudzbinaComponent },
  { path: "radnoMesto", component: RadnoMestoComponent },
  { path: "status", component: StatusComponent },
  { path: "vrstaIntervencije", component: VrstaIntervencijeComponent },
  { path: "stavkaPorudzbine", component: StavkaPorudzbineComponent },
  { path: "kalendar", component: KalendarComponent },
  { path: "racun", component: RacunComponent },
  { path: "snimak", component: SnimakComponent },
  { path: "stavkaPlanaRada", component: StavkaPlanaRadaComponent },
  { path: "planRada", component: PlanRadaComponent },
  { path: "zub", component: ZubComponent },
  { path: "", component: KalendarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
