import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlayersService } from '../../../services/players.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from '../../../models/player.model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.css']
})
export class PlayerFormComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  id;
  //name;
  player;
  isDataLoaded = false;
  formType;
  constructor(
    
    private route: ActivatedRoute,
    private router: Router,
    private playersService: PlayersService
  ) { 
    this.subscription = this.playersService.getPlayerDetails().subscribe(data => {const player=data; this.player = player})
    
  }

  ngOnInit() { 
    
    this.route.params.subscribe(params => {
      this.id=params.id;
      if(this.id===undefined || this.id===null || this.id==="undefined"){
        this.player = {

          name:'',
          setsWon:0,
          matchesWon:0
        }
        this.formType = 1;
        this.isDataLoaded = true;
        
      }else{
        this.formType = 2;
      }
    }); 

  }
  addPlayer(){
    const name = {"name":this.player.name};
    this.playersService.addPlayer(name).subscribe(res=>{
      console.log("res");
      console.log(res.json());
    },
    error=>{
      console.log("error");
      console.log(error);
    }
    )
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
