import { Router } from 'express';
import con from '../db';

const router = Router();

router.get('/', (req, res) => {
    return res.send("Index API dei dati del menu");
});

router.get('/elencoRegioni', (req, res) => {
    let sql = 'SELECT codice_regione, denominazione_regione, popolazione FROM regioni WHERE 1 ORDER BY denominazione_regione';
    con.query(sql, (err, results) => {
        try {
            if (err) throw err;
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            res.status(500);
            res.send(JSON.stringify({ "status": 500, "error": error.sqlMessage, "response": "" }));
        }
    });
});

router.get('/elencoRegioni/:codiceRegione', (req, res) => {
    let sql = 'SELECT codice_regione, denominazione_regione, popolazione FROM regioni WHERE 1 AND codice_regione = ' + req.params.codiceRegione;
    con.query(sql, (err, results) => {
        try {
            if (err) throw err;
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            res.status(500);
            res.send(JSON.stringify({ "status": 500, "error": error.sqlMessage, "response": "" }));
        }
    });
});

router.get('/elencoProvince/:codiceRegione', (req, res) => {
    let sql = 'SELECT codice_provincia, denominazione_provincia, sigla_provincia FROM province WHERE 1 AND codice_regione = ' + req.params.codiceRegione;
    con.query(sql, (err, results) => {
        try {
            if (err) throw err;
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            res.status(500);
            res.send(JSON.stringify({ "status": 500, "error": error.sqlMessage, "response": "" }));
        }
    });
});

router.get('/elencoProvince/:codiceRegione/:codiceProvincia', (req, res) => {
    let sql = 'SELECT codice_provincia, denominazione_provincia, sigla_provincia FROM province WHERE 1 AND codice_regione = ' + req.params.codiceRegione + ' AND codice_provincia = ' + req.params.codiceProvincia;
    con.query(sql, (err, results) => {
        try {
            if (err) throw err;
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            res.status(500);
            res.send(JSON.stringify({ "status": 500, "error": error.sqlMessage, "response": "" }));
        }
    });
});

router.get('/elencoProvince', (req, res) => {
    let sql = 'SELECT codice_provincia, province.codice_regione, denominazione_provincia, sigla_provincia, denominazione_regione FROM province INNER JOIN regioni ON province.codice_regione = regioni.codice_regione WHERE 1 ORDER BY denominazione_regione, denominazione_provincia';
    con.query(sql, (err, results) => {
        try {
            if (err) throw err;
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            res.status(500);
            res.send(JSON.stringify({ "status": 500, "error": error.sqlMessage, "response": "" }));
        }
    });
});

router.get('/elencoVociMenuPadre', (req, res) => {
    let sql = 'SELECT codice_voce, nome, slug, icona, codice_padre FROM `menu` WHERE 1 AND codice_padre = 0';
    con.query(sql, (err, results) => {
        try {
            if (err) throw err;
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            res.status(500);
            res.send(JSON.stringify({ "status": 500, "error": error.sqlMessage, "response": "" }));
        }
    });
});

router.get('/elencoVociMenu', (req, res) => {
    let sql = 'SELECT codice_voce, nome, slug, icona, codice_padre FROM `menu` WHERE 1 ORDER BY  codice_padre, codice_voce';
    con.query(sql, (err, results) => {
        try {
            if (err) throw err;
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            res.status(500);
            res.send(JSON.stringify({ "status": 500, "error": error.sqlMessage, "response": "" }));
        }
    });
});

router.get('/elencoVociMenuFiglie/:codicePadre', (req, res) => {
    let sql = 'SELECT codice_voce, nome, slug, icona, codice_padre FROM `menu` WHERE 1 AND codice_padre =' + req.params.codicePadre;
    con.query(sql, (err, results) => {
        try {
            if (err) throw err;
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            res.status(500);
            res.send(JSON.stringify({ "status": 500, "error": error.sqlMessage, "response": "" }));
        }
    });
});

router.get('/elencoVociMenuFiglie', (req, res) => {
    let sql = 'SELECT codice_voce, nome, slug, icona, codice_padre FROM `menu` WHERE 1 AND codice_padre != 0 ORDER BY codice_padre';
    con.query(sql, (err, results) => {
        try {
            if (err) throw err;
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            res.status(500);
            res.send(JSON.stringify({ "status": 500, "error": error.sqlMessage, "response": "" }));
        }
    });
});

export default router;