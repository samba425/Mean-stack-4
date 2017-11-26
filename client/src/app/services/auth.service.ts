import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
authtoken;
options;
dominurl = "";

  constructor(private http: Http) { }

authenticateHEaders() {
  this.loadtoken();
  this.options = new RequestOptions({
    headers: new Headers({
      'content-type' : 'application/json',
      'authorization': this.authtoken
    })
  })

}

loadtoken() {
  this.authtoken = localStorage.getItem('token');
}
register(data) {
  return this.http.post(this.dominurl + '/auth/register', data).map( x => x.json())
}

login(data) {
  return this.http.post(this.dominurl + '/auth/login',data ).map(x => x.json())
}

logOut() {
  this.authtoken = null;
  localStorage.clear();
}

storeToken(token,user ){
  localStorage.setItem('token',token);
  localStorage.setItem('user',JSON.stringify(user));
}

getProfile() {
  this.authenticateHEaders();
  return this.http.get(this.dominurl + '/auth/profile', this.options).map(res => res.json());
}

loggedIn(){
  return tokenNotExpired();
}
}
