import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreditiComponent } from './crediti/crediti.component';
import { StoricoNazionaleComponent } from './storico-nazionale/storico-nazionale.component';
import { StoricoRegionaleComponent } from './storico-regionale/storico-regionale.component';
import { StoricoProvincialeComponent } from './storico-provinciale/storico-provinciale.component';
import { HomeNazioneComponent } from './home-nazione/home-nazione.component';
import { HomeRegioneComponent } from './home-regione/home-regione.component';
import { HomeProvinciaComponent } from './home-provincia/home-provincia.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeApplicazioneComponent } from './home-applicazione/home-applicazione.component';
import { GiornoSpecificoNazioneComponent } from './giorno-specifico-nazione/giorno-specifico-nazione.component';
import { GiornoSpecificoRegioneComponent } from './giorno-specifico-regione/giorno-specifico-regione.component';
import { GiornoSpecificoProvinciaComponent } from './giorno-specifico-provincia/giorno-specifico-provincia.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { SceltaRegioneComponent } from './scelta-regione/scelta-regione.component';
import { SceltaProvinciaComponent } from './scelta-provincia/scelta-provincia.component';
import { IndicatoriAggiuntiviRegioneComponent } from './indicatori-aggiuntivi-regione/indicatori-aggiuntivi-regione.component';

const routes: Routes = [
  { path: '', component: HomeApplicazioneComponent},
  { path: 'nazione', component: HomeNazioneComponent },
  { path: 'regione',      component: HomeRegioneComponent },
  { path: 'provincia',      component: HomeProvinciaComponent },
  { path: 'crediti',      component: CreditiComponent },
  { path: 'storico-nazionale',      component: StoricoNazionaleComponent }, 
  { path: 'storico-regionale/:codiceRegione',      component: StoricoRegionaleComponent },  //CODICE 1
  { path: 'storico-provinciale/:codiceRegione/:codiceProvincia',      component: StoricoProvincialeComponent },  //CODICE 1
  { path: 'giorno-specifico-nazione', component: GiornoSpecificoNazioneComponent},
  { path: 'giorno-specifico-regione/:codiceRegione', component: GiornoSpecificoRegioneComponent},  //CODICE 2
  { path: 'giorno-specifico-provincia/:codiceRegione/:codiceProvincia', component: GiornoSpecificoProvinciaComponent},  //CODICE 2
  { path: 'indicatori-aggiuntivi/:codiceRegione', component: IndicatoriAggiuntiviRegioneComponent},  //CODICE 3
  { path: 'scelta-regione/:tipoScelta', component: SceltaRegioneComponent},
  { path: 'scelta-provincia/:tipoScelta', component: SceltaProvinciaComponent},
  { path: '**', component: NotFoundPageComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    CreditiComponent,
    StoricoNazionaleComponent,
    StoricoRegionaleComponent,
    StoricoProvincialeComponent,
    HomeNazioneComponent,
    HomeRegioneComponent,
    HomeProvinciaComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    HomeApplicazioneComponent,
    GiornoSpecificoNazioneComponent,
    GiornoSpecificoRegioneComponent,
    GiornoSpecificoProvinciaComponent,
    NotFoundPageComponent,
    SceltaRegioneComponent,
    SceltaProvinciaComponent,
    IndicatoriAggiuntiviRegioneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(
      routes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})

export class AppModule { }
