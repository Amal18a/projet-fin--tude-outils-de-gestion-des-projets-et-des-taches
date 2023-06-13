

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BacklogService {
  private url = 'http://localhost:3000/userStory';

  constructor(private http: HttpClient) { } 

  getBacklogs(_id: string) {
    return this.http.get(`${this.url}/userstories/${_id}`);
  }
  addUserStory(_id: string, userStoryData: any): Observable<any> {
    const url =` ${this.url}/add/${_id}`;
    return this.http.post(url, userStoryData);
  }
  deleteUserStory(_id: string) {
    return this.http.delete(`${this.url}/delete/${_id}`);
  }
  updateUserStory(_id: string, userStory: any): Observable<any> {
    const url = `${this.url}/userstory/${_id}`;
    return this.http.put(url, userStory);
  }

 
}
