import { Router } from 'express';

var sincronizza = require('../sincronizzazione/sincronizza-base-dati-business');

const router = Router();

router.get('/', (req, res) => {
    return res.send("Index della funzione di sincronizzazione del database");
});

router.get('/nazione', (req, res) => {
    try {
        sincronizza.sincronizzaDatiNazionali();
        return res.send("Sincronizza DB per i dati nazionali");
    } catch (error) {
        return res.send("Errore");
    }
});

router.get('/regioni', (req, res) => {
    try {
        sincronizza.sincronizzaDatiRegionali();
        return res.send("Sincronizza DB per i dati regionali");
    } catch (error) {
        return res.send("Errore");
    }
});

router.get('/province', (req, res) => {
    try {
        sincronizza.sincronizzaDatiProvinciali();
        return res.send("Sincronizza DB per i dati provinciali");
    } catch (error) {
        return res.send("Errore");
    }
    
});

export default router;