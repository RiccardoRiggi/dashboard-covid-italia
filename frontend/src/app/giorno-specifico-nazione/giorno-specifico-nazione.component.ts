import { environment } from './../../environments/environment';
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

  constructor(http: HttpClient) {
    let obs = http.get(environment.url_base + 'nazione/dettaglioStorico', { responseType: 'text' });
    obs.subscribe((Response) => this.estraiJSON((Response)));
  }

  estraiJSON(a) {
    a = JSON.parse(a);
    this.tabellaNazionale = a.response;
  }

  ngOnInit(): void {

  }


}
