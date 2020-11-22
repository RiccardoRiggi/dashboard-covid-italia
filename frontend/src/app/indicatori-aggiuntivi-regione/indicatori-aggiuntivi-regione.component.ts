import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4lang_it_It from "@amcharts/amcharts4/lang/it_IT";

@Component({
  selector: 'app-indicatori-aggiuntivi-regione',
  templateUrl: './indicatori-aggiuntivi-regione.component.html',
  styleUrls: ['./indicatori-aggiuntivi-regione.component.css']
})
export class IndicatoriAggiuntiviRegioneComponent implements OnInit {
  codiceRegione: string;
  ultimiValori: any;
  regione: any;
  ultimaData: any;

  constructor(http: HttpClient,private route: ActivatedRoute) { 
    this.codiceRegione = this.route.snapshot.paramMap.get("codiceRegione");
    let obs = http.get('http://localhost:3000/regioni/'+this.codiceRegione+'/last/', { responseType: 'text' });
    obs.subscribe((Response) => this.mettiJSONDue(Response));
    obs = http.get('http://localhost:3000/menu/elencoRegioni/'+this.codiceRegione, { responseType: 'text' });
    obs.subscribe((Response) => this.mettiJSONTre(Response));
  }

  mettiJSONDue(a) {
    a = JSON.parse(a);
    this.ultimiValori = a.response[0];
    this.ultimaData=this.ultimiValori.data;
    this.creaGraficoDifferenzaTamponiNegativiTamponiPositivi();
    this.creaGraficoPopolazione();

  }

  mettiJSONTre(a) {
    a = JSON.parse(a);
    this.regione = a.response[0];
  }

  creaGraficoDifferenzaTamponiNegativiTamponiPositivi() {
    am4core.useTheme(am4themes_animated);
    let chart = am4core.create("graficoDifferenzaTamponiNegativiTamponiPositiviRegioni", am4charts.PieChart);


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

  creaGraficoPopolazione() {
    am4core.useTheme(am4themes_animated);
    let chart = am4core.create("graficoPopolazioneContagiataTotale", am4charts.PieChart);


    // Add data
    chart.data = [{
      "etichetta": "Contratto",
      "valore": this.ultimiValori.totale_casi,
      "color": am4core.color("#f6c23e")
    }, {
      "etichetta": "Non contratto",
      "valore": this.regione.popolazione - this.ultimiValori.totale_casi,
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

  ngOnInit(): void {
  }

}
