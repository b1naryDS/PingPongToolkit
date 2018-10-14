import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { routes } from './app.router';
import { PlayersComponent } from './components/players/players.component';
import { PlayerFormComponent } from './components/players/player-form/player-form.component';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import {PlayersService} from './services/players.service';
import { FormsModule } from '@angular/forms';
import { MatchesComponent } from './components/matches/matches.component';
import { MatchFormComponent } from './components/matches/match-form/match-form.component';
import { MatchesService } from './services/matches.service';
@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    PlayerFormComponent,
    MatchesComponent,
    MatchFormComponent
  ],
  imports: [
    BrowserModule,
    routes,
    HttpModule,
    FormsModule
  ],
  providers: [PlayersService,MatchesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
