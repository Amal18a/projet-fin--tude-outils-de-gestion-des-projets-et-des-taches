import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable, window } from 'rxjs';
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient  ) { }
  private url ='http://localhost:3000/util/';


  connexion(utili:any){
    return this.http.post(this.url+'connexion', utili);
   }

  isLoggedIn(){
    let token=localStorage.getItem('token');
    // console.log('token:', token);
    if(token){
      return true;
    }else{
      return false;
    }
  }
  
  getDataUser(){
    let token = localStorage.getItem('token');
    // console.log('token:', token);
    if(token){
      let data = JSON.parse(
        decodeURIComponent(
          atob(token.split('.')[1])
            .split('')
            .map((char) => '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        )
      );
      // console.log('data:', data);
      return data;
    }
  }
  getbyId(utilid:any){
    return this.http.get(this.url +'getbyid/' +utilid);
  }
  
  updateProfile(_id: string, formData: FormData): Observable<any> {
    const url = `${this.url}/updatebyid/${_id}`;
    return this.http.put<any>(url, formData);
  }
 
  
  
  getbycin(cin:any){
    return this.http.get(this.url +'getbycin/' +cin);
  }


  getRole(){
    let token = localStorage.getItem('token');
    console.log('token:', token);
    if(token){
      let decodedToken: any = jwt_decode(token);
      console.log('decodedToken:', decodedToken);
      return decodedToken.role;
    }
    

}


getRoleAndId() {
  const token = localStorage.getItem('token');

  if (token) {
    const decodedToken: any = jwt_decode(token);
    console.log('decodedToken:', decodedToken);
    const role = decodedToken.role;
    console.log(role);
    const utilid = decodedToken.utilid;
    const prenom = decodedToken.prenom;
    console.log("amal",utilid);
    console.log("prenom",prenom);
    return { role, utilid , prenom};
    
   
  }
  return null;
}

}  