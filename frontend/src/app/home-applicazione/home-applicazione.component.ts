import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4lang_it_It from "@amcharts/amcharts4/lang/it_IT";


@Component({
  selector: 'app-home-applicazione',
  templateUrl: './home-applicazione.component.html',
  styleUrls: ['./home-applicazione.component.css']
})
export class HomeApplicazioneComponent {

  graficoStoricoContagiatiNazionale;

  ultimiValori;
  totalePositivi;
  elencoNuoviPositiviPerRegione;
  ultimaData: any;

  constructor(http: HttpClient, private httpDue: HttpClient) {

    let obsTre = this.httpDue.get(environment.url_base+'regioni/nuoviPositiviPerRegione', { responseType: 'text' });
    obsTre.subscribe((ResponseDue) => this.mettiJSONTre((ResponseDue)));

    let obsDue = this.httpDue.get(environment.url_base+'nazione/last/', { responseType: 'text' });
    obsDue.subscribe((ResponseDue) => this.mettiJSONDue((ResponseDue)));

    let obs = http.get(environment.url_base+'nazione/storico-nuovi-positivi', { responseType: 'text' });
    obs.subscribe((Response) => this.mettiJSON((Response)));

  }

  mettiJSON(a) {
    a = JSON.parse(a);
    this.graficoStoricoContagiatiNazionale = a.response;
    this.creaGraficoStoricoContagiatiNazionale();
  }

  mettiJSONDue(a) {
    a = JSON.parse(a);
    this.ultimiValori = a.response[0];
    this.ultimaData = this.ultimiValori.data;
    this.creaGraficoDifferenzaTamponiNegativiTamponiPositivi();

  }

  mettiJSONTre(a) {
    a = JSON.parse(a);
    this.elencoNuoviPositiviPerRegione = a.response;
    this.creaGraficoNuoviPositiviPerRegione();
  }

  ngOnInit() {
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

  creaGraficoDifferenzaTamponiNegativiTamponiPositivi() {
    am4core.useTheme(am4themes_animated);
    let chart = am4core.create("graficoDifferenzaTamponiNegativiTamponiPositivi", am4charts.PieChart);


    // Add data
    chart.data = [{
      "etichetta": "Tamponi positivi",
      "valore": this.ultimiValori.differenza_totale_casi,
      "color": am4core.color("#e74a3b")
    }, {
      "etichetta": "Tamponi negativi ",
      "valore": this.ultimiValori.differenza_tamponi - this.ultimiValori.differenza_totale_casi,
      "color": am4core.color("#1cc88a")
    }
    ];
    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.slices.template.propertyFields.fill = "color";
    pieSeries.ticks.template.disabled = true;
    pieSeries.alignLabels = false;
    pieSeries.labels.template.hidden = true; // NASCONDI LE ETICHETTE CON LE FRECCE


    pieSeries.dataFields.value = "valore";
    pieSeries.dataFields.category = "etichetta";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeOpacity = 1;


    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;

    chart.hiddenState.properties.radius = am4core.percent(0);
  }

  creaGraficoNuoviPositiviPerRegione() {
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    let chart = am4core.create("graficoNuoviPositiviPerRegione", am4charts.XYChart);

    // Add data
    chart.data = this.elencoNuoviPositiviPerRegione;

    //console.log(JSON.stringify(this.elencoNuoviPositiviPerRegione));

    // Create axes

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "nome";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;


    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "valore";
    series.dataFields.categoryX = "nome";
    series.name = "valore";
    series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series.columns.template.fillOpacity = .8;
    series.columns.template.fill = am4core.color("#4e73df");
    series.columns.template.stroke = am4core.color("#4e73df");

    let columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;

    chart.maskBullets = false;

    categoryAxis.renderer.labels.template.hidden = true; // NASCONDI LABEL SOTTO

    let bullet = series.bullets.push(new am4charts.LabelBullet);
    bullet.label.text = "{categoryX}";
    bullet.label.rotation = 90;
    bullet.label.truncate = false;
    bullet.label.hideOversized = false;
    bullet.label.horizontalCenter = "left";
    bullet.locationY = 1;
    bullet.dy = 10;
    chart.paddingBottom = 50;
  }
}
