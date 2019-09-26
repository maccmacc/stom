import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PacijentService } from "src/app/services/pacijent.service";

@Component ({
   selector: 'app-pacijent-detalji',
   templateUrl: './pacijent-detalji.component.html',
   styleUrls: ['./pacijent-detalji.component.css']
}) 

export class PacijenDetaljitComponent implements OnInit {

    public pacijent = {
        ime: '',
        prezime: '',
        kontakt: '',
        adresa: '',
        email: '',
        datumRodjenja: '',
        napomena: '',
        datumUpisa:'',
        lookup:'',
        planRadas:'',
        racuns: [],
        snimaks: [],
        termins: [],
        zubs:[],
        izvrsenaIntervencijas: []
    } as any;

    public racuni = [];
    public snimci = [];
    public intervencije = [];
    public termini = [];

    public racuniCols = ['datum', 'ukupno'];
    public snimakCols = ['datum', 'putanja', 'opis'];
    public terminCols = ['datum', 'pocetak', 'zavrsteak', 'zaposleni.lookup', 'radnoMjesto.name']
    public izvrsenaIntervencijaCol = ['datum', 'iznos', 'napomena'];

    private id: number = -1;
    public showError: boolean = false;

    constructor(
        private pacijentService: PacijentService,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.setId();
        this.loadData();
    }

    private setId(): void {
        this.id = this.route.snapshot.params.id;
    }

    private loadData(): void {
        this.pacijentService.getPacijentDetails(this.id).subscribe(
            data => {
                this.pacijent=data;
                this.processTableData();
            },
            err => {
                this.showError = true;        
            });
    }

    private processTableData(): void {
        this.termini = this.pacijent.termins;
        this.intervencije = this.pacijent.izvrsenaIntervencijas;
        this.snimci = this.pacijent.snimaks;
      this.racuni = this.pacijent.racuns;
    }

}