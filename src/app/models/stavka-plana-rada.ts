import { Dijagnoza } from './dijagnoza';
import { PlanRada } from './plan-rada';
import { VrstaIntervencije } from './vrsta-intervencije';

export class StavkaPlanaRada {
  id: number;
  cena: number;
  dijagnoza: Dijagnoza;
  iznos: number;
  planRada: PlanRada;
  popust: number;
  redniBroj: number;
  vrstaIntervencije: VrstaIntervencije;
  zub: number;
}
