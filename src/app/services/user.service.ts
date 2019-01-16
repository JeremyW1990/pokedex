import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  authStatusListener = new Subject<boolean>();
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
      this.authStatusListener.next(true);
      this.router.navigate(['/pokemons']);
    }, (error) => {
      this.authStatusListener.next(false);
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
        admin: boolean,
        favouritePkList: Array<String>
      }>
    (environment.backend_URL + 'user/login', user)
    .subscribe(response => {

      console.log(response);
      const expiredTime = new Date(new Date().getTime() + response.expiresIn * 1000);
      console.log('expiredTime = ', expiredTime);
      this.setAuthTimeOut(response.expiresIn);
      localStorage.setItem('token', response.token);
      localStorage.setItem('expiredTime', expiredTime.toISOString());
      localStorage.setItem('userId', response.userId );
      localStorage.setItem('admin', response.admin.toString());

      this.currentUserFavouritePksListener.next(response.favouritePkList);
      this.authStatusListener.next(true);
      this.router.navigate(['/pokemons']);
    }, (error) => {
      console.log(error);
      this.authStatusListener.next(false);
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
        console.log("getCurrentUserFavouritePksByUserId response - ", response);
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
        this.currentUserFavouritePksListener.next(response.favouritePkList);
      });
  }


  logout () {
    this.clearLocalStorage();
    this.authStatusListener.next(false);
    clearTimeout(this.autoLogoutRef);
    this.currentUserFavouritePksListener.next([]);
    this.router.navigate(['/']);
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

  getLocalStorageAdmin () {
    return localStorage.getItem('admin') === 'true' ? true : false;
  }


  private clearLocalStorage () {
    localStorage.removeItem('token');
    localStorage.removeItem('expiredTime');
    localStorage.removeItem('userId');
    localStorage.removeItem('admin');
  }

  private setAuthTimeOut (duration: number) {
    this.autoLogoutRef = setTimeout(() => {
      this.clearLocalStorage();
      this.authStatusListener.next(false);
      this.router.navigate(['/pokemons']);
    }, duration * 1000);
  }

  checkLocalAuth () {
    const updatedTimeDuration = this.getLocalStorageExpiredTime().getTime() -
    (new Date()).getTime();
    if (this.getLocalStorageToken() &&
      updatedTimeDuration > 0) {
      this.setAuthTimeOut(updatedTimeDuration / 1000);
        this.authStatusListener.next(true);
        return true;
    } else {
      this.authStatusListener.next(false);
      this.currentUserFavouritePksListener.next([]);
      this.clearLocalStorage();
      clearTimeout(this.autoLogoutRef);
      return false;
  }}
}
