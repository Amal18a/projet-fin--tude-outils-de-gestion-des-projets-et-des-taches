import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map ,Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProjetserviceService {
  private apiUrl = 'http://localhost:3000/projet/teams';
  private url = 'http://localhost:3000/projet/';
  private url1 = 'http://localhost:3000/util/';
  private url2 = 'http://localhost:3000/userStory/';
  private url3 = 'http://localhost:3000/biProj/';
  private url4 = 'http://localhost:3000/biAdmin/';
  private url5 = 'http://localhost:3000/biChef/';
  constructor(private http: HttpClient) { }


  

  addProjet(nom: string, description: string, membres: string[], date_debut: Date, date_fin : Date , complexite:string, type:string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const body = { nom, description, membres, date_debut, date_fin,complexite , type};
    return this.http.post<any>(this.apiUrl, body, { headers });
  }
  getAll(): Observable<any> {
    return this.http.get(this.url + 'all14');
  }
  deleteUtil(_id: string) {
    return this.http.delete(this.url+'delete/'+_id);
  }
  getMembres(): Observable<any> {
    return this.http.get(this.url1+'/membres' ,  { params: { fields: '_id,nom,prenom' }});
  }

  updateprojet(_id: string, projet: any): Observable<any> {
    const url = `${this.url}projet1/${_id}`;
    return this.http.put(url, projet);
  }

  getProjetByNom(nom: string): Observable<any> {
    const url = `${this.url}rechercher/${nom}`;
    return this.http.get<any>(url);
  }
  getByid(_id: string): Observable<any> {
    return this.http.get<any>(`${this.url}projets/${_id}`);
  }
  getttByid(_id: string): Observable<any> {
    return this.http.get<any>(`${this.url}get/${_id}`);
  }
  updateUtil(_id: string, formData: FormData): Observable<any> {
    const url =`${this.url}/projet/${_id}`;
    return this.http.put<any>(url, formData);
  }
  membres(_id: string): Observable<any> {
    return this.http.get<any>(`${this.url}gettt/${_id}`);
  }
  
  addUserStory(projetId: string, userStoryData: any): Observable<any> {
    const url = `${this.url2}add/${projetId}`;
    return this.http.post(url, userStoryData);
  }
  
  getBacklogs(_id: string) {
    return this.http.get(`${this.url2}userstories/${_id}`);
  }
  updateProjet(projet: any, id: string) {
    return this.http.put(`/url/projet1/${id}`, projet);
}
ajouterMembreAuProjet(projetId: string, requestBody: any) {
  const url = `${this.url}membres/${projetId}`;

  return this.http.post(url, requestBody);
}
supprimerMembreDuProjet(projetId: string, membreId: string): Observable<any> {
  const url = `${this.url}/membres/${projetId}`;
  return this.http.delete(url, { body: { id: membreId } });
}

getProjetsByChefId(id: string): Observable<any> {
  return this.http.get(`${this.url}all3/${id}`)
}


getProjetsBymembreId(id: string): Observable<any> {
  return this.http.get(`${this.url}all2/${id}`)
}



// getProjetsBymembreId(id: string): Observable<any[]> {
//   return this.http.get(`${this.url}all2/${id}`)
//     .pipe(map((res: any) => {
//       const projets = res.map((projet: any) => {
//         if (new Date(projet.date_debut) <= new Date() && new Date(projet.date_fin) > new Date()) {
//           projet.statut = 'En cours';
//         } else if (new Date(projet.date_fin) <= new Date()) {
//           projet.statut = 'Terminé';
//         } else {
//           projet.statut = 'à venir';
//         }
//         return projet;
//       });
//       return projets;
//     }));
// }







getNombreSprints(projetId: string): Observable<number> {
  return this.http.get<any>(`${this.url3}nbsprints/${projetId}`).pipe(
    map(response => response.nbreSprints)
  );
}
getNombreMembres(projetId: string): Observable<number> {
  return this.http.get<any>(`${this.url3}nbmembres/${projetId}`).pipe(
    map(response => response.nbreMembres)
  );
}
getNombreTaches(projetId: string): Observable<number> {
  return this.http.get<any>(`${this.url3}nombretaches/${projetId}`).pipe(
    map(response => response.nombreTaches)
  );
}
getSprintStatut(projetId: string): Observable<number> {
  return this.http.get<any>(`${this.url3}nombre-sprints/${projetId}`).pipe(
    map(response => response.resultat)
  );
}


getMembresTaches(projetId: string): Observable<any> {
  const url = `${this.url}/membres/${projetId}`;
  return this.http.get<any>(url);
}
getMembresMax(): Observable<any> {
  const url = `${this.url4}nombre-max-taches-par-membre`;
  return this.http.get<any>(url);
}
getnbreTacheMembre(): Observable<any> {
  const url = `${this.url4}nombre-max-taches-par-membre`;
  return this.http.get<any>(url);
}

getprojetsparmois(): Observable<any> {
  const url = `${this.url4}nombre-par-mois`;
  return this.http.get<any>(url);
}

getNombreProjets(): Observable<any> {
  return this.http.get<any>(`${this.url4}/projetsnb`);
}
getNombreUtils(): Observable<any> {
  return this.http.get<any>(`${this.url4}/utilsnb`);
}

getnbreproj30j(): Observable<any> {
  return this.http.get<any>(`${this.url4}/projets-derniers-30-jours`);
}
getnbreprojetparchef(): Observable<any> {
  return this.http.get<any>(`${this.url4}/nombre-projets-par-chef`);
}
getProjetsParMois(): Observable<any[]> {
  return this.http.get<any[]>(`${this.url}/projets-par-mois`);
}

getProjetsRetard(id:string): Observable<any> {
  return this.http.get(`${this.url}projetsretard/${id}`)
}



//bi chef 
getProjeStatut(id:string): Observable<any> {
  return this.http.get(`${this.url5}nombre/${id}`)
}

getnombreProjetChef(id:string): Observable<any> {
  return this.http.get(`${this.url5}nombre-total/${id}`)
}
getnombreProjetParMois(id:string): Observable<any> {
  return this.http.get(`${this.url5}projets-nombre-par-mois/${id}`)
}
getProgression(id:string): Observable<any> {
  return this.http.get(`${this.url5}pourcentage-termine/${id}`)
}
}



