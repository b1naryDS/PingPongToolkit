import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import { PlayersComponent } from './components/players/players.component';
import { PlayerFormComponent } from './components/players/player-form/player-form.component'; 
import { MatchesComponent } from './components/matches/matches.component';
import { MatchFormComponent } from './components/matches/match-form/match-form.component';

export const router: Routes= [
    {path: '', redirectTo: '',pathMatch: 'full'},

    {path: 'players', 
    component: PlayersComponent,
    children:[{
        path:'newPlayer',
        component:PlayerFormComponent,
        pathMatch: 'full'
    },{
        path:':id',
        component:PlayerFormComponent,
        pathMatch: 'full'
    }]},
    {path: 'matches', 
    component: MatchesComponent,
    children:[{
        path:'newMatch',
        component:MatchFormComponent,
        pathMatch: 'full'
    },{
        path:':id',
        component:MatchFormComponent,
        pathMatch: 'full'
    }]}
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);