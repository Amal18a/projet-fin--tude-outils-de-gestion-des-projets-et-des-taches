import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface Utilisateur {
  cin: string;
  nom: string;
  prenom: string;
  email: string;
  role : string ; 
  image: File;
  
}
@Injectable({
  providedIn: 'root'
})
export class UtilService {
  getUtils() {
    throw new Error('Method not implemented.');
  }
  private url = 'http://localhost:3000/util/';
 

  constructor(private http: HttpClient) { }

  
  getAll(): Observable<any> {
    return this.http.get(this.url + 'all');
  }
  deleteUtil(cin: string) {
    return this.http.delete(this.url+'deletebycin/'+cin);
  }
  updateUtil(cin: string, updatedUtil: any): Observable<any> {
    const url = `${this.url}/updatebycin/${cin}`;
    return this.http.put<any>(url, updatedUtil);
  }
  
  addUtil(utili:any){
    return this.http.post(this.url +'addd', utili);
 
}



getMembre(): Observable<any>{
  return this.http.get(this.url +'membres');
}
getByCin(cin: string): Observable<any> {
  return this.http.get<any>(`${this.url}getbycin/${cin}`);
}
updatePassword1(id: string, newPassword: string): Observable<any> {
  const url = `${this.url}updatebyid1/${id}`;
  const body = { mot_de_passe: newPassword };

  return this.http.put(url, body);
}
}
