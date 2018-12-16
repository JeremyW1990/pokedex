import { Component, OnInit } from '@angular/core';
import { PokemonDataService } from '../services/pokemon-data.service';
import { Pokemon } from './pokemon.module';

@Component({
  selector: 'app-pokemon-index',
  templateUrl: './pokemon-index.component.html',
  styleUrls: ['./pokemon-index.component.css']
})
export class PokemonIndexComponent implements OnInit {

  private pokemonList: Pokemon[];

  constructor(private pokemonDataService: PokemonDataService) { }

  ngOnInit() {
    this.pokemonList = this.pokemonDataService.getPokemonDatabase();
  }

}
