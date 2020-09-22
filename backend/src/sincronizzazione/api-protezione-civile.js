const fetch = require("node-fetch");

module.exports = {
  interrogaDatiNazionali: async function () {
    console.log("apri-protezione-civile - interrogaDatiNazionali");
    let response = await fetch("https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json");
    let json = await response.json();
    return json;
  },
  interrogaDatiRegionali: async function () {
    console.log("apri-protezione-civile - interrogaDatiRegionali");
    let response = await fetch("https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni.json");
    let json = await response.json();
    return json;
  },
  interrogaDatiProvinciali: async function () {
    console.log("apri-protezione-civile - interrogaDatiProvinciali");
    let response = await fetch("https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-province.json");
    let json = await response.json();
    return json;
  }
};