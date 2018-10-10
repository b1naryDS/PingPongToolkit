import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { routes } from './app.router';
import { PlayersComponent } from './components/players/players.component';
import { PlayerFormComponent } from './components/players/player-form/player-form.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    PlayerFormComponent
  ],
  imports: [
    BrowserModule,
    routes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
