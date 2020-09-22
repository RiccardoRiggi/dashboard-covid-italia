import { Component, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4lang_it_It from "@amcharts/amcharts4/lang/it_IT";
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-storico-provinciale',
  templateUrl: './storico-provinciale.component.html',
  styleUrls: ['./storico-provinciale.component.css']
})
export class StoricoProvincialeComponent implements OnInit {
  codiceProvincia: any;
  codiceRegione: any;
  graficoStoricoContagiatiNazionale: any;
  nomeProvincia: any;

  constructor(http: HttpClient,private route: ActivatedRoute) { 
    this.codiceRegione = this.route.snapshot.paramMap.get("codiceRegione");
    this.codiceProvincia = this.route.snapshot.paramMap.get("codiceProvincia");
    let obs = http.get('http://localhost:3000/province/'+this.codiceRegione+'/'+this.codiceProvincia+'/storico-totale-casi', { responseType: 'text' });
    obs.subscribe((Response) => this.mettiJSON(Response));
    obs = http.get('http://localhost:3000/menu/elencoProvince/'+this.codiceRegione+'/'+this.codiceProvincia, { responseType: 'text' });
    obs.subscribe((Response) => this.mettiJSONTitolo(Response));
  }

  mettiJSONTitolo(a) {
    a = JSON.parse(a);
    this.nomeProvincia = a.response[0].denominazione_provincia;
  }

  mettiJSON(a) {
    a = JSON.parse(a);
    this.graficoStoricoContagiatiNazionale = a.response;
    this.creaGraficoStoricoContagiatiProvinciale();
  }
  creaGraficoStoricoContagiatiProvinciale() {
    am4core.useTheme(am4themes_animated);
    let chart = am4core.create("graficoStoricoTotaleCasiProvinciale", am4charts.XYChart);
    chart.language.locale = am4lang_it_It;
    chart.data = this.graficoStoricoContagiatiNazionale;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 60;
    dateAxis.stroke = am4core.color("#5a5c69");

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "differenza";
    series.dataFields.dateX = "giorno";
    series.strokeWidth = 2;
    series.minBulletDistance = 10;
    series.tooltipText = "{valueY}";
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.background.cornerRadius = 10;
    series.tooltip.background.fillOpacity = 0.5;
    series.tooltip.label.padding(12, 12, 12, 12);
    series.fill = am4core.color("#4e73df"); //CAMBIO COLORE SFONDO TOOLTIP VALORE
    series.fillOpacity = 0.5; //METTO LO SFONDO DEI GRAFICI AREA OCCUPATA
    series.stroke = am4core.color("#4e73df"); //CAMBIA COLORE LINEA
    series.strokeWidth = 2.5; //SPESSORE LINEA
    //PER LO ZOOM
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
    chart.cursor.snapToSeries = series;
    chart.cursor.fill = am4core.color("#ff0000");
  }

  ngOnInit(): void {
  }

}
