import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlayersService } from '../../services/players.service';
import { Observable, Subscription } from 'rxjs';
import { HttpClientModule } from '@angular/common/http'; import { HttpModule } from '@angular/http';


@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  players: any[] = new Array();


  constructor(private playersService: PlayersService) { 
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
