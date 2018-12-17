import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PokemonIndexComponent } from './pokemon-index/pokemon-index.component';
import { PokemonDetailComponent } from './pokemon-index/pokemon-detail/pokemon-detail.component';
import { PokemonEditComponent } from './pokemon-index/pokemon-edit/pokemon-edit.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    HeaderComponent,
    AppComponent,
    HeaderComponent,
    PokemonIndexComponent,
    PokemonDetailComponent,
    PokemonEditComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
