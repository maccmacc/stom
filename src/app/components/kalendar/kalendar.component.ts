import { Component, ViewChild } from "@angular/core";
import {
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  View,
  EventSettingsModel,
  ScheduleComponent
} from "@syncfusion/ej2-angular-schedule";
import { TerminService } from "../../services/termin.service";
import { Termin } from "../../models/Termin";
import { L10n, loadCldr, setCulture } from "@syncfusion/ej2-base";
import { KalendarDialogComponent } from "../dialogs/kalendar-dialog/kalendar-dialog.component";
import { MatDialog } from "@angular/material/dialog";

declare var require: any;
setCulture("sr-Latn");

@Component({
  selector: "app-kalendar",
  templateUrl: "./kalendar.component.html",
  styleUrls: ["./kalendar.component.css"],
  providers: [DayService, WeekService, WorkWeekService, MonthService]
})
export class KalendarComponent {
  @ViewChild("scheduleObj") scheduleObj: ScheduleComponent;
  public selectedDate: Date = new Date();
  public currentView: View = "Month";
  dateFormat: string = "dd/MM/yyyy";
  currentDate: Date = new Date(2018, 10, 30);
  public views: Array<string> = ["Day", "Week", "WorkWeek", "Month"];
  private selectionTarget: Element;
  load: boolean = false;

  public data: object[] = [];

  public eventSettings: EventSettingsModel = {
    dataSource: this.data
  };

 

      
  

  constructor(private terminService: TerminService, public dialog: MatDialog) {
    loadCldr(
      require("../../../../node_modules/cldr-data/main/sr-Latn/ca-gregorian.json"),
      require("../../../../node_modules/cldr-data/main/sr-Latn/numbers.json"),
      require("../../../../node_modules/cldr-data/main/sr-Latn/timeZoneNames.json")
    );

    var s = new Date();
    this.currentDate = new Date(s.getFullYear(), s.getMonth(), s.getDate());

   
  }


  ngOnInit() {

    
    L10n.load({
      "sr-Latn": {
        schedule: {
          day: "Dan",
          week: "Nedelja",
          workWeek: "Radna nedelja",
          month: "Mesec",
          agenda: "Agenda",
          weekAgenda: "Agenda nedelje",
          workWeekAgenda: "Agenda radne nedelje",
          monthAgenda: "Mesečna agenda",
          today: "Danas",
          noEvents: "Nema termina",
          emptyContainer: "Nema zapisanih termina na ovaj dan",
          allDay: "Ceo dan",
          start: "Početak",
          end: "Kraj",
          more: "više",
          close: "Zatvori",
          cancel: "Otkaži",
          noTitle: "(Nema naslova)",
          delete: "Obriši",
          deleteEvent: "Obriši termin",
          deleteMultipleEvent: "Obriši više termina",
          selectedItems: "Selektovani termini",
          deleteSeries: "Obriši grupu",
          edit: "Izmeni",
          editSeries: "Modifikuj grupu",
          editEvent: "Izmeni termin",
          createEvent: "Kreiraj termin",
          subject: "Subject",
          addTitle: "Odaberi pacijenta",
          moreDetails: "Više detalja",
          save: "Sačuvaj",
          editContent:
            "Da li želite da izmenite ovaj termin ili celu grupu termina?",
          deleteRecurrenceContent:
            "Da li želite da obrišete ovaj termin ili celu grupu termina?",
          deleteContent: "Da li ste sigurni da želite da obrišete ovaj termin?",
          deleteMultipleContent:
            "Da li ste sigurni da želite da obrišete selektovane termine?",
          newEvent: "Novi termin",
          title: "Naslov",
          location: "Lokacija",
          description: "Opis",
          timezone: "Vremenska zona",
          startTimezone: "Početna vremenska zona",
          endTimezone: "Krajanja vremenska zona",
          repeat: "Ponovi",
          saveButton: "Sačuvaj",
          cancelButton: "Otkaži",
          deleteButton: "Obriši",
          recurrence: "Ponavljanje",
          wrongPattern: "Obrazac za ponavaljanje nije validan",
          seriesChangeAlert: "Izmene grupe nisu sačuvane",
          createError: "Pogrešno vreme trajanja ermina",
          recurrenceDateValidation: "Pogrešno unet datum",
          sameDayAlert:
            "Two occurrences of the same event cannot occur on the same day.",
          editRecurrence: "Edit Recurrence",
          repeats: "Ponavaljanja",
          alert: "Obaveštenje",
          startEndError:
            "Izabrani datum završetka je postavljen pre datuma početka.",
          invalidDateError: "Unesen datum nije validan",
          ok: "Ok",
          occurrence: "Occurrence",
          series: "Series",
          previous: "Prethodni",
          next: "Sledeći",
          timelineDay: "Timeline Day",
          timelineWeek: "Timeline Week",
          timelineWorkWeek: "Timeline Work Week",
          timelineMonth: "Timeline Month"
        },
        recurrenceeditor: {
          none: "None",
          daily: "Dnevno",
          weekly: "Nedeljno",
          monthly: "Mesečno",
          month: "Mesec",
          yearly: "Godišnje",
          never: "Nikada",
          until: "do",
          count: "Count",
          first: "Prvi",
          second: "Drugi",
          third: "Treći",
          fourth: "Četvrti",
          last: "Poslednji",
          repeat: "Ponovi",
          repeatEvery: "Ponovi svaki",
          on: "Ponovi na",
          end: "Kraj",
          onDay: "Dan",
          days: "Dani",
          weeks: "Nedelje",
          months: "Meseci",
          years: "Godine",
          every: "svaki",
          summaryTimes: "puta",
          summaryOn: "na",
          summaryUntil: "dok",
          summaryRepeat: "Ponavljanja",
          summaryDay: "dana",
          summaryWeek: "nedelja",
          summaryMonth: "meseci",
          summaryYear: "godina"
        }
      }
    });

    this.loadData();
  }

  public loadData() {
    this.terminService.getAllTermin().subscribe((data: Termin[]) => {
      this.data.length = 0;
      for (var i = 0; i < data.length; i++) {
        this.data.push(this.modifyDataForDisplay(data[i]));
      }
    });
  }

  openDialog(
    startTime: Date,
    endTime: Date,
    flag: Number,
    termin: Termin
  ): void {
    const dialogRef = this.dialog.open(KalendarDialogComponent, {
      data: {
        clickedDate: startTime,
        startTime: startTime,
        flag: flag,
        napomena: termin.napomena,
        endTime: endTime,
        radnoMesto: termin.radnoMjesto,
        pacijent: termin.pacijent,
        id: termin.id
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      if (flag == 1 && dialogRef.componentInstance.termin.id === undefined) {
        return;
      } else if (
        flag == 1 &&
        dialogRef.componentInstance.termin.id !== undefined
      ) {
        this.load = true;
        var json = this.modifyDataForDisplay(
          dialogRef.componentInstance.termin
        );

        this.scheduleObj.addEvent(json);
      } else if (
        flag == 2 &&
        dialogRef.componentInstance.termin.id !== undefined
      ) {
        this.load = true;

        var json = this.modifyDataForDisplay(
          dialogRef.componentInstance.termin
        );
        this.scheduleObj.saveEvent(json);
      }
    });
  }

  ngAfterViewInit() {}

  ngOnDestroy() {}

  onActionBegin(args: any): void {
    if (args.requestType == "eventRemove") {
      for (var i = 0; i < args.data.length; i++) {
        this.terminService.deleteTermin(args.data[i].Id);
      }
    }
  }

  onPopupOpen(args: any): void {
    //sprecavanje otvaranje defualt editora
    if (!args.data.hasOwnProperty("Id") && args.type === "QuickInfo") {
      args.cancel = true;
    }


    this.selectionTarget = null;
    this.selectionTarget = args.target;
    var termin = new Termin();
    if (args.type === "Editor" && !args.data.hasOwnProperty("Id")) {
      args.cancel = true;

      this.openDialog(args.data.StartTime, args.data.EndTime, 1, termin);
    } else if (args.type === "Editor" && args.data.hasOwnProperty("Id")) {
      args.cancel = true;

      termin = {
        id: args.data.Id,
        datum: args.data.StartTime,
        napomena: args.data.napomena,
        pocetak:
          args.data.StartTime.getHours() +
          ":" +
          args.data.StartTime.getMinutes() +
          ":" +
          "00",
        zavrsetak:
          args.data.EndTime.getHours() +
          ":" +
          args.data.EndTime.getMinutes() +
          ":" +
          "00",
        pacijent: args.data.pacijent,
        radnoMjesto: args.data.radnoMesto,
        zaposleni: args.data.zaposleni
      };

      this.openDialog(args.data.StartTime, args.data.EndTime, 2, termin);
    }
  }

  modifyDataForDisplay(termin: Termin): any {
    if (!this.load) {
      let date = new Date(Date.parse(termin.datum));
      var st = new Date("1970-01-01T" + termin.pocetak);
      var startTime = new Date(
        Date.UTC(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          st.getHours(),
          st.getMinutes()
        )
      );

      var et = new Date("1970-01-01T" + termin.zavrsetak);
      var endTime = new Date(
        Date.UTC(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          et.getHours(),
          et.getMinutes()
        )
      );
    } else {
      let date = new Date(Date.parse(termin.datum));
      var formatStartTime = termin.pocetak.split(":");
      var startTimeHours = formatStartTime[0];
      var startTimeMinutes = formatStartTime[1];

      var startTime = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        Number.parseInt(startTimeHours),
        Number.parseInt(startTimeMinutes)
      );

      var formatEndTime = termin.zavrsetak.split(":");
      var endTimeHours = formatEndTime[0];
      var endTimeMinutes = formatEndTime[1];
      var endTime = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        Number.parseInt(endTimeHours),
        Number.parseInt(endTimeMinutes)
      );

      this.load = false;
    }

    var json = {
      Id: termin.id,
      Subject: termin.pacijent.lookup,
      StartTime: startTime,
      EndTime: endTime,
      pacijent: termin.pacijent,
      zaposleni: termin.zaposleni,
      radnoMesto: termin.radnoMjesto,
      napomena: termin.napomena
    };

    return json;
  }
}
