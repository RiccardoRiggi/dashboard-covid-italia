import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-scelta-provincia',
  templateUrl: './scelta-provincia.component.html',
  styleUrls: ['./scelta-provincia.component.css']
})
export class SceltaProvinciaComponent implements OnInit {
  tipoScelta: any;
  elencoProvince: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.tipoScelta = this.route.snapshot.paramMap.get("tipoScelta");
    console.log(this.tipoScelta);
    let obs = http.get('http://localhost:3000/menu/elencoProvince', { responseType: 'text' });
    obs.subscribe((Response) => this.mettiJSON(Response));
  }

  mettiJSON(a) {
    a = JSON.parse(a);
    this.elencoProvince = a.response;
  }
  ngOnInit(): void {
  }

}
