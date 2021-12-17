import { Credits } from './../models/credits';
import { MovieDetail } from './../models/movie-detail';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import {CarteleraResponse, Movie} from '../models/cartelera-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl: string = "https://api.themoviedb.org/3";
  private carteleraPage = 1;
  cargando:boolean = false;

  constructor(private http: HttpClient) { }

  get params(){
    return {
      api_key: '5dcc145977fda824973f767c8850fe0a',
      language: 'es-ES',
      page: this.carteleraPage.toString()

    }
  }

  getCartelera(): Observable<Movie[]>{

    if(this.cargando){
      return of([]);
    };

    this.cargando= true;

    return this.http.get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing?`,{
      params: this.params
    }).pipe(
      map( (res)=>
        res.results
    ),
      tap( () => {
        this.carteleraPage += 1;
        this.cargando = false;
      })
    )
  }

  resetCarteleraPage(){
    this.carteleraPage = 1;
  }

  buscarPeliculas( texto: string): Observable <Movie[]>{

    const params = {...this.params, page: '1', query: texto}

    return this.http.get<CarteleraResponse>(`${this.baseUrl}/search/movie?`,
    {params}
    ).pipe(
      map(res => res.results)
    )

  }

  getPeliculaDetalle(id: string){
    return this.http.get<MovieDetail>(`${this.baseUrl}/movie/${id}`,
    {params: this.params})
      .pipe(
        catchError( err => of(null))
      )
  }

  getCast(id: string){
    return this.http.get<Credits>(`${this.baseUrl}/movie/${id}/credits`,
    {params: this.params}).pipe(
      map( resp => resp.cast),
      catchError( err => of([])),
    );
  }

}
