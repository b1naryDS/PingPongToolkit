import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MatchesService } from '../../services/matches.service';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  constructor(
    public router: Router,
    private matchService: MatchesService) {
      this.subscription = this.matchService.getMatches().subscribe(data => 
        {
          const match = {
            _id:data._id,
            player1id:data.player1Id,
            player1name:data.player1name,
            player2id:data.player2Id,
            player2name:data.player2name,
            player1points:data.player1points,
            player2points:data.player2points,
          }

          this.matches.push(match);
        })
        //this.players.push(player);})
     }

  details;
  matches: any = [];
  players: any = [];
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  ngOnInit() {
    this.matchService.findMatches().subscribe(
      res=>
      {
        const m = res[0].matches;
        const p = res[1].players;
        m.forEach(element => {
          if(element instanceof Observable){
            console.log("err");
          }else if(element._id === undefined){
            console.log("err");
          }
          else{
            this.matches.push(element);
          }
        });

        p.forEach(element => {
          this.players.push(element);
        });

        m.forEach(element => {
          for(var i = 0; i<p.length;i++){
            if(element.player1id == p[i]._id){
              element.player1name = p[i].name;
            }else if(element.player2id == p[i]._id){
              element.player2name = p[i].name;
            }
          }
        });
        this.matches = m;


      }
    )
  }
  consoleit(){
    console.log(this.players);
    console.log(this.matches);
  }
  
  onActivate(componentRef){
    if(this.details != null || this.details != undefined || this.details != "undefined" || this.details != {}){
      this.matchService.findMatchById(this.details);
    }
  }
  getMatchDetails(match){
    this.details = match;
    if(this.details._id === null || this.details._id === undefined || this.details._id === "undefined"){
      this.router.navigate(['matches/newMatch']);
    }
    else if(this.details._id !== null || this.details._id !== undefined || this.details._id !== "undefined"){
      this.router.navigate(['matches/'+this.details._id]);
    }
    const newDetails = this.details;
    this.matchService.findMatchById(newDetails);

  }
  setNewDetails(){
    this.details = {};
  }

}
