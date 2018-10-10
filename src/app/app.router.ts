import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import { PlayersComponent } from './components/players/players.component';
import { PlayerFormComponent } from './components/players/player-form/player-form.component'; 

export const router: Routes= [
    {path: '', redirectTo: '',pathMatch: 'full'},

    {path: 'players', 
    component: PlayersComponent,
    children:[{
        path:'newPlayer',
        component:PlayerFormComponent,
    }]
    },
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);