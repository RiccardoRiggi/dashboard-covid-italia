# Dashboard Covid Italia

Dashboard Covid Italia è una Web Application realizzata in Javascript che consente di visionare dati e statistiche relative al coronavirus in Italia, suddivisi per regioni e province.

![Home](https://raw.githubusercontent.com/RiccardoRiggi/dashboard-covid-italia/master/screenshots/home.png)

## Database
Viene utilizzato un database [MySql]. Nella relativa cartella è possibile trovare la struttura e i dati relativi ad alcune tabelle.

---

## Dati sul Coronavirus
Le informazioni sul Covid-19 possono essere recuperate dal [repository ufficiale Covid-19] della Presidenza del Consiglio dei Ministri - Dipartimento della Protezione Civile.
Dopo aver installato e configurato correttamente il database e il backend, chiamando le relative API di sincronizzazione del database sarà possibile popolare automaticamente le tabelle. 

---

## Backend
Il backend è realizzato utilizzando [Node.Js] ed [Express.Js].

##### Installazione e avvio
```sh
$ cd backend
$ npm install
$ npm start
```

##### API nazione
http://localhost:3000/nazione/last/ <br>
http://localhost:3000/nazione/storico-ricoverati-con-sintomi <br>
http://localhost:3000/nazione/storico-terapia-intensiva <br>
http://localhost:3000/nazione/storico-totale-ospedalizzati <br>
http://localhost:3000/nazione/storico-isolamento-domiciliare <br>
http://localhost:3000/nazione/storico-totale-positivi <br>
http://localhost:3000/nazione/storico-variazione-totale-positivi <br>
http://localhost:3000/nazione/storico-nuovi-positivi <br>
http://localhost:3000/nazione/storico-dimessi-guariti <br>
http://localhost:3000/nazione/storico-deceduti <br>
http://localhost:3000/nazione/storico-casi-da-sospetto-diagnostico <br>
http://localhost:3000/nazione/storico-casi-da-screening <br>
http://localhost:3000/nazione/storico-totale-casi <br>
http://localhost:3000/nazione/storico-tamponi <br>
http://localhost:3000/nazione/storico-casi-testati <br>
http://localhost:3000/nazione/dettaglio/2020-09-16 <br>
http://localhost:3000/nazione/dettaglioStorico <br>

##### API regioni
http://localhost:3000/regioni/ <br>
http://localhost:3000/regioni/7/last <br>
http://localhost:3000/regioni/7/storico-ricoverati-con-sintomi <br>
http://localhost:3000/regioni/7/storico-terapia-intensiva <br>
http://localhost:3000/regioni/7/storico-totale-ospedalizzati <br>
http://localhost:3000/regioni/7/storico-isolamento-domiciliare <br>
http://localhost:3000/regioni/7/storico-totale-positivi <br>
http://localhost:3000/regioni/7/storico-variazione-totale-positivi <br>
http://localhost:3000/regioni/7/storico-nuovi-positivi <br>
http://localhost:3000/regioni/7/storico-dimessi-guariti <br>
http://localhost:3000/regioni/7/storico-deceduti <br>
http://localhost:3000/regioni/7/storico-casi-da-sospetto-diagnostico <br>
http://localhost:3000/regioni/7/storico-casi-da-screening <br>
http://localhost:3000/regioni/7/storico-totale-casi <br>
http://localhost:3000/regioni/7/storico-tamponi <br>
http://localhost:3000/regioni/7/storico-casi-testati <br>
http://localhost:3000/regioni/7/dettaglio/2020-09-16 <br>
http://localhost:3000/regioni/7/dettaglioStorico <br>
http://localhost:3000/regioni/nuoviPositiviPerRegione <br>
http://localhost:3000/regioni/totaleDecedutiPerRegione <br>
http://localhost:3000/regioni/totaleOspedalizzatiPerRegione <br>

##### API province
http://localhost:3000/province <br>
http://localhost:3000/province/7/10/last <br>
http://localhost:3000/province/7/10/storico-totale-casi <br>
http://localhost:3000/province/7/10/dettaglio/2020-09-17 <br>
http://localhost:3000/province/7/10/dettaglioStorico <br>

##### API menu
http://localhost:3000/menu/elencoRegioni <br>
http://localhost:3000/menu/elencoRegioni/7 <br>
http://localhost:3000/menu/elencoProvince/ <br>
http://localhost:3000/menu/elencoProvince/7 <br>
http://localhost:3000/menu/elencoVociMenu <br>
http://localhost:3000/menu/elencoVociMenuPadre <br>
http://localhost:3000/menu/elencoVociMenuFiglie <br>
http://localhost:3000/menu/elencoVociMenuFiglie/2 <br>

##### API di sincronizzazione del database
http://localhost:3000/sincronizza-base-dati/ <br>
http://localhost:3000/sincronizza-base-dati/nazione <br>
http://localhost:3000/sincronizza-base-dati/regioni <br>
http://localhost:3000/sincronizza-base-dati/province <br>

---

## Frontend 

Il frontend è realizzato in [Angular], basato su [Bootstrap] 4 e tema [SBAdmin] 2. Dalla sidebar di sinistra è possibile selezionare una delle voci di menu per consultare i relativi dati. 

##### Installazione e avvio
```sh
$ cd frontend
$ npm install
$ ng serve --open
```
Di seguito alcuni screenshot dell'applicazione:

##### Ultimi dati nazionali
![Ultimi dati nazionali](https://raw.githubusercontent.com/RiccardoRiggi/dashboard-covid-italia/master/screenshots/ultimi-dati-nazionali.png)

##### Grafici storici nazionali
![Grafici storici nazionali](https://raw.githubusercontent.com/RiccardoRiggi/dashboard-covid-italia/master/screenshots/grafici-storici-nazionali.png)

##### Dati giornalieri nazionali
![Dati giornalieri nazionali](https://raw.githubusercontent.com/RiccardoRiggi/dashboard-covid-italia/master/screenshots/dati-giornalieri-nazionali.png)

##### Ultimi dati regionali
![Ultimi dati regionali](https://raw.githubusercontent.com/RiccardoRiggi/dashboard-covid-italia/master/screenshots/ultimi-dati-regionali.png)

##### Scelta regione
![Scelta regione](https://raw.githubusercontent.com/RiccardoRiggi/dashboard-covid-italia/master/screenshots/scelta-regione.png)

##### Grafici storici regionali
![Grafici storici regionali](https://raw.githubusercontent.com/RiccardoRiggi/dashboard-covid-italia/master/screenshots/grafici-storici-regionali.png)

##### Dati giornalieri regionali
![Dati giornalieri regionali](https://raw.githubusercontent.com/RiccardoRiggi/dashboard-covid-italia/master/screenshots/dati-giornalieri-regionali.png)

##### Ultimi dati provinciali
![Ultimi dati provinciali](https://raw.githubusercontent.com/RiccardoRiggi/dashboard-covid-italia/master/screenshots/ultimi-dati-provinciali.png)

##### Scelta provincia
![Scelta provincia](https://raw.githubusercontent.com/RiccardoRiggi/dashboard-covid-italia/master/screenshots/scelta-provincia.png)

##### Grafici storici provinciali
![Grafici storici provinciali](https://raw.githubusercontent.com/RiccardoRiggi/dashboard-covid-italia/master/screenshots/grafici-storici-provinciali.png)

##### Dati giornalieri provinciali
![Dati giornalieri provinciali](https://raw.githubusercontent.com/RiccardoRiggi/dashboard-covid-italia/master/screenshots/dati-giornalieri-provinciali.png)

##### Crediti
![Crediti](https://raw.githubusercontent.com/RiccardoRiggi/dashboard-covid-italia/master/screenshots/grafici-storici-nazionali.png)

---

## Bom / Diba

##### Database e recupero dei dati
* [MySQL]
* [Repository ufficiale Covid-19] della Presidenza del Consiglio dei Ministri - Dipartimento della Protezione Civile

##### Backend
* [Node.Js]
* [Express.Js]

##### Frontend
* [Angular] 9
* [AmCharts] 4
* [SBAdmin] 2
* [Bootstrap] 4
* [FontAwesome]

---

## Licenza

I dati sono messi a disposizione dal Dipartimento della Protezione Civile con licenza [CC-BY-4.0]. Il restante codice da me scritto con licenza [MIT]. Framework, temi e librerie di terze parti mantengono le loro relative licenze. 

[MySQL]: <https://www.mysql.com/it/>
[repository ufficiale Covid-19]: <https://github.com/pcm-dpc/COVID-19>
[Node.Js]: <https://nodejs.org/it/>
[Express.Js]: <https://expressjs.com/it/>
[Angular]: <https://angular.io/>
[AmCharts]: <https://www.amcharts.com/>
[SBAdmin]: <https://startbootstrap.com/themes/sb-admin-2/>
[Bootstrap]: <https://getbootstrap.com/>
[FontAwesome]: <https://fontawesome.com/>
[CC-BY-4.0]: <https://github.com/pcm-dpc/COVID-19/blob/master/LICENSE>
[MIT]: <https://github.com/RiccardoRiggi/dashboard-covid-italia/blob/master/LICENSE>