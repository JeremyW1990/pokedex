import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PokemonDataService } from 'src/app/services/pokemon-data.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

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

    this.pokemonForm = new FormGroup({
      'id': new FormControl(this.id, Validators.required),
      'name': new FormControl(this.name, Validators.required),
      'imagePath': new FormControl(this.imagePath, Validators.required),
      'description': new FormControl(this.description, Validators.required),
    });
  }

}
