import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatchesService } from '../../../services/matches.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PlayersService } from '../../../services/players.service';

@Component({
  selector: 'app-match-form',
  templateUrl: './match-form.component.html',
  styleUrls: ['./match-form.component.css']
})
export class MatchFormComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  metch;
  id;
  match;
  isDataLoaded = false;
  formType;
  players = [];
  setsHolderModel = {
    p1: {
      p1set1: undefined,
      p1set2: undefined,
      p1set3: undefined,
      p1set4: undefined,
      p1set5: undefined
    },
    p2: {
      p2set1: undefined,
      p2set2: undefined,
      p2set3: undefined,
      p2set4: undefined,
      p2set5: undefined
    }
  };
  p1;
  p2;
  p1name;
  p2name;
  p1id;
  p2id;
  selectedPlayer1:{
    name,
    id
  };
  selectedPlayer2:{
    name,
    id
  };
  constructor(private route: ActivatedRoute,
    private router: Router,
    private matchesService: MatchesService,
    private playersService:PlayersService) {
      this.subscription = this.matchesService.getMatchDetails().subscribe(match => { this.match = match;
        console.log(this.match);
        if(Object.keys(this.match).length === 0){}
        else{
          this.setsHolderModel.p1.p1set1 = this.match.player1points[0];
          this.setsHolderModel.p1.p1set2 = this.match.player1points[1];
          this.setsHolderModel.p1.p1set3 = this.match.player1points[2];
          this.setsHolderModel.p1.p1set4 = this.match.player1points[3];
          this.setsHolderModel.p1.p1set5 = this.match.player1points[4];
          
          this.setsHolderModel.p2.p2set1 = this.match.player2points[0];
          this.setsHolderModel.p2.p2set2 = this.match.player2points[1];
          this.setsHolderModel.p2.p2set3 = this.match.player2points[2];
          this.setsHolderModel.p2.p2set4 = this.match.player2points[3];
          this.setsHolderModel.p2.p2set5 = this.match.player2points[4];
          
          this.p1name = this.match.player1name;
          this.p2name = this.match.player2name;
          this.p1 = {
            name:this.match.player1name,
            id:this.match.player1id
          }
          this.p2 = {
            name:this.match.player2name,
            id:this.match.player2id
          }
          this.selectedPlayer2= {
            name:this.match.player2name,
            id:this.match.player2id
          }
          this.selectedPlayer1= {
            name:this.match.player1name,
            id:this.match.player1id
          }
        }
      });
  }
  onChange(a,num){
    if(num === 1){
      this.selectedPlayer1=a;
    }else if(num ===2){
      this.selectedPlayer2=a;
    }
  }

  ngOnInit() {
    this.playersService.findPlayers().subscribe(res=>{
      for(var p in res[1].players){
        const player = {name:res[1].players[p].name,
                        id:res[1].players[p]._id
        }
        this.players.push(player);
      }
    })

    this.route.params.subscribe(params => {
      this.id=params.id;
      if(this.id===undefined || this.id===null || this.id==="undefined"){
        this.setsHolderModel = {
          p1: {
            p1set1: undefined,
            p1set2: undefined,
            p1set3: undefined,
            p1set4: undefined,
            p1set5: undefined
          },
          p2: {
            p2set1: undefined,
            p2set2: undefined,
            p2set3: undefined,
            p2set4: undefined,
            p2set5: undefined
          }
        }
        this.formType = 1;
        this.isDataLoaded = true;
      }else{
        this.formType = 2;
      }
    }); 
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  errorLog = false;
  successLog = false;

  addMatch() {
    var wonSetsp1 = 0;
    var wonSetsp2 = 0;
    var player1 = [];
    var player2 = [];
    for (var p in this.setsHolderModel.p1) {player1.push(this.setsHolderModel.p1[p]);}
    for (var p in this.setsHolderModel.p2) {player2.push(this.setsHolderModel.p2[p]);}

    for(var i=0;i<5;i++){

      if(this.selectedPlayer1 === this.selectedPlayer2){
        console.log("same users");
        this.successLog = false;
        this.errorLog = true;
        break;
      }
      if(wonSetsp1>3 || wonSetsp2>3){console.log("err");}
      else if(wonSetsp1 ==3 && wonSetsp2<wonSetsp1){
        console.log("set Wsets1");
        this.successLog = true;
        this.errorLog = false;
      }
      else if(wonSetsp2 ==3 && wonSetsp1<wonSetsp2){
        console.log("set Wsets2");
        this.successLog = true;
        this.errorLog = false;
      }

      if(wonSetsp1==3 || wonSetsp2==3){
        if(player1[i]!=undefined || player2[i]!=undefined){
          this.successLog = false;
          this.errorLog = true;
          console.log("err");
          break;
        }
      }

      if(player1[i]>=player2[i]+2){
        if(player1[i]>11 && player1[i]==player2[i]+2){
          wonSetsp1++;
        }else if(player1[i]==11){
          wonSetsp1++;
        }else{
          this.successLog = false;
          this.errorLog = true;
          console.log("err");
          break;
        }
      }else if(player2[i]>=player1[i]+2){
        if(player2[i]>11 && player2[i]==player1[i]+2){
          wonSetsp2++;
        }else if(player2[i]==11){
          wonSetsp2++;
        }else{
          this.successLog = false;
          this.errorLog = true;
          console.log("err");
          break;
        }
      }
      else if(player1[i]===undefined && player2[i]===undefined){
        if((wonSetsp1===3&&wonSetsp1>wonSetsp2)||(wonSetsp2===3&&wonSetsp2>wonSetsp1)){
          if(i===4){}
        }
        else{
          this.successLog = false;
          this.errorLog = true;
          console.log("err");
          break;
        }
      }
      if(i===4){
        if((wonSetsp1===3&&wonSetsp1>wonSetsp2)||(wonSetsp2===3&&wonSetsp2>wonSetsp1)){
          console.log("ovdeeeeeeeeeeeeeeeeeeeee")
          this.successLog = true;
          this.errorLog = false;
        }
        else{
          this.successLog = false;
          this.errorLog = true;
          console.log("err");
          break;
        }
      }
    }
    console.log(wonSetsp1);
    console.log(wonSetsp2);
    if(this.successLog === true){
      this.pushMatch();
    }
  }
  pushMatch(){
    const match = {
      player1name: this.selectedPlayer1.name,
      player2name: this.selectedPlayer2.name,
      player1Id: this.selectedPlayer1.id,
      player2Id: this.selectedPlayer2.id,
      player1points:[
        this.setsHolderModel.p1.p1set1,
        this.setsHolderModel.p1.p1set2,
        this.setsHolderModel.p1.p1set3,
        this.setsHolderModel.p1.p1set4,
        this.setsHolderModel.p1.p1set5,
      ],
      player2points:[
        this.setsHolderModel.p2.p2set1,
        this.setsHolderModel.p2.p2set2,
        this.setsHolderModel.p2.p2set3,
        this.setsHolderModel.p2.p2set4,
        this.setsHolderModel.p2.p2set5,
      ]
    }
    this.matchesService.addMatch(match).subscribe(res=>{
      console.log(res);
    },
    error=>{
      console.log("error");
      console.log(error);}
    )
  }
}

