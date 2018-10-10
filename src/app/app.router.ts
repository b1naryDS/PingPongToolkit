import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import { PlayersComponent } from './components/players/players.component';

export const router: Routes= [
    {path: '', redirectTo: '',pathMatch: 'full'},
    {path: 'players', component: PlayersComponent},
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);