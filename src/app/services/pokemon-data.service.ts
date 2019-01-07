import { Injectable } from '@angular/core';
import { Pokemon } from '../pokemon-index/pokemon.module';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PokemonDataService {

  private pokemons: Pokemon[] = [];
  private totalPokemonsNumber = 0;
  private pokemonListener = new Subject();

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

  getPokemonListener () {
    return this.pokemonListener.asObservable();
  }
  getpokemons () {
    this.http.get<{message: String, pokemons: any, totalPokemonsNumber: number}>('http://localhost:3000/pokemons')
      .subscribe(response => {
        this.pokemons = response.pokemons;
        this.totalPokemonsNumber = response.totalPokemonsNumber;
        this.pokemonListener.next({pokemons: this.pokemons, totalPokemonsNumber: this.totalPokemonsNumber});
      });
  }

  getPokemonById (id: number) {
    return this.http.get<{message: String, pokemon: any}>('http://localhost:3000/pokemons/' + id);
  }

  deletePokemonById(id: number): any {
    this.http.delete('http://localhost:3000/pokemons/' + id)
      .subscribe(response => {
        console.log(response);
      });
    // const updatepokemons = this.pokemons.filter(pokemon => +pokemon.id !== +id);
    // this.pokemons = updatepokemons;
  }

  addNewPokemon(value: any): any {
    // this.pokemons.push(
    //   new Pokemon(
    //     value.id,
    //     value.name,
    //     value.description,
    //     value.imagePath
    //   )
    // );
    console.log(value);
    this.http.post('http://localhost:3000/pokemons/', value)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['pokemons/' + value.id]);
      });
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
