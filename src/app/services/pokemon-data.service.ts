import { Injectable } from '@angular/core';
import { Pokemon } from '../pokemon-index/pokemon.module';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonDataService {

  private PokemonDatabase: Pokemon[] = [];

  constructor(private http: HttpClient) { }

  getPokemonDatabase () {
    this.http.get('http://localhost:3000/index')
      .subscribe(response => {
        for (const v of response.pokemons) {
          const pokemon = new Pokemon(v.id, v.name, v.description, v.imagePath);
          this.PokemonDatabase.push(pokemon);
        }
      });
    return this.PokemonDatabase;
  }

  getPokemonById (id: number) {
    for (let i = 0; i < this.PokemonDatabase.length; i++) {
      if (this.PokemonDatabase[i].id === +id) {
        return this.PokemonDatabase[i];
      }
    }
  }
  deletePokemonById(id: number): any {
    const updatePokemonDatabase = this.PokemonDatabase.filter(pokemon => pokemon.id !== +id);
    this.PokemonDatabase = updatePokemonDatabase;
  }

  addNewPokemon(value: any): any {
    this.PokemonDatabase.push(
      new Pokemon(
        value.id,
        value.name,
        value.description,
        value.imagePath
      )
    );
  }

  updatePokemonById(oldId: number, value: any): any {
    for (const pokemon of this.PokemonDatabase) {
      if (pokemon.id === +oldId) {
          pokemon.id = value.id;
          pokemon.name = value.name;
          pokemon.description = value.description;
          pokemon.imagePath = value.imagePath;
      }
    }
  }

}
