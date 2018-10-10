import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  //players$ = new Observable<any>();

  constructor() { }
  getPlayers(){
    const players =
      [
        {"ime":"player1"},
        {"ime":"player2"},
        {"ime":"player3"},
        {"ime":"player4"},
        {"ime":"player5"},
        {"ime":"player6"},
      ]
    return players;
  }
}
