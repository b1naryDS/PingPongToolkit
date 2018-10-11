import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlayersService } from '../../services/players.service';
import { Observable, Subscription } from 'rxjs';
import { HttpClientModule } from '@angular/common/http'; import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';
import { Player } from '../../models/player.model';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  players: Player[] = new Array();
  isDataLoaded=false;


  constructor(
    public router: Router,
    private playersService: PlayersService
    ) { 
    this.subscription = this.playersService.getPlayers().subscribe(data => {this.players.push(data);})
  }

  ngOnInit() {
    this.playersService.findPlayers().subscribe(
      data=>{
        console.log(data);
        this.players = data;
      },
      error=>{
        console.log(error);
      }
    )

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  
 

}
