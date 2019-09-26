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
        name: 'test',
        lastName: 'test',
        contact: 'test',
        address: 'test',
        email: 'test',
        dateOfBirth: 'test',
        note: 'test',
        date:'test'
    } as any;

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
            },
            err => {
                this.showError = true;        
            });
    }

}