import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/sincronizza-base-dati', routes.sincronizzaBaseDati);
app.use('/nazione', routes.nazione);
app.use('/regioni', routes.regioni);
app.use('/province', routes.province);
app.use('/menu', routes.menu);

app.listen(process.env.PORT, () =>
  console.log(`Dashboard-covid-italia backend in esecuzione sulla porta ${process.env.PORT}!`),
);
