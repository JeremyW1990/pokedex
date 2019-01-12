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
  autoLogoutRef;
  constructor(
    private http: HttpClient,
    private router: Router) { }


  getAuthStateListener () {
    return this.authStatusListener.asObservable();
  }

  signup (user: any) {
    console.log('User to be submitted to backend for signup', user);
    this.http.post(environment.backend_URL + 'signup', user)
    .subscribe(response => {
      console.log(response);
      this.authStatusListener.next(true);
      this.router.navigate(['/']);
    }, (error) => {
      this.authStatusListener.next(false);
      console.log(error);
    });
  }

  login (user: any) {
    console.log('User to be submitted to backend for login', user);
    this.http.post<{message: string, token: string, expiresIn: number, userId: string, admin: boolean}>
    (environment.backend_URL + 'login', user)
    .subscribe(response => {

      const expiredTime = new Date(new Date().getTime() + response.expiresIn * 1000);
      console.log('expiredTime = ', expiredTime);
      this.setAuthTimeOut(response.expiresIn);
      localStorage.setItem('token', response.token);
      localStorage.setItem('expiredTime', expiredTime.toISOString());
      localStorage.setItem('userId', response.userId );
      localStorage.setItem('admin', response.admin.toString());

      this.authStatusListener.next(true);
      this.router.navigate(['/']);
    }, (error) => {
      console.log(error);
      this.authStatusListener.next(false);
    });
  }

  addFavouritePokemonById (pokemonId: string) {
    const data = {
      userId : this.getLocalStorageUserId(),
      pokemonId : pokemonId
    };
    console.log(data);
    // this.http.patch(environment.backend_URL + 'user/' + data.userId + '/addfavouritepk', data)
    //   .subscribe(response => {
    //     console.log(response);
    //   });
  }


  logout () {
    this.clearLocalStorage();
    this.authStatusListener.next(false);
    clearTimeout(this.autoLogoutRef);
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
      this.router.navigate(['/']);
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
      this.clearLocalStorage();
      clearTimeout(this.autoLogoutRef);
      return false;
  }}
}
