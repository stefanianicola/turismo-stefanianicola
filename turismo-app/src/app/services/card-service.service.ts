import { Injectable } from '@angular/core';
import {  map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Cards } from '../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class CardServiceService {

  constructor(private http: HttpClient) { }

  getCards(){
    return this.http.get<Cards[]>("../../assets/mock.json");
  }
}
