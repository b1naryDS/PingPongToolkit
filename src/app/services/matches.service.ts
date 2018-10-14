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



export class MatchesService {
  private matchesInit = this.findMatches();
  private matchBehaviorSubject = new Subject<any>();
  private testBehaviorSubject = new BehaviorSubject<any>(this.matchesInit);
  private apiUrl;

  constructor(private http: Http) {
    this.apiUrl = 'http://localhost:3000'; 
  }

    findMatches(): Observable<any>{
      return this.http.get(`${this.apiUrl}/matches`).pipe(
        map(res => res.json())
        );
    }
    findMatchById(match): any{
      console.log(match);
      
      this.matchBehaviorSubject.next(match);
    }
  
    addMatch(data):any{
      console.log(data);
      return this.http.post(`${this.apiUrl}/matches/insert`, data, httpOptions).pipe(
        map((res) => {
          //const pushData = res.json();
          var pushData = data;
          pushData._id = res.json()._id;
          this.testBehaviorSubject.next(pushData);
        }));
    }
    getMatchDetails(): Observable<any>{
      return this.matchBehaviorSubject.asObservable();
    }
  
    getMatches(): Observable<any>{
      return this.testBehaviorSubject.asObservable();
    }
  
  }
  
