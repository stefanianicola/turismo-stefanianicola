import { PeliculasService } from '../../services/peliculas.service';
import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/cartelera-response';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  public movies: Movie[] = []

  constructor(private pelisService: PeliculasService){}

  ngOnInit(): void {
    this.pelisService.getCartelera().subscribe((movies) => this.movies = movies);

  }

}
