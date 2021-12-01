import { Component, OnInit } from '@angular/core';
import { Cards } from 'src/app/models/card.model';
import { CardServiceService } from 'src/app/services/card-service.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  public viajes: Cards[] = []

  constructor(private cardService: CardServiceService){}

  ngOnInit(): void {
    this.cardService.getCards().subscribe(res => this.viajes = res);

  }

}
