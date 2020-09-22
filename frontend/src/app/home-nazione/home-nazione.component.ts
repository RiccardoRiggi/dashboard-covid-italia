import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4lang_it_It from "@amcharts/amcharts4/lang/it_IT";

@Component({
  selector: 'app-home-nazione',
  templateUrl: './home-nazione.component.html',
  styleUrls: ['./home-nazione.component.css']
})
export class HomeNazioneComponent implements OnInit {
  ultimiValori: any;
  elencoNuoviPositiviPerRegione: any[];

  constructor(httpDue: HttpClient) { 
    let obsDue = httpDue.get('http://localhost:3000/nazione/last/', { responseType: 'text' });
    obsDue.subscribe((ResponseDue) => this.mettiJSONDue((ResponseDue)));

    let obsTre = httpDue.get('http://localhost:3000/regioni/nuoviPositiviPerRegione', { responseType: 'text' });
    obsTre.subscribe((ResponseDue) => this.mettiJSONTre((ResponseDue)));
  }

  mettiJSONDue(a) {
    a = JSON.parse(a);
    this.ultimiValori = a.response[0];
  }

  mettiJSONTre(a) {
    a = JSON.parse(a);
    this.elencoNuoviPositiviPerRegione = a.response;
    this.creaGraficoNuoviPositiviPerRegione();
  }

  ngOnInit(): void {
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
    bullet.label.text = "{categoryX} (+[bold]{valueY})";
    bullet.label.rotation = 90;
    bullet.label.truncate = false;
    bullet.label.hideOversized = false;
    bullet.label.horizontalCenter = "left";
    bullet.locationY = 1;
    bullet.dy = 10;
    chart.paddingBottom = 150;
  }

}
