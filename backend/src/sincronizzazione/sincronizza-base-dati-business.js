var api = require('./api-protezione-civile');

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dashboard-covid-italia"
});

module.exports = {
  sincronizzaDatiNazionali: async function () {
    console.log("sincronizza-base-dati-business - sincronizzaDatiNazionali");
    let elencoDatiNazionali = await api.interrogaDatiNazionali();
    var contatore = 0;
    for (var c = 0; c < elencoDatiNazionali.length; c++) {
      let tmp = elencoDatiNazionali[c];
      let date_ob = new Date(tmp.data);
      let date = ("0" + date_ob.getDate()).slice(-2);
      let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
      let year = date_ob.getFullYear();
      let hours = date_ob.getHours();
      let minutes = date_ob.getMinutes();
      let seconds = date_ob.getSeconds();
      if (tmp.note != null) {
        tmp.note = tmp.note.replace('"', '');
      }
      tmp.data = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
      try {
        var sql = "INSERT INTO `storico_nazionale` (`data`, `stato`, `ricoverati_con_sintomi`, `terapia_intensiva`,`totale_ospedalizzati`,`isolamento_domiciliare`,`totale_positivi`,`variazione_totale_positivi`,`nuovi_positivi`,`dimessi_guariti`,`deceduti`,`casi_da_sospetto_diagnostico`,`casi_da_screening`,`totale_casi`,`tamponi`,`casi_testati` , `note`,`ingressi_terapia_intensiva`,`note_test`,`note_casi`) VALUES ( \"" + tmp.data + "\" , \"" + tmp.stato + "\" ," + tmp.ricoverati_con_sintomi + " ," + tmp.terapia_intensiva + " ," + tmp.totale_ospedalizzati + " ," + tmp.isolamento_domiciliare + " ," + tmp.totale_positivi + " ," + tmp.variazione_totale_positivi + " ," + tmp.nuovi_positivi + " ," + tmp.dimessi_guariti + " ," + tmp.deceduti + " ," + tmp.casi_da_sospetto_diagnostico + " ," + tmp.casi_da_screening + " ," + tmp.totale_casi + " ," + tmp.tamponi + " ," + tmp.casi_testati + ",\"" + tmp.note + "\",\"" + tmp.ingressi_terapia_intensiva + "\",\"" + tmp.note_test + "\",\"" + tmp.note_casi + "\" ) ";
        con.query(sql, function (err, result) {
          if (!err)
          contatore++;
          console.log("Record inseriti: " + contatore + " - Tentativi: " + c);
        });
      } catch (error) {
        console.log(error);
      }
    }
  },
  sincronizzaDatiRegionali: async function () {
    console.log("sincronizza-base-dati-business - sincronizzaDatiProvinciali");
    let elencoDatiRegionali = await api.interrogaDatiRegionali();
    var contatore = 0;
    for (var c = 0; c < elencoDatiRegionali.length; c++) {
      let tmp = elencoDatiRegionali[c];
      let date_ob = new Date(tmp.data);
      let date = ("0" + date_ob.getDate()).slice(-2);
      let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
      let year = date_ob.getFullYear();
      let hours = date_ob.getHours();
      let minutes = date_ob.getMinutes();
      let seconds = date_ob.getSeconds();
      if (tmp.note != null) {
        tmp.note = tmp.note.replace('"', '');
      }
      tmp.data = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
      try {
        var sql = "INSERT INTO `storico_regioni` (`data`, `stato`, `codice_regione`, `denominazione_regione`, `lat`, `long`, `ricoverati_con_sintomi`, `terapia_intensiva`,`totale_ospedalizzati`,`isolamento_domiciliare`,`totale_positivi`,`variazione_totale_positivi`,`nuovi_positivi`,`dimessi_guariti`,`deceduti`,`casi_da_sospetto_diagnostico`,`casi_da_screening`,`totale_casi`,`tamponi`,`casi_testati` , `note`,`ingressi_terapia_intensiva`,`note_test`,`note_casi`) VALUES ( \"" + tmp.data + "\" , \"" + tmp.stato + "\" , " + tmp.codice_regione + " ,\"" + tmp.denominazione_regione + "\"  ," + tmp.lat + " ," + tmp.long + " ," + tmp.ricoverati_con_sintomi + " ," + tmp.terapia_intensiva + " ," + tmp.totale_ospedalizzati + " ," + tmp.isolamento_domiciliare + " ," + tmp.totale_positivi + " ," + tmp.variazione_totale_positivi + " ," + tmp.nuovi_positivi + " ," + tmp.dimessi_guariti + " ," + tmp.deceduti + " ," + tmp.casi_da_sospetto_diagnostico + " ," + tmp.casi_da_screening + " ," + tmp.totale_casi + " ," + tmp.tamponi + " ," + tmp.casi_testati + ",\"" + tmp.note + "\",\"" + tmp.ingressi_terapia_intensiva + "\",\"" + tmp.note_test + "\",\"" + tmp.note_casi + "\" ) ";
        con.query(sql, function (err, result) {
          if (!err)
            contatore++;
          console.log("Record inseriti: " + contatore + " - Tentativi: " + c);
        });
      } catch (error) {
        console.log(error);
      }
    }

  },
  sincronizzaDatiProvinciali: async function () {
    console.log("sincronizza-base-dati-business - sincronizzaDatiProvinciali");
    let elencoDatiProvinciali = await api.interrogaDatiProvinciali();
    var contatore = 0;
    for (var c = 0; c < elencoDatiProvinciali.length; c++) {
      let tmp = elencoDatiProvinciali[c];
      let date_ob = new Date(tmp.data);
      let date = ("0" + date_ob.getDate()).slice(-2);
      let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
      let year = date_ob.getFullYear();
      let hours = date_ob.getHours();
      let minutes = date_ob.getMinutes();
      let seconds = date_ob.getSeconds();
      if (tmp.note != null) {
        tmp.note = tmp.note.replace('"', '');
      }
      tmp.data = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
      try {
        var sql = "INSERT INTO `storico_province` (`data`, `stato`, `codice_regione`, `denominazione_regione`, `codice_provincia`, `denominazione_provincia`, `sigla_provincia`, `lat`, `long`, `totale_casi`, `note`) VALUES ( \"" + tmp.data + "\" , \"" + tmp.stato + "\" , " + tmp.codice_regione + " ,\"" + tmp.denominazione_regione + "\" ," + tmp.codice_provincia + " ,\"" + tmp.denominazione_provincia + "\" ,\"" + tmp.sigla_provincia + "\" ," + tmp.lat + " ," + tmp.long + " ," + tmp.totale_casi + " ,\"" + tmp.note + "\" ) ";
        con.query(sql, function (err, result) {
          if (!err)
          contatore++;
          console.log("Record inseriti: " + contatore + " - Tentativi: " + c);
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
};