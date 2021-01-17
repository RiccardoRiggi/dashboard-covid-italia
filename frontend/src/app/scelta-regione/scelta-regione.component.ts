import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-scelta-regione',
  templateUrl: './scelta-regione.component.html',
  styleUrls: ['./scelta-regione.component.css']
})
export class SceltaRegioneComponent implements OnInit {
  tipoScelta: string;
  elencoRegioni: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.tipoScelta = this.route.snapshot.paramMap.get("tipoScelta");
    console.log(this.tipoScelta);
    let obs = http.get(environment.url_base+'menu/elencoRegioni', { responseType: 'text' });
    obs.subscribe((Response) => this.mettiJSON(Response));
  }

  mettiJSON(a) {
    a = JSON.parse(a);
    this.elencoRegioni = a.response;
    console.log(this.elencoRegioni[0].denominazione_regione);
  }

  ngOnInit(): void {
  }

}
