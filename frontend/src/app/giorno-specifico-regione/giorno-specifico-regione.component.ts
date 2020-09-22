import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-giorno-specifico-regione',
  templateUrl: './giorno-specifico-regione.component.html',
  styleUrls: ['./giorno-specifico-regione.component.css']
})
export class GiornoSpecificoRegioneComponent implements OnInit {
  codiceRegione: any;
  tabellaNazionale: any;
  nomeRegione: any;

  constructor(httpDue: HttpClient, route: ActivatedRoute) {
    this.codiceRegione = route.snapshot.paramMap.get("codiceRegione");
    let obsDue = httpDue.get('http://localhost:3000/regioni/'+this.codiceRegione+'/dettaglioStorico', { responseType: 'text' });
    obsDue.subscribe((ResponseDue) => this.mettiJSONDue((ResponseDue)));
    obsDue = httpDue.get('http://localhost:3000/menu/elencoRegioni/'+this.codiceRegione, { responseType: 'text' });
    obsDue.subscribe((Response) => this.mettiJSONTitolo(Response));
  }

  mettiJSONTitolo(a) {
    a = JSON.parse(a);
    this.nomeRegione = a.response[0].denominazione_regione;
  }

  mettiJSONDue(a) {
    a = JSON.parse(a);
    this.tabellaNazionale = a.response;
  }
  ngOnInit(): void {
  }

}
