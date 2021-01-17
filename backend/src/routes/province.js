import { Router } from 'express';
import con from '../db';

const router = Router();

router.get('/', (req, res) => {
    return res.send("Index API dei dati provinciali");
});

router.get('/:codiceRegione/:codiceProvincia/last', async (req, res) => {
    let sql = "SELECT a.data, a.stato, a.totale_casi, a.totale_casi - (SELECT totale_casi from storico_province i WHERE codice_regione = a.codice_regione AND codice_provincia = " + req.params.codiceProvincia + " AND i.data = subdate(a.data, 1) )  as differenza_totale_casi , a.note FROM storico_province a WHERE codice_regione = a.codice_regione AND codice_provincia = " + req.params.codiceProvincia + " AND 1 ORDER BY data DESC LIMIT 1";
    con.query(sql, (err, results) => {
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

router.get('/storico-totale-casi', (req, res) => {
    let sql = 'SELECT sto.denominazione_regione, sto.denominazione_provincia, sto.totale_casi as valoreTotale, IFNULL(sto.totale_casi-(SELECT sn.totale_casi FROM storico_province sn WHERE codice_regione = sto.codice_regione  AND codice_provincia = sto.codice_provincia AND sn.data = subdate(sto.data, 1)),0) as differenza, sto.data as giorno FROM storico_province sto WHERE data = (SELECT data FROM storico_province ORDER BY data DESC LIMIT 1) ORDER BY denominazione_regione, denominazione_provincia';
    con.query(sql, (err, results) => {
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

router.get('/:codiceRegione/:codiceProvincia/storico-totale-casi', (req, res) => {
    let sql = 'SELECT sto.totale_casi as valoreTotale, IFNULL(sto.totale_casi-(SELECT sn.totale_casi FROM storico_province sn WHERE codice_regione = ' + req.params.codiceRegione + '  AND codice_provincia = ' + req.params.codiceProvincia + ' AND sn.data = subdate(sto.data, 1)),0) as differenza, sto.data as giorno FROM storico_province sto WHERE codice_regione = ' + req.params.codiceRegione + '  AND codice_provincia = ' + req.params.codiceProvincia + ' ORDER BY sto.data';
    con.query(sql, (err, results) => {
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

router.get('/:codiceRegione/:codiceProvincia/dettaglio/:giorno', (req, res) => {
    let sql = 'SELECT a.data, a.stato, a.totale_casi, a.totale_casi - (SELECT totale_casi from storico_province i WHERE codice_regione = ' + req.params.codiceRegione + ' AND codice_provincia = ' + req.params.codiceProvincia + ' AND i.data = subdate(a.data, 1) )  as differenza_totale_casi , a.note FROM storico_province a WHERE codice_regione = ' + req.params.codiceRegione + ' AND codice_provincia = ' + req.params.codiceProvincia + ' AND 1 AND DATE_FORMAT(data, \"%Y-%m-%d\") = \"' + req.params.giorno + '\"';
    console.log(sql);
    con.query(sql, (err, results) => {
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

router.get('/:codiceRegione/:codiceProvincia/dettaglioStorico', (req, res) => {
    let sql = 'SELECT a.data, DATE_FORMAT(data, \"%d/%m/%Y\") as dataFormattata, a.stato, a.totale_casi, a.totale_casi - (SELECT totale_casi from storico_province i WHERE codice_regione = ' + req.params.codiceRegione + ' AND codice_provincia = ' + req.params.codiceProvincia + ' AND i.data = subdate(a.data, 1) )  as differenza_totale_casi , a.note FROM storico_province a WHERE codice_regione = ' + req.params.codiceRegione + ' AND codice_provincia = ' + req.params.codiceProvincia + ' AND 1 ORDER BY data DESC';
    console.log(sql);
    con.query(sql, (err, results) => {
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