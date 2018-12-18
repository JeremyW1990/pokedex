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
  private pokemonsSubscription: Subscription;

  constructor(private pokemonDataService: PokemonDataService) { }

  ngOnInit() {
    this.pokemonDataService.getpokemons();
    this.pokemonsSubscription = this.pokemonDataService.getPokemonListener()
      .subscribe(response => {
        this.pokemons = response;
        console.log(this.pokemons);
      });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy () {
    this.pokemonsSubscription.unsubscribe();
  }


}
