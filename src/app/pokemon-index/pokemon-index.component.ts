import { Component, OnInit, OnDestroy } from '@angular/core';
import { PokemonDataService } from '../services/pokemon-data.service';
import { Pokemon } from './pokemon.module';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-pokemon-index',
  templateUrl: './pokemon-index.component.html',
  styleUrls: ['./pokemon-index.component.css']
})
export class PokemonIndexComponent implements OnInit, OnDestroy {

  pokemons;
  totalPokemonsNumber;
  favouritePkList = [];
  private pokemonsSubscription: Subscription;
  private favouritePkListSubcription: Subscription;

  constructor(
    private pokemonDataService: PokemonDataService,
    private userService: UserService

    ) { }

  ngOnInit() {
    this.pokemonDataService.getpokemons();
    this.pokemonsSubscription = this.pokemonDataService.getPokemonListener()
      .subscribe((response: {pokemons: any, totalPokemonsNumber: number }) => {
        this.pokemons = response.pokemons;
        this.totalPokemonsNumber = response.totalPokemonsNumber;
        console.log(this.pokemons);
      });
    this.userService.getCurrentUserFavouritePksByUserId(localStorage.getItem('userId'));
    this.favouritePkListSubcription = this.userService.getCurrentUserFavouritePksListener()
      .subscribe(response => {
        console.log(response);
        this.favouritePkList = response;
        console.log(this.favouritePkList);
      });
  }

  onFavour (pokemonId: string ) {
    if (this.userService.checkLocalAuth()) {
      console.log('I favoured this pokemon');
      this.userService.addFavouritePokemonById(pokemonId);
    } else {
      console.log('I can\'t favour this pokemon');
    }
  }

  onUnfavour (pokemonId: string ) {
    this.userService.removeFavouritePokemonById(pokemonId);
  }

  ngOnDestroy () {
    this.pokemonsSubscription.unsubscribe();
  }


}
