import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon.module';
import { PokemonDataService } from 'src/app/services/pokemon-data.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})

export class PokemonDetailComponent implements OnInit {

  private pokemon;
  private id: number;

  constructor(
    private pokemonDataService: PokemonDataService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.pokemon = this.pokemonDataService.getPokemonById(this.id);
      console.log(this.pokemon);
    });
  }

}