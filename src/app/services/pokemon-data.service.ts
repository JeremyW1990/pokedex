import { Injectable } from '@angular/core';
import { Pokemon } from '../pokemon-index/pokemon.module';

@Injectable({
  providedIn: 'root'
})
export class PokemonDataService {

  private PokemonDatabase: Pokemon[] = [
    new Pokemon(1, 'a', 'a', 'a'),
    new Pokemon(2, 'b', 'b', 'b'),

  ];
  constructor() { }

  getPokemonDatabase () {
    return this.PokemonDatabase.slice();
  }
}
