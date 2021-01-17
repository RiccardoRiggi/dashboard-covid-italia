import { environment } from './../../environments/environment';
import { Component, OnInit, ɵConsole } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4lang_it_It from "@amcharts/amcharts4/lang/it_IT";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-storico-nazionale',
  templateUrl: './storico-nazionale.component.html',
  styleUrls: ['./storico-nazionale.component.css']
})
export class StoricoNazionaleComponent {
  graficoStoricoContagiatiNazionale: any[];
  graficoStoricoTerapiaIntensivaNazionale: any;
  graficoStoricoOspedalizzatiNazionale: any[];
  graficoStoricoIsolamentoDomiciliareNazionale: any[];
  graficoStoricoGuaritiNazionale: any[];
  graficoStoricoDecessiNazionale: any[];
  graficoStoricoTamponiNazionale: any[];
  ultimaData: any;
  graficoStoricoRapportoTamponiNazionale: any;

  constructor(http: HttpClient) {
    let obs = http.get(environment.url_base+'nazione/storico-totale-casi', { responseType: 'text' });
    obs.subscribe((Response) => this.mettiJSON(Response));
    obs = http.get(environment.url_base+'nazione/storico-terapia-intensiva', { responseType: 'text' });
    obs.subscribe((Response) => this.mettiJSONTerapiaIntensiva(Response));
    obs = http.get(environment.url_base+'nazione/storico-totale-ospedalizzati', { responseType: 'text' });
    obs.subscribe((Response) => this.mettiJSONOspedalizzati(Response));
    obs = http.get(environment.url_base+'nazione/storico-isolamento-domiciliare', { responseType: 'text' });
    obs.subscribe((Response) => this.mettiJSONIsolamentoDomiciliare(Response));
    obs = http.get(environment.url_base+'nazione/storico-dimessi-guariti', { responseType: 'text' });
    obs.subscribe((Response) => this.mettiJSONGuariti(Response));
    obs = http.get(environment.url_base+'nazione/storico-deceduti', { responseType: 'text' });
    obs.subscribe((Response) => this.mettiJSONDecessi(Response));
    obs = http.get(environment.url_base+'nazione/storico-tamponi', { responseType: 'text' });
    obs.subscribe((Response) => this.mettiJSONTamponi(Response));
    obs = http.get(environment.url_base+'nazione/storico-rapporto-tamponi-positivi', { responseType: 'text' });
    obs.subscribe((Response) => this.mettiJSONRapportoTamponi(Response));
  }

  mettiJSON(a) {
    a = JSON.parse(a);
    this.graficoStoricoContagiatiNazionale = a.response;
    this.ultimaData = this.graficoStoricoContagiatiNazionale[this.graficoStoricoContagiatiNazionale.length - 1].giorno;
    this.creaGraficoStorico("graficoStoricoContagiatiNazionale", this.graficoStoricoContagiatiNazionale, "differenza");
  }

  mettiJSONOspedalizzati(a) {
    a = JSON.parse(a);
    this.graficoStoricoOspedalizzatiNazionale = a.response;
    this.creaGraficoStorico("graficoStoricoOspedalizzatiNazionale", this.graficoStoricoOspedalizzatiNazionale, "valoreTotale");
  }

  mettiJSONTerapiaIntensiva(a) {
    a = JSON.parse(a);
    this.graficoStoricoTerapiaIntensivaNazionale = a.response;
    this.creaGraficoStorico("graficoStoricoTerapiaIntensivaNazionale", this.graficoStoricoTerapiaIntensivaNazionale, "valoreTotale");
  }

  mettiJSONIsolamentoDomiciliare(a) {
    a = JSON.parse(a);
    this.graficoStoricoIsolamentoDomiciliareNazionale = a.response;
    this.creaGraficoStorico("graficoStoricoIsolamentoDomiciliareNazionale", this.graficoStoricoIsolamentoDomiciliareNazionale, "valoreTotale");
  }

  mettiJSONGuariti(a) {
    a = JSON.parse(a);
    this.graficoStoricoGuaritiNazionale = a.response;
    this.creaGraficoStorico("graficoStoricoGuaritiNazionale", this.graficoStoricoGuaritiNazionale, "differenza");
  }

  mettiJSONDecessi(a) {
    a = JSON.parse(a);
    this.graficoStoricoDecessiNazionale = a.response;
    this.creaGraficoStorico("graficoStoricoDecessiNazionale", this.graficoStoricoDecessiNazionale, "differenza");
  }

  mettiJSONTamponi(a) {
    a = JSON.parse(a);
    this.graficoStoricoTamponiNazionale = a.response;
    this.creaGraficoStorico("graficoStoricoTamponiNazionale", this.graficoStoricoTamponiNazionale, "differenza");
  }

  mettiJSONRapportoTamponi(a) {
    a = JSON.parse(a);
    this.graficoStoricoRapportoTamponiNazionale = a.response;
    this.creaGraficoStoricoRapportoTamponiNazionale();
  }

  creaGraficoStorico(identificativoGrafico, dataset, tipoDato) {
    /*
      tipoDato può essere "differenza" oppure "valoreTotale"
    */
    am4core.useTheme(am4themes_animated);
    let chart = am4core.create(identificativoGrafico, am4charts.XYChart);
    chart.language.locale = am4lang_it_It;
    chart.data = dataset;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 60;
    dateAxis.stroke = am4core.color("#5a5c69");

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0; //VALORE MINIMO DA METTERE SU ASSE Y

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = tipoDato;
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



  creaGraficoStoricoRapportoTamponiNazionale() {

    am4core.useTheme(am4themes_animated);
    let chart = am4core.create("graficoStoricoRapportoTamponiPositivi", am4charts.XYChart);
    chart.language.locale = am4lang_it_It;
    chart.data = this.graficoStoricoRapportoTamponiNazionale;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 60; //DISTANZA ASSE X
    dateAxis.stroke = am4core.color("#5a5c69");

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0; //VALORE MINIMO DA METTERE SU ASSE Y
    valueAxis.max = 100; //VALORE MASSIMO DA METTERE SU ASSE Y

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

}
