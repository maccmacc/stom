import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PacijenComponent } from './components/pacijent/pacijent.component';
import { MaterijalComponent } from './components/materijal/materijal.component';
import { DobavljacComponent } from './components/dobavljac/dobavljac.component';
import { StrukaComponent } from './components/struka/struka.component';
import { SlikaComponent } from './components/slika/slika.component';
import { DijagnozaComponent } from './components/dijagnoza/dijagnoza.component';
import { OrdinacijaComponent } from './components/ordinacija/ordinacija.component';
import { ArtiklComponent } from './components/artikl/artikl.component';
import { ZaposleniComponent } from './components/zaposleni/zaposleni.component';
import { IsplataComponent } from './components/isplata/isplata.component';
import { PorudzbinaComponent } from './components/porudzbina/porudzbina.component';
import { RadnoMestoComponent } from './components/radno-mesto/radno-mesto.component';
import { StatusComponent } from './components/status/status.component';

const routes: Routes = [
  { path: 'pacijent', component: PacijenComponent},
  { path: 'artikl', component: ArtiklComponent},
  { path: 'struka', component: StrukaComponent},
  { path: 'slika', component: SlikaComponent},
  { path: 'ordinacija', component: OrdinacijaComponent},
  { path: 'dobavljac', component: DobavljacComponent},
  { path: 'dijagnoza', component: DijagnozaComponent},
  { path: 'materijal', component: MaterijalComponent},
  { path: 'zaposleni', component: ZaposleniComponent},
  { path: 'isplata', component: IsplataComponent},
  { path: 'porudzbina', component: PorudzbinaComponent},
  { path: 'radno-mesto', component: RadnoMestoComponent},
  { path: 'status', component: StatusComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
