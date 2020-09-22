import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-giorno-specifico-nazione',
  templateUrl: './giorno-specifico-nazione.component.html',
  styleUrls: ['./giorno-specifico-nazione.component.css']
})
export class GiornoSpecificoNazioneComponent implements OnInit {
  tabellaNazionale: any;

  constructor(httpDue: HttpClient) {
    let obsDue = httpDue.get('http://localhost:3000/nazione/dettaglioStorico', { responseType: 'text' });
    obsDue.subscribe((ResponseDue) => this.mettiJSONDue((ResponseDue)));
   }

   mettiJSONDue(a) {
    a = JSON.parse(a);
    this.tabellaNazionale = a.response;
  }

  ngOnInit(): void {
    
  }


}
