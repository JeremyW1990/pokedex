import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PokemonIndexComponent } from './pokemon-index/pokemon-index.component';
import { PokemonDetailComponent } from './pokemon-index/pokemon-detail/pokemon-detail.component';
import { PokemonEditComponent } from './pokemon-index/pokemon-edit/pokemon-edit.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserModule } from './user/user.module';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { ClickOutsideDirective } from './shared/click-outside.directive';


@NgModule({
  declarations: [
    HeaderComponent,
    AppComponent,
    HeaderComponent,
    PokemonIndexComponent,
    PokemonDetailComponent,
    PokemonEditComponent,
    HomeComponent,
    ClickOutsideDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    UserModule,
    AngularMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
