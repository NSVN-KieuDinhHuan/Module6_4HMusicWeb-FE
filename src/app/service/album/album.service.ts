import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Artist} from '../../model/artist';
import {Album} from '../../model/album';
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private http: HttpClient) { }
  getAllAlbum(): Observable<Album[]> {
    return this.http.get<Album[]>(`${API_URL}/albums`);
  }
}