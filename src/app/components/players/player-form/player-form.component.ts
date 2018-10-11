import { Component, OnInit } from '@angular/core';
import { PlayersService } from '../../../services/players.service'

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.css']
})
export class PlayerFormComponent implements OnInit {

  constructor(private playersService: PlayersService) { }

  ngOnInit() {
  }

  gurni(){
    this.playersService.addPlayer({"name":"test davor"}).subscribe(res=>{
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
