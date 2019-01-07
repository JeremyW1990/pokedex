import { Component, OnInit } from '@angular/core';
import { PokemonDataService } from '../services/pokemon-data.service';
import { Pokemon } from './pokemon.module';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pokemon-index',
  templateUrl: './pokemon-index.component.html',
  styleUrls: ['./pokemon-index.component.css']
})
export class PokemonIndexComponent implements OnInit {

  private pokemons;
  private totalPokemonsNumber;
  private pokemonsSubscription: Subscription;

  constructor(private pokemonDataService: PokemonDataService) { }

  ngOnInit() {
    this.pokemonDataService.getpokemons();
    this.pokemonsSubscription = this.pokemonDataService.getPokemonListener()
      .subscribe((response: {pokemons: any, totalPokemonsNumber: number }) => {
        this.pokemons = response.pokemons;
        this.totalPokemonsNumber = response.totalPokemonsNumber;
        console.log(this.pokemons);
      });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy () {
    this.pokemonsSubscription.unsubscribe();
  }


}
