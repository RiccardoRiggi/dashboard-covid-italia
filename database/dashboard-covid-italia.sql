-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Ott 27, 2020 alle 23:03
-- Versione del server: 10.1.37-MariaDB
-- Versione PHP: 7.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dashboard-covid-italia`
--
CREATE DATABASE IF NOT EXISTS `dashboard-covid-italia` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `dashboard-covid-italia`;

-- --------------------------------------------------------

--
-- Struttura della tabella `menu`
--

CREATE TABLE `menu` (
  `codice_voce` int(10) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `icona` varchar(255) NOT NULL,
  `codice_padre` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `menu`
--

INSERT INTO `menu` (`codice_voce`, `nome`, `slug`, `icona`, `codice_padre`) VALUES
(1, 'Homepage', 'home', 'fas fa-home', 0),
(2, 'Dati nazionali', 'datiNazionali', 'far fa-chart-bar', 0),
(4, 'Giorno specifico', 'giorno-specifico-nazione', '', 2),
(5, 'Storico', 'storico-nazionale', '', 2),
(6, 'Dati regionali', 'dati-regionali', '', 0),
(7, 'Giorno specifico', 'giorno-specifico-regione', '', 6),
(8, 'Storico', 'storico-regionale', '', 6),
(9, 'Dati provinciali', 'dati-provinciali', '', 0),
(10, 'Giorno specifico', 'giorno-specifico-provincia', '', 9),
(11, 'Storico', 'storico-provincia', '', 9),
(12, 'Crediti', 'crediti', '', 0);

-- --------------------------------------------------------

--
-- Struttura della tabella `province`
--

CREATE TABLE `province` (
  `codice_regione` int(3) NOT NULL,
  `codice_provincia` int(3) NOT NULL,
  `denominazione_provincia` varchar(255) DEFAULT NULL,
  `sigla_provincia` varchar(2) DEFAULT NULL,
  `lat` double DEFAULT NULL,
  `long` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `province`
--

INSERT INTO `province` (`codice_regione`, `codice_provincia`, `denominazione_provincia`, `sigla_provincia`, `lat`, `long`) VALUES
(1, 1, 'Torino', 'TO', 45.0732745, 7.680687483),
(1, 2, 'Vercelli', 'VC', 45.32398135, 8.423234312),
(1, 3, 'Novara', 'NO', 45.44588506, 8.621915884),
(1, 4, 'Cuneo', 'CN', 44.39329625, 7.551171632),
(1, 5, 'Asti', 'AT', 44.89912921, 8.204142547),
(1, 6, 'Alessandria', 'AL', 44.91297351, 8.615401155),
(1, 96, 'Biella', 'BI', 45.5665112, 8.054082167),
(1, 103, 'Verbano-Cusio-Ossola', 'VB', 45.9214455, 8.551078753),
(1, 891, 'Fuori Regione / Provincia Autonoma', 'nu', NULL, NULL),
(1, 991, 'In fase di definizione/aggiornamento', 'nu', NULL, NULL),
(2, 7, 'Aosta', 'AO', 45.73750286, 7.320149366),
(2, 898, 'Fuori Regione / Provincia Autonoma', 'nu', NULL, NULL),
(2, 998, 'In fase di definizione/aggiornamento', 'nu', NULL, NULL),
(3, 12, 'Varese', 'VA', 45.81701677, 8.822868344),
(3, 13, 'Como', 'CO', 45.8099912, 9.085159546),
(3, 14, 'Sondrio', 'SO', 46.17099261, 9.87147489),
(3, 15, 'Milano', 'MI', 45.46679409, 9.190347404),
(3, 16, 'Bergamo', 'BG', 45.69441368, 9.668424528),
(3, 17, 'Brescia', 'BS', 45.53993052, 10.21910323),
(3, 18, 'Pavia', 'PV', 45.18509264, 9.160157191),
(3, 19, 'Cremona', 'CR', 45.13336675, 10.02420865),
(3, 20, 'Mantova', 'MN', 45.15726772, 10.79277363),
(3, 97, 'Lecco', 'LC', 45.85575781, 9.393392246),
(3, 98, 'Lodi', 'LO', 45.31440693, 9.503720769),
(3, 108, 'Monza e della Brianza', 'MB', 45.58439043, 9.273582472),
(3, 888, 'Fuori Regione / Provincia Autonoma', 'nu', NULL, NULL),
(3, 988, 'In fase di definizione/aggiornamento', 'nu', NULL, NULL),
(4, 21, 'Bolzano', 'BZ', 46.49933453, 11.35662422),
(4, 22, 'Trento', 'TN', 46.06893511, 11.12123097),
(4, 881, 'Fuori Regione / Provincia Autonoma', 'nu', NULL, NULL),
(4, 896, 'Fuori Regione / Provincia Autonoma', 'nu', NULL, NULL),
(4, 981, 'In fase di definizione/aggiornamento', 'nu', NULL, NULL),
(4, 996, 'In fase di definizione/aggiornamento', 'nu', NULL, NULL),
(5, 23, 'Verona', 'VR', 45.43839046, 10.99352685),
(5, 24, 'Vicenza', 'VI', 45.547497, 11.54597109),
(5, 25, 'Belluno', 'BL', 46.13837528, 12.21704167),
(5, 26, 'Treviso', 'TV', 45.66754571, 12.24507363),
(5, 27, 'Venezia', 'VE', 45.43490485, 12.33845213),
(5, 28, 'Padova', 'PD', 45.40692987, 11.87608718),
(5, 29, 'Rovigo', 'RO', 45.07107289, 11.79007),
(5, 899, 'Fuori Regione / Provincia Autonoma', 'nu', NULL, NULL),
(5, 999, 'In fase di definizione/aggiornamento', 'nu', NULL, NULL),
(6, 30, 'Udine', 'UD', 46.06255516, 13.2348383),
(6, 31, 'Gorizia', 'GO', 45.94149817, 13.62212502),
(6, 32, 'Trieste', 'TS', 45.6494354, 13.76813649),
(6, 93, 'Pordenone', 'PN', 45.95443546, 12.66002909),
(6, 885, 'Fuori Regione / Provincia Autonoma', 'nu', NULL, NULL),
(6, 985, 'In fase di definizione/aggiornamento', 'nu', NULL, NULL),
(7, 8, 'Imperia', 'IM', 43.88570648, 8.027850298),
(7, 9, 'Savona', 'SV', 44.30750461, 8.481108654),
(7, 10, 'Genova', 'GE', 44.41149314, 8.9326992),
(7, 11, 'La Spezia', 'SP', 44.10704991, 9.8281897),
(7, 887, 'Fuori Regione / Provincia Autonoma', 'nu', NULL, NULL),
(7, 987, 'In fase di definizione/aggiornamento', 'nu', NULL, NULL),
(8, 33, 'Piacenza', 'PC', 45.05193462, 9.692632596),
(8, 34, 'Parma', 'PR', 44.80107394, 10.32834985),
(8, 35, 'Reggio nell\'Emilia', 'RE', 44.69735289, 10.63007973),
(8, 36, 'Modena', 'MO', 44.64600009, 10.92615487),
(8, 37, 'Bologna', 'BO', 44.49436681, 11.3417208),
(8, 38, 'Ferrara', 'FE', 44.83599085, 11.61868934),
(8, 39, 'Ravenna', 'RA', 44.41722493, 12.19913936),
(8, 40, 'Forlì-Cesena', 'FC', 44.22268559, 12.04068608),
(8, 99, 'Rimini', 'RN', 44.06090087, 12.5656295),
(8, 884, 'Fuori Regione / Provincia Autonoma', 'nu', NULL, NULL),
(8, 984, 'In fase di definizione/aggiornamento', 'nu', NULL, NULL),
(9, 45, 'Massa Carrara', 'MS', 44.03674425, 10.14173829),
(9, 46, 'Lucca', 'LU', 43.84432283, 10.50151366),
(9, 47, 'Pistoia', 'PT', 43.933465, 10.91734146),
(9, 48, 'Firenze', 'FI', 43.76923077, 11.25588885),
(9, 49, 'Livorno', 'LI', 43.55234873, 10.3086781),
(9, 50, 'Pisa', 'PI', 43.71553206, 10.40127259),
(9, 51, 'Arezzo', 'AR', 43.46642752, 11.88228844),
(9, 52, 'Siena', 'SI', 43.31816374, 11.33190988),
(9, 53, 'Grosseto', 'GR', 42.76026758, 11.11356398),
(9, 100, 'Prato', 'PO', 43.88062274, 11.09703315),
(9, 895, 'Fuori Regione / Provincia Autonoma', 'nu', NULL, NULL),
(9, 995, 'In fase di definizione/aggiornamento', 'nu', NULL, NULL),
(10, 54, 'Perugia', 'PG', 43.10675841, 12.38824698),
(10, 55, 'Terni', 'TR', 42.56071258, 12.6466875),
(10, 897, 'Fuori Regione / Provincia Autonoma', 'nu', NULL, NULL),
(10, 997, 'In fase di definizione/aggiornamento', 'nu', NULL, NULL),
(11, 41, 'Pesaro e Urbino', 'PU', 43.91014021, 12.91345989),
(11, 42, 'Ancona', 'AN', 43.61675973, 13.5188753),
(11, 43, 'Macerata', 'MC', 43.30023926, 13.45307182),
(11, 44, 'Ascoli Piceno', 'AP', 42.85322304, 13.57691127),
(11, 109, 'Fermo', 'FM', 43.16058534, 13.71839535),
(11, 889, 'Fuori Regione / Provincia Autonoma', 'nu', NULL, NULL),
(11, 989, 'In fase di definizione/aggiornamento', 'nu', NULL, NULL),
(12, 56, 'Viterbo', 'VT', 42.4173828, 12.10473416),
(12, 57, 'Rieti', 'RI', 42.40488444, 12.86205939),
(12, 58, 'Roma', 'RM', 41.89277044, 12.48366722),
(12, 59, 'Latina', 'LT', 41.46759465, 12.90368482),
(12, 60, 'Frosinone', 'FR', 41.63964569, 13.35117161),
(12, 886, 'Fuori Regione / Provincia Autonoma', 'nu', NULL, NULL),
(12, 986, 'In fase di definizione/aggiornamento', 'nu', NULL, NULL),
(13, 66, 'L\'Aquila', 'AQ', 42.35122196, 13.39843823),
(13, 67, 'Teramo', 'TE', 42.6589177, 13.70439971),
(13, 68, 'Pescara', 'PE', 42.46458398, 14.21364822),
(13, 69, 'Chieti', 'CH', 42.35103167, 14.16754574),
(13, 879, 'Fuori Regione / Provincia Autonoma', 'nu', NULL, NULL),
(13, 979, 'In fase di definizione/aggiornamento', 'nu', NULL, NULL),
(14, 70, 'Campobasso', 'CB', 41.55774754, 14.65916051),
(14, 94, 'Isernia', 'IS', 41.58800826, 14.22575407),
(14, 890, 'Fuori Regione / Provincia Autonoma', 'nu', NULL, NULL),
(14, 990, 'In fase di definizione/aggiornamento', 'nu', NULL, NULL),
(15, 61, 'Caserta', 'CE', 41.07465878, 14.33240464),
(15, 62, 'Benevento', 'BN', 41.12969987, 14.78151683),
(15, 63, 'Napoli', 'nu', 40.83956555, 14.25084984),
(15, 64, 'Avellino', 'AV', 40.91404699, 14.79528803),
(15, 65, 'Salerno', 'SA', 40.67821961, 14.7594026),
(15, 883, 'Fuori Regione / Provincia Autonoma', 'nu', NULL, NULL),
(15, 983, 'In fase di definizione/aggiornamento', 'nu', NULL, NULL),
(16, 71, 'Foggia', 'FG', 41.46226865, 15.54305094),
(16, 72, 'Bari', 'BA', 41.12559576, 16.86736689),
(16, 73, 'Taranto', 'TA', 40.47354739, 17.23237181),
(16, 74, 'Brindisi', 'BR', 40.63848545, 17.94601575),
(16, 75, 'Lecce', 'LE', 40.35354285, 18.1718973),
(16, 110, 'Barletta-Andria-Trani', 'BT', 41.22705039, 16.29520432),
(16, 892, 'Fuori Regione / Provincia Autonoma', 'nu', NULL, NULL),
(16, 992, 'In fase di definizione/aggiornamento', 'nu', NULL, NULL),
(17, 76, 'Potenza', 'PZ', 40.63947052, 15.80514834),
(17, 77, 'Matera', 'MT', 40.66751177, 16.59792442),
(17, 880, 'Fuori Regione / Provincia Autonoma', 'nu', NULL, NULL),
(17, 980, 'In fase di definizione/aggiornamento', 'nu', NULL, NULL),
(18, 78, 'Cosenza', 'CS', 39.29308681, 16.25609692),
(18, 79, 'Catanzaro', 'CZ', 38.90597598, 16.59440194),
(18, 80, 'Reggio di Calabria', 'RC', 38.10922769, 15.6434527),
(18, 101, 'Crotone', 'KR', 39.08036878, 17.12538864),
(18, 102, 'Vibo Valentia', 'VV', 38.67624147, 16.10157414),
(18, 882, 'Fuori Regione / Provincia Autonoma', 'nu', NULL, NULL),
(18, 982, 'In fase di definizione/aggiornamento', 'nu', NULL, NULL),
(19, 81, 'Trapani', 'TP', 38.01850065, 12.51365684),
(19, 82, 'Palermo', 'PA', 38.11569725, 13.3623567),
(19, 83, 'Messina', 'ME', 38.19395845, 15.55572302),
(19, 84, 'Agrigento', 'AG', 37.30971088, 13.5845749),
(19, 85, 'Caltanissetta', 'CL', 37.49213171, 14.06184973),
(19, 86, 'Enna', 'EN', 37.56705701, 14.27909375),
(19, 87, 'Catania', 'CT', 37.50287803, 15.08704691),
(19, 88, 'Ragusa', 'RG', 36.92509198, 14.73069891),
(19, 89, 'Siracusa', 'SR', 37.05991687, 15.29333182),
(19, 894, 'Fuori Regione / Provincia Autonoma', 'nu', NULL, NULL),
(19, 994, 'In fase di definizione/aggiornamento', 'nu', NULL, NULL),
(20, 90, 'Sassari', 'SS', 40.72667657, 8.559667131),
(20, 91, 'Nuoro', 'NU', 40.32318834, 9.330296393),
(20, 92, 'Cagliari', 'CA', 39.21531192, 9.110616306),
(20, 95, 'Oristano', 'OR', 39.90381075, 8.591183151),
(20, 111, 'Sud Sardegna', 'SU', 39.16641462, 8.526242676),
(20, 893, 'Fuori Regione / Provincia Autonoma', 'nu', NULL, NULL),
(20, 993, 'In fase di definizione/aggiornamento', 'nu', NULL, NULL),
(21, 21, 'Bolzano', 'BZ', 46.49933453, 11.35662422),
(21, 981, 'In fase di definizione/aggiornamento', 'nu', NULL, NULL),
(22, 22, 'Trento', 'TN', 46.06893511, 11.12123097),
(22, 996, 'In fase di definizione/aggiornamento', 'nu', NULL, NULL);

-- --------------------------------------------------------

--
-- Struttura della tabella `regioni`
--

CREATE TABLE `regioni` (
  `codice_regione` int(11) NOT NULL,
  `denominazione_regione` varchar(512) DEFAULT NULL,
  `lat` double DEFAULT NULL,
  `long` double DEFAULT NULL,
  `popolazione` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `regioni`
--

INSERT INTO `regioni` (`codice_regione`, `denominazione_regione`, `lat`, `long`, `popolazione`) VALUES
(1, 'Piemonte', 45.0732745, 7.680687483, 4341375),
(2, 'Valle d\'Aosta', 45.73750286, 7.320149366, 125501),
(3, 'Lombardia', 45.46679409, 9.190347404, 10103969),
(5, 'Veneto', 45.43490485, 12.33845213, 4907704),
(6, 'Friuli Venezia Giulia', 45.6494354, 13.76813649, 1211357),
(7, 'Liguria', 44.41149315, 8.9326992, 1543127),
(8, 'Emilia-Romagna', 44.49436681, 11.3417208, 4467118),
(9, 'Toscana', 43.76923077, 11.25588885, 3722729),
(10, 'Umbria', 43.10675841, 12.38824698, 880285),
(11, 'Marche', 43.61675973, 13.5188753, 1518400),
(12, 'Lazio', 41.89277044, 12.48366722, 5865544),
(13, 'Abruzzo', 42.35122196, 13.39843823, 1305770),
(14, 'Molise', 41.55774754, 14.65916051, 302265),
(15, 'Campania', 40.83956555, 14.25084984, 5785861),
(16, 'Puglia', 41.12559576, 16.86736689, 4008296),
(17, 'Basilicata', 40.63947052, 15.80514834, 556934),
(18, 'Calabria', 38.90597598, 16.59440194, 1924701),
(19, 'Sicilia', 38.11569725, 13.3623567, 4968410),
(20, 'Sardegna', 39.21531192, 9.110616306, 1630474),
(21, 'P.A. Bolzano', 46.49933453, 11.35662422, 106441),
(22, 'P.A. Trento', 46.06893511, 11.12123097, 520891);

-- --------------------------------------------------------

--
-- Struttura della tabella `storico_nazionale`
--

CREATE TABLE `storico_nazionale` (
  `data` datetime NOT NULL,
  `stato` varchar(5) DEFAULT NULL,
  `ricoverati_con_sintomi` int(11) DEFAULT NULL,
  `terapia_intensiva` int(11) DEFAULT NULL,
  `totale_ospedalizzati` int(11) DEFAULT NULL,
  `isolamento_domiciliare` int(11) DEFAULT NULL,
  `totale_positivi` int(11) DEFAULT NULL,
  `variazione_totale_positivi` int(11) DEFAULT NULL,
  `nuovi_positivi` int(11) DEFAULT NULL,
  `dimessi_guariti` int(11) DEFAULT NULL,
  `deceduti` int(11) DEFAULT NULL,
  `casi_da_sospetto_diagnostico` int(11) DEFAULT NULL,
  `casi_da_screening` int(11) DEFAULT NULL,
  `totale_casi` int(11) DEFAULT NULL,
  `tamponi` int(11) DEFAULT NULL,
  `casi_testati` int(11) DEFAULT NULL,
  `note` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struttura della tabella `storico_province`
--

CREATE TABLE `storico_province` (
  `data` datetime NOT NULL,
  `stato` varchar(3) DEFAULT NULL,
  `codice_regione` int(3) DEFAULT NULL,
  `denominazione_regione` varchar(255) DEFAULT NULL,
  `codice_provincia` int(3) NOT NULL,
  `denominazione_provincia` varchar(255) DEFAULT NULL,
  `sigla_provincia` varchar(2) DEFAULT NULL,
  `lat` double DEFAULT NULL,
  `long` double DEFAULT NULL,
  `totale_casi` int(10) NOT NULL,
  `note` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struttura della tabella `storico_regioni`
--

CREATE TABLE `storico_regioni` (
  `data` datetime NOT NULL,
  `stato` varchar(5) DEFAULT NULL,
  `codice_regione` int(11) NOT NULL,
  `denominazione_regione` varchar(512) DEFAULT NULL,
  `lat` double DEFAULT NULL,
  `long` double DEFAULT NULL,
  `ricoverati_con_sintomi` int(11) DEFAULT NULL,
  `terapia_intensiva` int(11) DEFAULT NULL,
  `totale_ospedalizzati` int(11) DEFAULT NULL,
  `isolamento_domiciliare` int(11) DEFAULT NULL,
  `totale_positivi` int(11) DEFAULT NULL,
  `variazione_totale_positivi` int(11) DEFAULT NULL,
  `nuovi_positivi` int(11) DEFAULT NULL,
  `dimessi_guariti` int(11) DEFAULT NULL,
  `deceduti` int(11) DEFAULT NULL,
  `casi_da_sospetto_diagnostico` int(11) DEFAULT NULL,
  `casi_da_screening` int(11) DEFAULT NULL,
  `totale_casi` int(11) DEFAULT NULL,
  `tamponi` int(11) DEFAULT NULL,
  `casi_testati` int(11) DEFAULT NULL,
  `note` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`codice_voce`);

--
-- Indici per le tabelle `province`
--
ALTER TABLE `province`
  ADD PRIMARY KEY (`codice_regione`,`codice_provincia`);

--
-- Indici per le tabelle `regioni`
--
ALTER TABLE `regioni`
  ADD PRIMARY KEY (`codice_regione`);

--
-- Indici per le tabelle `storico_nazionale`
--
ALTER TABLE `storico_nazionale`
  ADD PRIMARY KEY (`data`);

--
-- Indici per le tabelle `storico_province`
--
ALTER TABLE `storico_province`
  ADD PRIMARY KEY (`data`,`codice_provincia`);

--
-- Indici per le tabelle `storico_regioni`
--
ALTER TABLE `storico_regioni`
  ADD PRIMARY KEY (`codice_regione`,`data`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `menu`
--
ALTER TABLE `menu`
  MODIFY `codice_voce` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
