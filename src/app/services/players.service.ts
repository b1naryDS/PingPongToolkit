import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { Headers } from '@angular/http';
import { Observable, Subject, throwError} from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClientModule } from '@angular/common/http'; import { HttpModule } from '@angular/http';

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

  //players$ = new Observable<any>();
  private playerSubject = new Subject<any>();

  private apiUrl;
  constructor(private http: Http) { 
    this.apiUrl = 'http://localhost:3000';

  }


  findPlayers(): Observable<any>{
    return this.http.get(`${this.apiUrl}/players`).pipe(
      map((res) => res.json()));
  }

  addPlayer(data):any{
    console.log(data);
    return this.http.post(`${this.apiUrl}/players/insert`, data, httpOptions).pipe(
      map((res) => {
        res.json();
        this.playerSubject.next(data);
      }));
  }
  //editPlayer():Observable<any>{
    
  //}

  getPlayers(): Observable<any>{
    return this.playerSubject.asObservable();

    //hardcoded
    //const players =
    //  [{"ime":"player1"},{"ime":"player2"},{"ime":"player3"},{"ime":"player4"},{"ime":"player5"},{"ime":"player6"},]
  }

}
