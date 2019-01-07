import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonIndexComponent } from './pokemon-index/pokemon-index.component';
import { PokemonDetailComponent } from './pokemon-index/pokemon-detail/pokemon-detail.component';
import { PokemonEditComponent } from './pokemon-index/pokemon-edit/pokemon-edit.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'pokemons', component: PokemonIndexComponent },
  { path: 'new', component: PokemonEditComponent},
  { path: 'pokemons/:id', component: PokemonDetailComponent},
  { path: 'pokemons/:id/edit', component: PokemonEditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'} )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
