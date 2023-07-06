import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SprintService {
  private url = 'http://localhost:3000/sprint/';
  private url1 = 'http://localhost:3000/tache';

  private url2= 'http://localhost:3000/projet';
  private url3= 'http://localhost:3000/biMembres';
  constructor(private http: HttpClient) { }

  getsprints(_id: string) {
    return this.http.get(`${this.url}/sprints/${_id}`);
  }
  addSprints(_id: string, sprints: any): Observable<any> {
    const url = `${this.url}/add/${_id}`;
    return this.http.post(url, sprints);
  }
  deleteSprints(_id: string) {
    return this.http.delete(`${this.url}sprints/${_id}`);
  }
  updatesprint(_id: string, sprints: any): Observable<any> {
    const url = `${this.url}sprints/${_id}`;
    return this.http.put(url, sprints);
  }
  getTaches(_id: string) {
    return this.http.get(`${this.url1}/taches/${_id}`);
  }
  updatetaches(_id: string, tache: any): Observable<any> {
    const url = `${this.url1}/tache/${_id}`;
    return this.http.put(url, tache);
  }
  addtaches(_id: string, tache: any): Observable<any> {
    const url = `${this.url1}/add/${_id}`;
    return this.http.post(url, tache);
  }
  getmembres(_id: string) {
    return this.http.get(`${this.url2}/gettt/${_id}`);
  }
  deletetaches(_id: string) {
    return this.http.delete(`${this.url1}/tache/${_id}`);
  }

  gettacheAfaire(memberId: string, projectId: string) {
    return this.http.get(`${this.url1}/aFaire/${memberId}/${projectId}`);
  }
  gettacheEnretard(memberId: string, projectId: string) {
    return this.http.get(`${this.url1}/retard1/${memberId}/${projectId}`);
  }
  gettacheEncours(memberId: string, projectId: string) {
    return this.http.get(`${this.url1}/enCours/${memberId}/${projectId}`);
  }
  gettacheTerminer(memberId: string, projectId: string) {
    return this.http.get(`${this.url1}/terminer/${memberId}/${projectId}`);
  }
  gettache(memberId: string) {
    return this.http.get(`${this.url1}/membrespartaches/${memberId}`);
  }
  gettachemembresatatut(memberId: string) {
    return this.http.get(`${this.url3}/calculer-taches11/${memberId}`);
  }
  getnbreprojetmembre(memberId: string) {
    return this.http.get(`${this.url3}/nombre-projets/${memberId}`);
  }
  gettachesparmois(memberId: string) {
    return this.http.get(`${this.url3}/taches-par-mois/${memberId}`);
  }

  getnbretachetmembre(memberId: string) {
    return this.http.get(`${this.url3}/nombre-taches/${memberId}`);
  }
}