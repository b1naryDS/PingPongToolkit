import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { Headers } from '@angular/http';
import { Observable, Subject, throwError, Subscription} from 'rxjs';
import { map } from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import { HttpClientModule } from '@angular/common/http'; import { HttpModule } from '@angular/http';
import {Player} from '../models/player.model';


const httpOptions = {
  headers: new Headers({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  private playersInit = this.findPlayers();
  private testBehaviorSubject = new BehaviorSubject<any>(this.playersInit);
  private playerBehaviorSubject = new Subject<any>();
  private apiUrl;

  constructor(private http: Http) { 
    this.apiUrl = 'http://localhost:3000';
  }


  findPlayers(): Observable<any>{
    return this.http.get(`${this.apiUrl}/players`).pipe(
      map(res => res.json())
      );
  }
  //findPlayersById(id): Observable<any>{
  //  return this.http.get(`${this.apiUrl}/players/${id}`).pipe(
  //    map(res => res.json()));
  //}

  findPlayersById(player): any{
    console.log(player);
    
    this.playerBehaviorSubject.next(player);
  }

  addPlayer(data):any{
    console.log(data);
    return this.http.post(`${this.apiUrl}/players/insert`, data, httpOptions).pipe(
      map((res) => {
        const pushData = res.json();
        this.testBehaviorSubject.next(pushData);
      }));
  }
  //editPlayer():Observable<any>{
    
  //}
  getPlayerDetails(): Observable<any>{
    return this.playerBehaviorSubject.asObservable();
  }

  getPlayers(): Observable<any>{
    return this.testBehaviorSubject.asObservable();

    //hardcoded
    //const players =
    //  [{"ime":"player1"},{"ime":"player2"},{"ime":"player3"},{"ime":"player4"},{"ime":"player5"},{"ime":"player6"},]
  }

}
