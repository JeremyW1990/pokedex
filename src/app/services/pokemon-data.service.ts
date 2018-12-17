import { Injectable } from '@angular/core';
import { Pokemon } from '../pokemon-index/pokemon.module';

@Injectable({
  providedIn: 'root'
})
export class PokemonDataService {

  private PokemonDatabase: Pokemon[] = [
    new Pokemon(
      1,
      'Bulbasaur',
      'Bulbasaur can be seen napping in bright sunlight. There is a seed on its back. By soaking up the sun\'s rays, the seed grows progressively larger.',
    'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png'),
    new Pokemon(
      2,
      'Ivysaur',
      'There is a bud on this Pokémon\'s back. To support its weight, Ivysaur\'s legs and trunk grow thick and strong. If it starts spending more time lying in the sunlight, it\'s a sign that the bud will bloom into a large flower soon.',
    'https://assets.pokemon.com/assets/cms2/img/pokedex/full/002.png'),
    new Pokemon(
      3,
      'Venusaur',
      'There is a large flower on Venusaur\'s back. The flower is said to take on vivid colors if it gets plenty of nutrition and sunlight. The flower\'s aroma soothes the emotions of people.',
    'https://assets.pokemon.com/assets/cms2/img/pokedex/full/003.png'),
    new Pokemon(
      4,
      'Charmander',
      'The flame that burns at the tip of its tail is an indication of its emotions. The flame wavers when Charmander is enjoying itself. If the Pokémon becomes enraged, the flame burns fiercely.',
    'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png'),
    new Pokemon(
      5,
      'Charmeleon',
      'Charmeleon mercilessly destroys its foes using its sharp claws. If it encounters a strong foe, it turns aggressive. In this excited state, the flame at the tip of its tail flares with a bluish white color.',
    'https://assets.pokemon.com/assets/cms2/img/pokedex/full/005.png'),
    new Pokemon(
      6,
      'Charizard',
      'Charizard flies around the sky in search of powerful opponents. It breathes fire of such great heat that it melts anything. However, it never turns its fiery breath on any opponent weaker than itself.',
    'https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png')

  ];
  constructor() { }

  getPokemonDatabase () {
    return this.PokemonDatabase.slice();
  }

  getPokemonById (id: number) {
    return this.PokemonDatabase[id - 1];
  }
}
