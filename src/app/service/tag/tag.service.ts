import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Artist} from '../../model/artist';
import {environment} from '../../../environments/environment';
import {Tag} from '../../model/tag';
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) {
  }

  getAllTag(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${API_URL}/tags`);
  }
}
