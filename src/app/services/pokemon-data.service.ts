import { Injectable } from '@angular/core';
import { Pokemon } from '../pokemon-index/pokemon.module';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonDataService {

  private pokemons: Pokemon[] = [];
  private totalPokemonsNumber = 0;
  private pokemonListener = new Subject();

  constructor(private http: HttpClient) { }

  getPokemonListener () {
    return this.pokemonListener.asObservable();
  }
  getpokemons () {
    this.http.get('http://localhost:3000/index')
      .subscribe(response => {
        this.pokemons = response.pokemons;
        this.totalPokemonsNumber = response.totalPokemonsNumber;
        this.pokemonListener.next({pokemons: this.pokemons, totalPokemonsNumber: this.totalPokemonsNumber});
      });
  }

  getPokemonById (id: number) {
    for (const v of this.pokemons) {
      if (+v.id === +id) {
        return v;
      }
    }
  }
  deletePokemonById(id: number): any {
    const updatepokemons = this.pokemons.filter(pokemon => +pokemon.id !== +id);
    this.pokemons = updatepokemons;
  }

  addNewPokemon(value: any): any {
    this.pokemons.push(
      new Pokemon(
        value.id,
        value.name,
        value.description,
        value.imagePath
      )
    );
  }

  updatePokemonById(oldId: number, value: any): any {
    for (const pokemon of this.pokemons) {
      if (+pokemon.id === +oldId) {
          pokemon.id = value.id;
          pokemon.name = value.name;
          pokemon.description = value.description;
          pokemon.imagePath = value.imagePath;
      }
    }
  }

}
