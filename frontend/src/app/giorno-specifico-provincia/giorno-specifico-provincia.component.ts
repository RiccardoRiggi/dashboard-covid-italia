import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-giorno-specifico-provincia',
  templateUrl: './giorno-specifico-provincia.component.html',
  styleUrls: ['./giorno-specifico-provincia.component.css']
})
export class GiornoSpecificoProvinciaComponent implements OnInit {
  codiceProvincia: string;
  codiceRegione: string;
  tabellaNazionale: any;
  nomeProvincia: any;

  constructor(httpDue: HttpClient, route: ActivatedRoute) { 
    this.codiceRegione = route.snapshot.paramMap.get("codiceRegione");
    this.codiceProvincia = route.snapshot.paramMap.get("codiceProvincia");
    let obs = httpDue.get('http://localhost:3000/province/'+this.codiceRegione+'/'+this.codiceProvincia+'/dettaglioStorico', { responseType: 'text' });
    obs.subscribe((ResponseDue) => this.mettiJSONDue((ResponseDue)));
    obs = httpDue.get('http://localhost:3000/menu/elencoProvince/'+this.codiceRegione+'/'+this.codiceProvincia, { responseType: 'text' });
    obs.subscribe((Response) => this.mettiJSONTitolo(Response));
  }

  mettiJSONTitolo(a) {
    a = JSON.parse(a);
    this.nomeProvincia = a.response[0].denominazione_provincia;
  }

  mettiJSONDue(a) {
    a = JSON.parse(a);
    this.tabellaNazionale = a.response;
  }

  ngOnInit(): void {
  }

}
