import { Component, OnInit, OnDestroy, Input } from '@angular/core';
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
  subscription2: Subscription;
  
  players = [];
  matches = [];
  data = [];
  isDataLoaded=false;
  orderBy = 'asc';
  details: any;


  constructor(
    public router: Router,
    private playersService: PlayersService
    ) { 
    this.subscription = this.playersService.getPlayers().subscribe(data => 
      {
      const player = {
        name: data.name,
        setsWon: 0,
        matchesWon: 0
      }
      this.players.push(player);})
    }

  ngOnInit() {

    this.playersService.findPlayers().subscribe(
      res=>{
        var data = res;
        this.players = [];
        data.forEach(element => {
          this.data.push(element);
        });
        this.matches = this.data[0].matches;
        this.players = this.data[1].players;
        for(var i = 0;i<this.players.length;i++){
          this.players[i].setsWon = 0;
        }
        
        this.matches.forEach(element=>{
          var setsWonP1=0;
          var setsWonP2=0;
          var winner;
          for(var x = 0;x<element.player1points.length;x++){
            if(element.player1points[x] !== undefined || element.player1points[x] !== null){
              if(element.player1points[x]>element.player2points[x]){
                setsWonP1=setsWonP1+1;
              }else if(element.player2points[x]>element.player1points[x]){
                setsWonP2=setsWonP2+1;
              }
            }
          }

          for(var i = 0;i<this.players.length;i++){
            if(this.players[i]._id == element.player1id){
              
              this.players[i].setsWon += setsWonP1;
            }
            else if(this.players[i]._id == element.player2id){
              this.players[i].setsWon += setsWonP2;
            }
          }
        })
      },
      error=>{
        console.log(error);
      }
    )

  }
  getPlayerDetails(player){
    this.details = player;
    if(this.details._id === null || this.details._id === undefined || this.details._id === "undefined"){
      this.router.navigate(['players/newPlayer']);
    }
    else if(this.details._id !== null || this.details._id !== undefined || this.details._id !== "undefined"){
      this.router.navigate(['players/'+this.details._id]);
    }
    const newDetails = this.details;
    this.playersService.findPlayersById(newDetails);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  consolelogit(){
    console.log(this.matches);
  }
  sortBySetsWon(){
    if(this.orderBy === 'asc'){
      this.players.sort((val1, val2)=> {
        this.orderBy= 'dsc';
        return val1.setsWon - val2.setsWon
      })
    }else{
      this.players.sort((val1, val2)=> {
        this.orderBy ='asc';
        return val2.setsWon - val1.setsWon
      })
    }
  }
  onActivate(componentRef){
    if(this.details != null || this.details != undefined || this.details != "undefined" || this.details != {}){
      this.playersService.findPlayersById(this.details);
    }
  }
  setNewDetails(){
    this.details = {}
  }
  
 

}
