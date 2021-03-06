import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  authStatusListener = new Subject<{isLogin: boolean, isAdmin: boolean}>();
  currentUserFavouritePksListener = new Subject<Array<String>>();
  autoLogoutRef;
  constructor(
    private http: HttpClient,
    private router: Router) { }


  getAuthStateListener () {
    return this.authStatusListener.asObservable();
  }

  getCurrentUserFavouritePksListener () {
    return this.currentUserFavouritePksListener.asObservable();
  }

  signup (user: any) {
    console.log('User to be submitted to backend for signup', user);
    this.http.post(environment.backend_URL + 'user/signup', user)
    .subscribe(response => {
      console.log(response);
      this.authStatusListener.next({isLogin: true, isAdmin: false});
      this.router.navigate(['/pokemons']);
    }, (error) => {
      this.authStatusListener.next({isLogin: false, isAdmin: false});
      console.log(error);
    });
  }

  login (user: any) {
    console.log('User to be submitted to backend for login', user);
    this.http.post<
      {
        message: string,
        token: string,
        expiresIn: number,
        userId: string,
        isAdmin: boolean,
        favouritePkList: Array<String>
      }>
    (environment.backend_URL + 'user/login', user)
    .subscribe(response => {

      console.log(response);
      const expiredTime = new Date(new Date().getTime() + response.expiresIn * 1000);
      console.log('expiredTime = ', expiredTime);
      this.setAuthTimeOut(response.expiresIn);
      localStorage.setItem('email', user.email);
      localStorage.setItem('token', response.token);
      localStorage.setItem('expiredTime', expiredTime.toISOString());
      localStorage.setItem('userId', response.userId );
      localStorage.setItem('isAdmin', response.isAdmin.toString());

      this.currentUserFavouritePksListener.next(response.favouritePkList);
      this.authStatusListener.next({isLogin: true, isAdmin: response.isAdmin});
      this.router.navigate(['/pokemons']);
    }, (error) => {
      console.log(error);
      this.authStatusListener.next({isLogin: false, isAdmin: false});
    });
  }

  getCurrentUserFavouritePksByUserId (userId: string) {
    console.log('getCurrentUserFavouritePksByUserId - ', {userId} );
    this.http.post<
    {
      message: string,
      favouritePkList: Array<String>
    }>(environment.backend_URL + 'user/getfavouritepklist', {userId})
      .subscribe(response => {
        console.log('getCurrentUserFavouritePksByUserId response - ', response);
        this.currentUserFavouritePksListener.next(response.favouritePkList);
      });
  }
  addFavouritePokemonById (pokemonId: string) {
    const data = {
      userId : this.getLocalStorageUserId(),
      pokemonId : pokemonId
    };
    console.log(data);
    this.http.patch<
    {
      message: string,
      favouritePkList: Array<String>
    }>(environment.backend_URL + 'user/addfavouritepk', data)
      .subscribe(response => {
        console.log(response);
        this.currentUserFavouritePksListener.next(response.favouritePkList);
      });
  }

  removeFavouritePokemonById(pokemonId: string) {
    const data = {
      userId : this.getLocalStorageUserId(),
      pokemonId : pokemonId
    };
    console.log(data);
    this.http.patch<
    {
      message: string,
      favouritePkList: Array<String>
    }>(environment.backend_URL + 'user/removefavouritepk', data)
      .subscribe(response => {
        console.log(response);
        this.currentUserFavouritePksListener.next(response.favouritePkList);
      });
  }

  logout () {
    this.clearLocalStorage();
    this.authStatusListener.next({isLogin: false, isAdmin: false});
    clearTimeout(this.autoLogoutRef);
    this.currentUserFavouritePksListener.next([]);
    this.router.navigate(['/pokemons']);
  }

  getLocalStorageEmail () {
    return localStorage.getItem('email');
  }

  getLocalStorageToken () {
    return localStorage.getItem('token');
  }

  getLocalStorageExpiredTime () {
    return new Date(localStorage.getItem('expiredTime'));
  }

  getLocalStorageUserId () {
    return localStorage.getItem('userId');
  }

  getLocalStorageisAdmin () {
    return localStorage.getItem('isAdmin') === 'true' ? true : false;
  }


  private clearLocalStorage () {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('expiredTime');
    localStorage.removeItem('userId');
    localStorage.removeItem('isAdmin');
  }

  private setAuthTimeOut (duration: number) {
    this.autoLogoutRef = setTimeout(() => {
      this.clearLocalStorage();
      this.authStatusListener.next({isLogin: true, isAdmin: false});
      this.router.navigate(['/pokemons']);
    }, duration * 1000);
  }

  checkLocalAuth () {
    const updatedTimeDuration = this.getLocalStorageExpiredTime().getTime() -
    (new Date()).getTime();
    if (this.getLocalStorageToken() &&
      updatedTimeDuration > 0) {
      this.setAuthTimeOut(updatedTimeDuration / 1000);
        this.authStatusListener.next({isLogin: true, isAdmin: this.getLocalStorageisAdmin()});
        return true;
    } else {
      this.authStatusListener.next({isLogin: false, isAdmin: false});
      this.currentUserFavouritePksListener.next([]);
      this.clearLocalStorage();
      clearTimeout(this.autoLogoutRef);
      return false;
  }}
}
