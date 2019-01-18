import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PokemonDataService } from 'src/app/services/pokemon-data.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pokemon-edit',
  templateUrl: './pokemon-edit.component.html',
  styleUrls: ['./pokemon-edit.component.css']
})
export class PokemonEditComponent implements OnInit {
  id: number;
  name: string;
  imagePath: string;
  description: string;
  editMode = false;
  pokemonForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private pokemonDataService: PokemonDataService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  onSubmit() {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']);
    if (this.editMode) {
      this.pokemonDataService.updatePokemonById(this.id, this.pokemonForm.value);
    } else {
      this.pokemonDataService.addNewPokemon(this.pokemonForm.value);
    }
  }


  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {


    if (this.editMode) {
      this.pokemonDataService.getPokemonById(this.id)
        .subscribe(response => {
          this.pokemonForm.patchValue({
            name: response.pokemon.name,
            imagePath:  response.pokemon.imagePath,
            description: response.pokemon.description
          });
        });
    }

    this.id = 4;
    this.name = '4';
    this.imagePath = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png';
    // tslint:disable-next-line:max-line-length
    this.description = 'The flame that burns at the tip of its tail is an indication of its emotions. The flame wavers when Charmander is enjoying itself. If the Pokémon becomes enraged, the flame burns fiercely.';
    this.pokemonForm = new FormGroup({
      'id': new FormControl(this.id, [Validators.required], this.duplicatedPokemonId.bind(this)),
      'name': new FormControl(this.name, Validators.required),
      'imagePath': new FormControl(this.imagePath, Validators.required),
      'description': new FormControl(this.description, Validators.required),
    });
  }

  duplicatedPokemonId(control: FormControl): Promise<any> | Observable<any> {

    const promise = new Promise<any>((resolve, reject) => {
      const obs = this.pokemonDataService.getPokemonById(control.value)
        .subscribe(response => {
          if (response.pokemon) {
            resolve({'DuplicatedPokemonID': true});
          } else {
            resolve(null);
          }
        });
      });

    return promise;
  }
}
