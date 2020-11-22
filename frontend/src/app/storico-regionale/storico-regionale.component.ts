import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4lang_it_It from "@amcharts/amcharts4/lang/it_IT";

@Component({
  selector: 'app-storico-regionale',
  templateUrl: './storico-regionale.component.html',
  styleUrls: ['./storico-regionale.component.css']
})
export class StoricoRegionaleComponent implements OnInit {
  
  codiceRegione: any;
  graficoStoricoContagiatiNazionale;
  graficoStoricoOspedalizzatiNazionale;
  graficoStoricoTerapiaIntensivaNazionale;
  graficoStoricoIsolamentoDomiciliareNazionale;
  graficoStoricoGuaritiNazionale;
  graficoStoricoDecessiNazionale;
  graficoStoricoTamponiNazionale;
  nomeRegione: any;
  ultimaData: any;

  constructor(http: HttpClient,private route: ActivatedRoute) { 
    this.codiceRegione = this.route.snapshot.paramMap.get("codiceRegione");
    let obs = http.get('http://localhost:3000/regioni/'+this.codiceRegione+'/storico-totale-casi', { responseType: 'text' });
    obs.subscribe((Response) => this.mettiJSON(Response));
    obs = http.get('http://localhost:3000/regioni/'+this.codiceRegione+'/storico-terapia-intensiva', { responseType: 'text' });
    obs.subscribe((Response) => this.mettiJSONTerapiaIntensiva(Response));
    obs = http.get('http://localhost:3000/regioni/'+this.codiceRegione+'/storico-totale-ospedalizzati', { responseType: 'text' });
    obs.subscribe((Response) => this.mettiJSONOspedalizzati(Response));
    obs = http.get('http://localhost:3000/regioni/'+this.codiceRegione+'/storico-isolamento-domiciliare', { responseType: 'text' });
    obs.subscribe((Response) => this.mettiJSONIsolamentoDomiciliare(Response));
    obs = http.get('http://localhost:3000/regioni/'+this.codiceRegione+'/storico-dimessi-guariti', { responseType: 'text' });
    obs.subscribe((Response) => this.mettiJSONGuariti(Response));
    obs = http.get('http://localhost:3000/regioni/'+this.codiceRegione+'/storico-deceduti', { responseType: 'text' });
    obs.subscribe((Response) => this.mettiJSONDecessi(Response));
    obs = http.get('http://localhost:3000/regioni/'+this.codiceRegione+'/storico-tamponi', { responseType: 'text' });
    obs.subscribe((Response) => this.mettiJSONTamponi(Response));
    obs = http.get('http://localhost:3000/menu/elencoRegioni/'+this.codiceRegione, { responseType: 'text' });
    obs.subscribe((Response) => this.mettiJSONTitolo(Response));
  }

  mettiJSONTitolo(a) {
    a = JSON.parse(a);
    this.nomeRegione = a.response[0].denominazione_regione;
  }

  mettiJSON(a) {
    a = JSON.parse(a);
    this.graficoStoricoContagiatiNazionale = a.response;
    this.ultimaData=this.graficoStoricoContagiatiNazionale[this.graficoStoricoContagiatiNazionale.length-1].giorno;
    this.creaGraficoStoricoContagiatiNazionale();
  }

  mettiJSONOspedalizzati(a) {
    a = JSON.parse(a);
    this.graficoStoricoOspedalizzatiNazionale = a.response;
    this.creaGraficoStoricoOspedalizzatiNazionale();
  }

  mettiJSONTerapiaIntensiva(a) {
    a = JSON.parse(a);
    this.graficoStoricoTerapiaIntensivaNazionale = a.response;
    this.creaGraficoStoricoTerapiaIntensivaNazionale();
  }

  mettiJSONIsolamentoDomiciliare(a) {
    a = JSON.parse(a);
    this.graficoStoricoIsolamentoDomiciliareNazionale = a.response;
    this.creaGraficoStoricoIsolamentoDomiciliareNazionale();
  }

  mettiJSONGuariti(a) {
    a = JSON.parse(a);
    this.graficoStoricoGuaritiNazionale = a.response;
    this.creaGraficoStoricoGuaritiNazionale();
  }

  mettiJSONDecessi(a) {
    a = JSON.parse(a);
    this.graficoStoricoDecessiNazionale = a.response;
    this.creaGraficoStoricoDecessiNazionale();
  }

  mettiJSONTamponi(a) {
    a = JSON.parse(a);
    this.graficoStoricoTamponiNazionale = a.response;
    this.creaGraficoStoricoTamponiNazionale();
  }

  creaGraficoStoricoContagiatiNazionale() {

    am4core.useTheme(am4themes_animated);
    let chart = am4core.create("graficoStoricoContagiatiNazionale", am4charts.XYChart);
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

  creaGraficoStoricoTerapiaIntensivaNazionale() {

    am4core.useTheme(am4themes_animated);
    let chart = am4core.create("graficoStoricoTerapiaIntensivaNazionale", am4charts.XYChart);
    chart.language.locale = am4lang_it_It;
    chart.data = this.graficoStoricoTerapiaIntensivaNazionale;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 60;
    dateAxis.stroke = am4core.color("#5a5c69");

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "valoreTotale";
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

  creaGraficoStoricoOspedalizzatiNazionale() {

    am4core.useTheme(am4themes_animated);
    let chart = am4core.create("graficoStoricoOspedalizzatiNazionale", am4charts.XYChart);
    chart.language.locale = am4lang_it_It;
    chart.data = this.graficoStoricoOspedalizzatiNazionale;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 60;
    dateAxis.stroke = am4core.color("#5a5c69");

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "valoreTotale";
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

  creaGraficoStoricoIsolamentoDomiciliareNazionale() {

    am4core.useTheme(am4themes_animated);
    let chart = am4core.create("graficoStoricoIsolamentoDomiciliareNazionale", am4charts.XYChart);
    chart.language.locale = am4lang_it_It;
    chart.data = this.graficoStoricoIsolamentoDomiciliareNazionale;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 60;
    dateAxis.stroke = am4core.color("#5a5c69");

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "valoreTotale";
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

  creaGraficoStoricoGuaritiNazionale() {

    am4core.useTheme(am4themes_animated);
    let chart = am4core.create("graficoStoricoGuaritiNazionale", am4charts.XYChart);
    chart.language.locale = am4lang_it_It;
    chart.data = this.graficoStoricoGuaritiNazionale;

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

  creaGraficoStoricoDecessiNazionale() {

    am4core.useTheme(am4themes_animated);
    let chart = am4core.create("graficoStoricoDecessiNazionale", am4charts.XYChart);
    chart.language.locale = am4lang_it_It;
    chart.data = this.graficoStoricoDecessiNazionale;

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

  creaGraficoStoricoTamponiNazionale() {

    am4core.useTheme(am4themes_animated);
    let chart = am4core.create("graficoStoricoTamponiNazionale", am4charts.XYChart);
    chart.language.locale = am4lang_it_It;
    chart.data = this.graficoStoricoTamponiNazionale;

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
