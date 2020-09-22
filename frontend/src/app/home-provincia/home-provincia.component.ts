import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

@Component({
  selector: 'app-home-provincia',
  templateUrl: './home-provincia.component.html',
  styleUrls: ['./home-provincia.component.css']
})
export class HomeProvinciaComponent implements OnInit {
  elencoCasiPerProvincia: any;

  constructor(http: HttpClient) {
    let obsTre = http.get('http://localhost:3000/province/storico-totale-casi', { responseType: 'text' });
    obsTre.subscribe((ResponseDue) => this.mettiJSONTre((ResponseDue)));
  }

  mettiJSONTre(a) {
    a = JSON.parse(a);
    this.elencoCasiPerProvincia = a.response;
    console.log(this.elencoCasiPerProvincia);
    this.creaGraficoTotaleCasiPerProvincia();
    this.elencoCasiPerProvincia.forEach(riga => {
      if (riga.differenza < 0) {
        riga.differenza = 0;
      }
    });
  }
  creaGraficoTotaleCasiPerProvincia() {
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    let chart = am4core.create("graficoNnuoviCasiPerProvincia", am4charts.XYChart);

    // Add data
    chart.data = this.elencoCasiPerProvincia;

    // Create axes
    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "denominazione_provincia";
    categoryAxis.numberFormatter.numberFormat = "#";
    categoryAxis.renderer.inversed = true;

    let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueX = "differenza";
    series.dataFields.categoryY = "denominazione_provincia";
    //series.name = "{categoryX} (+[bold]{categoryY})";
    series.columns.template.propertyFields.fill = "color";
    series.columns.template.tooltipText = "{valueX}";
    //series.columns.template.column3D.stroke = am4core.color("#fff");
    //series.columns.template.column3D.strokeOpacity = 0.2;
    series.columns.template.fill = am4core.color("#4e73df");
    series.columns.template.stroke = am4core.color("#4e73df");

  }

  ngOnInit(): void {
  }

}
