import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonIndexComponent } from './pokemon-index/pokemon-index.component';
import { PokemonDetailComponent } from './pokemon-index/pokemon-detail/pokemon-detail.component';
import { PokemonEditComponent } from './pokemon-index/pokemon-edit/pokemon-edit.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'index', component: PokemonIndexComponent },
  { path: ':id', component: PokemonDetailComponent},
  { path: ':id/edit', component: PokemonEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
