import { Component, OnInit } from '@angular/core';
import { PlayersService } from '../../../services/players.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from '../../../models/player.model';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.css']
})
export class PlayerFormComponent implements OnInit {
  id;
  //name;
  player: Player = new Player;
  isDataLoaded = false;
  formType;
  placeholder = "neki davor test";
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private playersService: PlayersService
  ) { }

  ngOnInit() { 
    this.route.params.subscribe(params => {
      console.log(params);
      this.id=params.id;
      console.log(this.id);
      if(this.id==undefined || this.id==null || this.id == 0){
        this.formType = 1;
        this.isDataLoaded = true;
      }else{
        this.formType = 2;
        this.playersService.findPlayersById(this.id).subscribe(
          data=>{
            console.log(data);
            this.player = data;
            this.isDataLoaded = true;
          },
          error=>{
            console.log(error);
            console.log("id ne postoji");
          }
        )
      }
    });
  }
  gurni(){
    const name = {"name":this.player.name};
    this.playersService.addPlayer(name).subscribe(res=>{
      console.log("uspeh");
      console.log(res);
    },
    error=>{
      console.log("error");
      console.log(error);
    }
    )
  }

}
