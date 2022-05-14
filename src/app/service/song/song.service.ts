import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Song} from '../../model/song';
import {environment} from '../../../environments/environment';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private http: HttpClient) {
  }

  getAll(userId): Observable<Song[]> {
    return this.http.get<Song[]>(`${API_URL}/songs/user/${userId}`);
  }

  getSongById(userId, id): Observable<Song> {
    return this.http.get<Song>(`${API_URL}/songs/user/${userId}/${id}`);
  }

  createSong(song: FormData, userId): Observable<Song> {
    return this.http.post(`${API_URL}/songs/user/${userId}`, song);
  }

  editSong(userId, id, song: FormData): Observable<Song> {
    return this.http.put(`${API_URL}/songs/user/${userId}/${id}`, song);
  }

  deleteSong(userId, id): Observable<Song> {
    return this.http.delete<Song>(`${API_URL}/songs/user/${userId}/${id}`);
  }

  getAllSongForAllUser(): Observable<Song[]> {
    return this.http.get<Song[]>(`${API_URL}/songs`);
  }
}
