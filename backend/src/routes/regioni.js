import { Router } from 'express';

const router = Router();

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "dashboard-covid-italia"
});

router.get('/', (req, res) => {
    return res.send("Index API dei dati regionali");
});

router.get('/:codiceRegione/last', async (req, res) => {
    let sql = "SELECT a.data, a.stato, a.ricoverati_con_sintomi, a.ricoverati_con_sintomi - (SELECT ricoverati_con_sintomi from storico_regioni i WHERE codice_regione = "+req.params.codiceRegione+" AND i.data = subdate(a.data, 1) )  as differenza_ricoverati_con_sintomi , a.terapia_intensiva, a.ingressi_terapia_intensiva as differenza_terapia_intensiva , a.totale_ospedalizzati, a.totale_ospedalizzati - (SELECT totale_ospedalizzati from storico_regioni i WHERE codice_regione = "+req.params.codiceRegione+" AND i.data = subdate(a.data, 1) )  as differenza_totale_ospedalizzati , a.isolamento_domiciliare, a.isolamento_domiciliare - (SELECT isolamento_domiciliare from storico_regioni i WHERE codice_regione = "+req.params.codiceRegione+" AND i.data = subdate(a.data, 1) )  as differenza_isolamento_domiciliare, a.totale_positivi, a.totale_positivi - (SELECT totale_positivi from storico_regioni i WHERE codice_regione = "+req.params.codiceRegione+" AND i.data = subdate(a.data, 1) )  as differenza_totale_positivi , a.variazione_totale_positivi, a.variazione_totale_positivi - (SELECT variazione_totale_positivi from storico_regioni i WHERE codice_regione = "+req.params.codiceRegione+" AND i.data = subdate(a.data, 1) )  as differenza_variazione_totale_positivi , a.nuovi_positivi, a.nuovi_positivi - (SELECT nuovi_positivi from storico_regioni i WHERE codice_regione = "+req.params.codiceRegione+" AND i.data = subdate(a.data, 1) )  as differenza_nuovi_positivi , a.dimessi_guariti, a.dimessi_guariti - (SELECT dimessi_guariti from storico_regioni i WHERE codice_regione = "+req.params.codiceRegione+" AND i.data = subdate(a.data, 1) )  as differenza_dimessi_guariti , a.deceduti, a.deceduti - (SELECT deceduti from storico_regioni i WHERE codice_regione = "+req.params.codiceRegione+' AND i.data = subdate(a.data, 1) )  as differenza_deceduti , a.casi_da_sospetto_diagnostico, a.casi_da_sospetto_diagnostico - (SELECT casi_da_sospetto_diagnostico from storico_regioni i WHERE codice_regione = '+req.params.codiceRegione+' AND i.data = subdate(a.data, 1) )  as differenza_casi_da_sospetto_diagnostico , a.casi_da_screening, a.casi_da_screening - (SELECT casi_da_screening from storico_regioni i WHERE codice_regione = '+req.params.codiceRegione+' AND i.data = subdate(a.data, 1) )  as differenza_casi_da_screening , a.totale_casi, a.totale_casi - (SELECT totale_casi from storico_regioni i WHERE codice_regione = '+req.params.codiceRegione+' AND i.data = subdate(a.data, 1) )  as differenza_totale_casi , a.tamponi, a.tamponi - (SELECT tamponi from storico_regioni i WHERE codice_regione = '+req.params.codiceRegione+' AND i.data = subdate(a.data, 1) )  as differenza_tamponi , a.casi_testati, a.casi_testati - (SELECT casi_testati from storico_regioni i WHERE codice_regione = '+req.params.codiceRegione+' AND i.data = subdate(a.data, 1) )  as differenza_casi_testati , a.note FROM storico_regioni a WHERE codice_regione = '+req.params.codiceRegione+' AND 1 ORDER BY data DESC LIMIT 1';
    let query = con.query(sql, (err, results) => {
        try {
            if (err) throw err;
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
        } catch (error) {
            console.log(error);
            res.setHeader('Content-Type', 'application/json');
            res.status(500);
            res.send(JSON.stringify({ "status": 500, "error": error.sqlMessage, "response": "" }));
        }
    });
});

router.get('/nuoviPositiviPerRegione', async (req, res) => {
    let sql = "SELECT a.nuovi_positivi as valore, denominazione_regione as nome FROM storico_regioni a  WHERE a.data = (SELECT data from storico_regioni ORDER BY data DESC LIMIT 1)";
    let query = con.query(sql, (err, results) => {
        try {
            if (err) throw err;
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
        } catch (error) {
            console.log(error);
            res.setHeader('Content-Type', 'application/json');
            res.status(500);
            res.send(JSON.stringify({ "status": 500, "error": error.sqlMessage, "response": "" }));
        }
    });
});

router.get('/totaleDecedutiPerRegione', async (req, res) => {
    let sql = "SELECT a.deceduti as valore, denominazione_regione as nome FROM storico_regioni a  WHERE a.data = (SELECT data from storico_regioni ORDER BY data DESC LIMIT 1)";
    let query = con.query(sql, (err, results) => {
        try {
            if (err) throw err;
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
        } catch (error) {
            console.log(error);
            res.setHeader('Content-Type', 'application/json');
            res.status(500);
            res.send(JSON.stringify({ "status": 500, "error": error.sqlMessage, "response": "" }));
        }
    });
});

router.get('/totaleOspedalizzatiPerRegione', async (req, res) => {
    let sql = "SELECT a.totale_ospedalizzati as valore, denominazione_regione as nome FROM storico_regioni a  WHERE a.data = (SELECT data from storico_regioni ORDER BY data DESC LIMIT 1)";
    let query = con.query(sql, (err, results) => {
        try {
            if (err) throw err;
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
        } catch (error) {
            console.log(error);
            res.setHeader('Content-Type', 'application/json');
            res.status(500);
            res.send(JSON.stringify({ "status": 500, "error": error.sqlMessage, "response": "" }));
        }
    });
});

router.get('/:codiceRegione/storico-ricoverati-con-sintomi', (req, res) => {
    let sql = 'SELECT sto.ricoverati_con_sintomi as valoreTotale, IFNULL(sto.ricoverati_con_sintomi-(SELECT sn.ricoverati_con_sintomi FROM storico_regioni sn WHERE codice_regione = '+req.params.codiceRegione+' AND  sn.data = subdate(sto.data, 1)),0) as differenza, sto.data as giorno FROM storico_regioni sto WHERE codice_regione = '+req.params.codiceRegione+' ORDER BY sto.data';
    let query = con.query(sql, (err, results) => {
        try {
            if (err) throw err;
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(JSON.stringify({ "status": 200, "error": null, "isDaUsareDifferenza": false, "response": results }));
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            res.status(500);
            res.send(JSON.stringify({ "status": 500, "error": error.sqlMessage, "response": "" }));
        }
    });
});

router.get('/:codiceRegione/storico-terapia-intensiva', (req, res) => {
    let sql = 'SELECT sto.terapia_intensiva as valoreTotale, IFNULL(sto.terapia_intensiva-(SELECT sn.terapia_intensiva FROM storico_regioni sn WHERE codice_regione = '+req.params.codiceRegione+' AND sn.data = subdate(sto.data, 1)),0) as differenza, sto.data as giorno FROM storico_regioni  sto WHERE codice_regione = '+req.params.codiceRegione+' ORDER BY sto.data';
    let query = con.query(sql, (err, results) => {
        try {
            if (err) throw err;
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(JSON.stringify({ "status": 200, "error": null, "isDaUsareDifferenza": false, "response": results }));
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            res.status(500);
            res.send(JSON.stringify({ "status": 500, "error": error.sqlMessage, "response": "" }));
        }
    });
});

router.get('/:codiceRegione/storico-totale-ospedalizzati', (req, res) => {
    let sql = 'SELECT sto.totale_ospedalizzati as valoreTotale, IFNULL(sto.totale_ospedalizzati-(SELECT sn.totale_ospedalizzati FROM storico_regioni sn WHERE codice_regione = '+req.params.codiceRegione+' AND sn.data = subdate(sto.data, 1)),0) as differenza, sto.data as giorno FROM storico_regioni sto WHERE codice_regione = '+req.params.codiceRegione+' ORDER BY sto.data';
    let query = con.query(sql, (err, results) => {
        try {
            if (err) throw err;
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(JSON.stringify({ "status": 200, "error": null, "isDaUsareDifferenza": false, "response": results }));
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            res.status(500);
            res.send(JSON.stringify({ "status": 500, "error": error.sqlMessage, "response": "" }));
        }
    });
});

router.get('/:codiceRegione/storico-isolamento-domiciliare', (req, res) => {
    let sql = 'SELECT sto.isolamento_domiciliare as valoreTotale, IFNULL(sto.isolamento_domiciliare-(SELECT sn.isolamento_domiciliare FROM storico_regioni sn WHERE codice_regione = '+req.params.codiceRegione+' AND sn.data = subdate(sto.data, 1)),0) as differenza, sto.data as giorno FROM storico_regioni sto WHERE codice_regione = '+req.params.codiceRegione+' ORDER BY sto.data';
    let query = con.query(sql, (err, results) => {
        try {
            if (err) throw err;
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(JSON.stringify({ "status": 200, "error": null, "isDaUsareDifferenza": false, "response": results }));
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            res.status(500);
            res.send(JSON.stringify({ "status": 500, "error": error.sqlMessage, "response": "" }));
        }
    });
});

router.get('/:codiceRegione/storico-totale-positivi', (req, res) => {
    let sql = 'SELECT sto.totale_positivi as valoreTotale, IFNULL(sto.totale_positivi-(SELECT sn.totale_positivi FROM storico_regioni sn WHERE codice_regione = '+req.params.codiceRegione+' AND sn.data = subdate(sto.data, 1)),0) as differenza, sto.data as giorno FROM storico_regioni sto WHERE codice_regione = '+req.params.codiceRegione+' ORDER BY sto.data';
    let query = con.query(sql, (err, results) => {
        try {
            if (err) throw err;
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(JSON.stringify({ "status": 200, "error": null, "isDaUsareDifferenza": false, "response": results }));
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            res.status(500);
            res.send(JSON.stringify({ "status": 500, "error": error.sqlMessage, "response": "" }));
        }
    });
});

router.get('/:codiceRegione/storico-variazione-totale-positivi', (req, res) => {
    let sql = 'SELECT sto.variazione_totale_positivi as valoreTotale, IFNULL(sto.variazione_totale_positivi-(SELECT sn.variazione_totale_positivi FROM storico_regioni sn WHERE codice_regione = '+req.params.codiceRegione+' AND sn.data = subdate(sto.data, 1)),0) as differenza, sto.data as giorno FROM storico_regioni sto WHERE codice_regione = '+req.params.codiceRegione+' ORDER BY sto.data';
    let query = con.query(sql, (err, results) => {
        try {
            if (err) throw err;
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(JSON.stringify({ "status": 200, "error": null, "isDaUsareDifferenza": false, "response": results }));
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            res.status(500);
            res.send(JSON.stringify({ "status": 500, "error": error.sqlMessage, "response": "" }));
        }
    });
});

router.get('/:codiceRegione/storico-nuovi-positivi', (req, res) => {
    let sql = 'SELECT sto.nuovi_positivi as valoreTotale, IFNULL(sto.nuovi_positivi-(SELECT sn.nuovi_positivi FROM storico_regioni sn WHERE codice_regione = '+req.params.codiceRegione+' AND sn.data = subdate(sto.data, 1)),0) as differenza, sto.data as giorno FROM storico_regioni sto WHERE codice_regione = '+req.params.codiceRegione+' ORDER BY sto.data';
    let query = con.query(sql, (err, results) => {
        try {
            if (err) throw err;
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(JSON.stringify({ "status": 200, "error": null, "isDaUsareDifferenza": false, "response": results }));
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            res.status(500);
            res.send(JSON.stringify({ "status": 500, "error": error.sqlMessage, "response": "" }));
        }
    });
});

router.get('/:codiceRegione/storico-dimessi-guariti', (req, res) => {
    let sql = 'SELECT sto.dimessi_guariti as valoreTotale, IFNULL(sto.dimessi_guariti-(SELECT sn.dimessi_guariti FROM storico_regioni sn WHERE codice_regione = '+req.params.codiceRegione+' AND sn.data = subdate(sto.data, 1)),0) as differenza, sto.data as giorno FROM storico_regioni sto WHERE codice_regione = '+req.params.codiceRegione+' ORDER BY sto.data';
    let query = con.query(sql, (err, results) => {
        try {
            if (err) throw err;
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(JSON.stringify({ "status": 200, "error": null, "isDaUsareDifferenza": true, "response": results }));
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            res.status(500);
            res.send(JSON.stringify({ "status": 500, "error": error.sqlMessage, "response": "" }));
        }
    });
});

router.get('/:codiceRegione/storico-deceduti', (req, res) => {
    let sql = 'SELECT sto.deceduti as valoreTotale, IFNULL(sto.deceduti-(SELECT sn.deceduti FROM storico_regioni sn WHERE codice_regione = '+req.params.codiceRegione+' AND sn.data = subdate(sto.data, 1)),0) as differenza, sto.data as giorno FROM storico_regioni sto WHERE codice_regione = '+req.params.codiceRegione+' ORDER BY sto.data';
    let query = con.query(sql, (err, results) => {
        try {
            if (err) throw err;
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(JSON.stringify({ "status": 200, "error": null, "isDaUsareDifferenza": true, "response": results }));
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            res.status(500);
            res.send(JSON.stringify({ "status": 500, "error": error.sqlMessage, "response": "" }));
        }
    });
});

router.get('/:codiceRegione/storico-casi-da-sospetto-diagnostico', (req, res) => {
    let sql = 'SELECT sto.casi_da_sospetto_diagnostico as valoreTotale, IFNULL(sto.casi_da_sospetto_diagnostico-(SELECT sn.casi_da_sospetto_diagnostico FROM storico_regioni sn WHERE codice_regione = '+req.params.codiceRegione+' AND sn.data = subdate(sto.data, 1)),0) as differenza, sto.data as giorno FROM storico_regioni sto WHERE codice_regione = '+req.params.codiceRegione+' ORDER BY sto.data';
    let query = con.query(sql, (err, results) => {
        try {
            if (err) throw err;
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(JSON.stringify({ "status": 200, "error": null, "isDaUsareDifferenza": true, "response": results }));
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            res.status(500);
            res.send(JSON.stringify({ "status": 500, "error": error.sqlMessage, "response": "" }));
        }
    });
});

router.get('/:codiceRegione/storico-casi-da-screening', (req, res) => {
    let sql = 'SELECT sto.casi_da_screening as valoreTotale, IFNULL(sto.casi_da_screening-(SELECT sn.casi_da_screening FROM storico_regioni sn WHERE codice_regione = '+req.params.codiceRegione+' AND sn.data = subdate(sto.data, 1)),0) as differenza, sto.data as giorno FROM storico_regioni sto WHERE codice_regione = '+req.params.codiceRegione+' ORDER BY sto.data';
    let query = con.query(sql, (err, results) => {
        try {
            if (err) throw err;
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(JSON.stringify({ "status": 200, "error": null, "isDaUsareDifferenza": true, "response": results }));
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            res.status(500);
            res.send(JSON.stringify({ "status": 500, "error": error.sqlMessage, "response": "" }));
        }
    });
});

router.get('/:codiceRegione/storico-totale-casi', (req, res) => {
    let sql = 'SELECT sto.totale_casi as valoreTotale, IFNULL(sto.totale_casi-(SELECT sn.totale_casi FROM storico_regioni sn WHERE codice_regione = '+req.params.codiceRegione+' AND sn.data = subdate(sto.data, 1)),0) as differenza, sto.data as giorno FROM storico_regioni sto WHERE codice_regione = '+req.params.codiceRegione+' ORDER BY sto.data';
    let query = con.query(sql, (err, results) => {
        try {
            if (err) throw err;
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(JSON.stringify({ "status": 200, "error": null, "isDaUsareDifferenza": true, "response": results }));
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            res.status(500);
            res.send(JSON.stringify({ "status": 500, "error": error.sqlMessage, "response": "" }));
        }
    });
});

router.get('/:codiceRegione/storico-tamponi', (req, res) => {
    let sql = 'SELECT sto.tamponi as valoreTotale, IFNULL(sto.tamponi-(SELECT sn.tamponi FROM storico_regioni sn WHERE codice_regione = '+req.params.codiceRegione+' AND sn.data = subdate(sto.data, 1)),0) as differenza, sto.data as giorno FROM storico_regioni sto WHERE codice_regione = '+req.params.codiceRegione+' ORDER BY sto.data';
    let query = con.query(sql, (err, results) => {
        try {
            if (err) throw err;
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(JSON.stringify({ "status": 200, "error": null, "isDaUsareDifferenza": true, "response": results }));
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            res.status(500);
            res.send(JSON.stringify({ "status": 500, "error": error.sqlMessage, "response": "" }));
        }
    });
});

router.get('/:codiceRegione/storico-rapporto-tamponi-positivi', (req, res) => {
    let sql = 'SELECT sto.tamponi as valoreTotale, ROUND(nuovi_positivi * 100 / IFNULL(sto.tamponi-(SELECT sn.tamponi FROM storico_regioni sn WHERE codice_regione = '+req.params.codiceRegione+' AND sn.data = subdate(sto.data, 1)),0),1) as differenza, sto.data as giorno FROM storico_regioni sto WHERE codice_regione = '+req.params.codiceRegione+' ORDER BY sto.data';
    let query = con.query(sql, (err, results) => {
        try {
            if (err) throw err;
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(JSON.stringify({ "status": 200, "error": null, "isDaUsareDifferenza": true, "response": results }));
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            res.status(500);
            res.send(JSON.stringify({ "status": 500, "error": error.sqlMessage, "response": "" }));
        }
    });
});

router.get('/:codiceRegione/storico-casi-testati', (req, res) => {
    let sql = 'SELECT sto.casi_testati as valoreTotale, IFNULL(sto.casi_testati-(SELECT sn.casi_testati FROM storico_regioni sn WHERE codice_regione = '+req.params.codiceRegione+' AND sn.data = subdate(sto.data, 1)),0) as differenza, sto.data as giorno FROM storico_regioni sto WHERE codice_regione = '+req.params.codiceRegione+' ORDER BY sto.data';
    let query = con.query(sql, (err, results) => {
        try {
            if (err) throw err;
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(JSON.stringify({ "status": 200, "error": null, "isDaUsareDifferenza": true, "response": results }));
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            res.status(500);
            res.send(JSON.stringify({ "status": 500, "error": error.sqlMessage, "response": "" }));
        }
    });
});

router.get('/:codiceRegione/dettaglio/:giorno', (req, res) => {
    let sql = 'SELECT a.data, a.stato, a.ricoverati_con_sintomi, a.ricoverati_con_sintomi - (SELECT ricoverati_con_sintomi from storico_regioni i WHERE codice_regione = '+req.params.codiceRegione+' AND i.data = subdate(a.data, 1) )  as differenza_ricoverati_con_sintomi , a.terapia_intensiva, a.terapia_intensiva - (SELECT terapia_intensiva from storico_regioni i WHERE codice_regione = '+req.params.codiceRegione+' AND i.data = subdate(a.data, 1) )  as differenza_terapia_intensiva , a.ingressi_terapia_intensiva as ingressi_terapia_intensiva, a.totale_ospedalizzati, a.totale_ospedalizzati - (SELECT totale_ospedalizzati from storico_regioni i WHERE codice_regione = '+req.params.codiceRegione+' AND i.data = subdate(a.data, 1) )  as differenza_totale_ospedalizzati , a.isolamento_domiciliare, a.isolamento_domiciliare - (SELECT isolamento_domiciliare from storico_regioni i WHERE codice_regione = '+req.params.codiceRegione+' AND i.data = subdate(a.data, 1) )  as differenza_isolamento_domiciliare, a.totale_positivi, a.totale_positivi - (SELECT totale_positivi from storico_regioni i WHERE codice_regione = '+req.params.codiceRegione+' AND i.data = subdate(a.data, 1) )  as differenza_totale_positivi , a.variazione_totale_positivi, a.variazione_totale_positivi - (SELECT variazione_totale_positivi from storico_regioni i WHERE codice_regione = '+req.params.codiceRegione+' AND i.data = subdate(a.data, 1) )  as differenza_variazione_totale_positivi , a.nuovi_positivi, a.nuovi_positivi - (SELECT nuovi_positivi from storico_regioni i WHERE codice_regione = '+req.params.codiceRegione+' AND i.data = subdate(a.data, 1) )  as differenza_nuovi_positivi , a.dimessi_guariti, a.dimessi_guariti - (SELECT dimessi_guariti from storico_regioni i WHERE codice_regione = '+req.params.codiceRegione+' AND i.data = subdate(a.data, 1) )  as differenza_dimessi_guariti , a.deceduti, a.deceduti - (SELECT deceduti from storico_regioni i WHERE codice_regione = '+req.params.codiceRegione+' AND i.data = subdate(a.data, 1) )  as differenza_deceduti , a.casi_da_sospetto_diagnostico, a.casi_da_sospetto_diagnostico - (SELECT casi_da_sospetto_diagnostico from storico_regioni i WHERE codice_regione = '+req.params.codiceRegione+' AND i.data = subdate(a.data, 1) )  as differenza_casi_da_sospetto_diagnostico , a.casi_da_screening, a.casi_da_screening - (SELECT casi_da_screening from storico_regioni i WHERE codice_regione = '+req.params.codiceRegione+' AND i.data = subdate(a.data, 1) )  as differenza_casi_da_screening , a.totale_casi, a.totale_casi - (SELECT totale_casi from storico_regioni i WHERE codice_regione = '+req.params.codiceRegione+' AND i.data = subdate(a.data, 1) )  as differenza_totale_casi , a.tamponi, a.tamponi - (SELECT tamponi from storico_regioni i WHERE codice_regione = '+req.params.codiceRegione+' AND i.data = subdate(a.data, 1) )  as differenza_tamponi , a.casi_testati, a.casi_testati - (SELECT casi_testati from storico_regioni i WHERE codice_regione = '+req.params.codiceRegione+' AND i.data = subdate(a.data, 1) )  as differenza_casi_testati , a.note FROM storico_regioni a WHERE codice_regione = '+req.params.codiceRegione+' AND DATE_FORMAT(data, \"%Y-%m-%d\") = \"'+req.params.giorno+'\"';
    console.log(sql);
    let query = con.query(sql, (err, results) => {
        try {
            if (err) throw err;
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
        } catch (error) {
            console.log(error);
            res.setHeader('Content-Type', 'application/json');
            res.status(500);
            res.send(JSON.stringify({ "status": 500, "error": error.sqlMessage, "response": "" }));
        }
    });
});

router.get('/:codiceRegione/dettaglioStorico', (req, res) => {
    let sql = 'SELECT a.data, DATE_FORMAT(data, \"%d/%m/%Y\") as dataFormattata, a.data, a.stato, a.ricoverati_con_sintomi, a.ricoverati_con_sintomi - (SELECT ricoverati_con_sintomi from storico_regioni i WHERE codice_regione = '+req.params.codiceRegione+' AND i.data = subdate(a.data, 1) )  as differenza_ricoverati_con_sintomi , a.terapia_intensiva, a.terapia_intensiva - (SELECT terapia_intensiva from storico_regioni i WHERE codice_regione = '+req.params.codiceRegione+' AND i.data = subdate(a.data, 1) )  as differenza_terapia_intensiva , a.ingressi_terapia_intensiva as ingressi_terapia_intensiva , a.totale_ospedalizzati, a.totale_ospedalizzati - (SELECT totale_ospedalizzati from storico_regioni i WHERE codice_regione = '+req.params.codiceRegione+' AND i.data = subdate(a.data, 1) )  as differenza_totale_ospedalizzati , a.isolamento_domiciliare, a.isolamento_domiciliare - (SELECT isolamento_domiciliare from storico_regioni i WHERE codice_regione = '+req.params.codiceRegione+' AND i.data = subdate(a.data, 1) )  as differenza_isolamento_domiciliare, a.totale_positivi, a.totale_positivi - (SELECT totale_positivi from storico_regioni i WHERE codice_regione = '+req.params.codiceRegione+' AND i.data = subdate(a.data, 1) )  as differenza_totale_positivi , a.variazione_totale_positivi, a.variazione_totale_positivi - (SELECT variazione_totale_positivi from storico_regioni i WHERE codice_regione = '+req.params.codiceRegione+' AND i.data = subdate(a.data, 1) )  as differenza_variazione_totale_positivi , a.nuovi_positivi, a.nuovi_positivi - (SELECT nuovi_positivi from storico_regioni i WHERE codice_regione = '+req.params.codiceRegione+' AND i.data = subdate(a.data, 1) )  as differenza_nuovi_positivi , a.dimessi_guariti, a.dimessi_guariti - (SELECT dimessi_guariti from storico_regioni i WHERE codice_regione = '+req.params.codiceRegione+' AND i.data = subdate(a.data, 1) )  as differenza_dimessi_guariti , a.deceduti, a.deceduti - (SELECT deceduti from storico_regioni i WHERE codice_regione = '+req.params.codiceRegione+' AND i.data = subdate(a.data, 1) )  as differenza_deceduti , a.casi_da_sospetto_diagnostico, a.casi_da_sospetto_diagnostico - (SELECT casi_da_sospetto_diagnostico from storico_regioni i WHERE codice_regione = '+req.params.codiceRegione+' AND i.data = subdate(a.data, 1) )  as differenza_casi_da_sospetto_diagnostico , a.casi_da_screening, a.casi_da_screening - (SELECT casi_da_screening from storico_regioni i WHERE codice_regione = '+req.params.codiceRegione+' AND i.data = subdate(a.data, 1) )  as differenza_casi_da_screening , a.totale_casi, a.totale_casi - (SELECT totale_casi from storico_regioni i WHERE codice_regione = '+req.params.codiceRegione+' AND i.data = subdate(a.data, 1) )  as differenza_totale_casi , a.tamponi, a.tamponi - (SELECT tamponi from storico_regioni i WHERE codice_regione = '+req.params.codiceRegione+' AND i.data = subdate(a.data, 1) )  as differenza_tamponi , a.casi_testati, a.casi_testati - (SELECT casi_testati from storico_regioni i WHERE codice_regione = '+req.params.codiceRegione+' AND i.data = subdate(a.data, 1) )  as differenza_casi_testati , a.note FROM storico_regioni a WHERE codice_regione = '+req.params.codiceRegione+' ORDER BY data DESC';
    console.log(sql);
    let query = con.query(sql, (err, results) => {
        try {
            if (err) throw err;
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
        } catch (error) {
            console.log(error);
            res.setHeader('Content-Type', 'application/json');
            res.status(500);
            res.send(JSON.stringify({ "status": 500, "error": error.sqlMessage, "response": "" }));
        }
    });
});

export default router;