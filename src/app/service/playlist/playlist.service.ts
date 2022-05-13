import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PlayList} from '../../model/play-list';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private http: HttpClient) {
  }

  getAllPlaylist(): Observable<PlayList[]> {
    return this.http.get<PlayList[]>(`${API_URL}/playlists`);
  }

  getAllPlaylistByUser(userId): Observable<PlayList[]> {
    return this.http.get<PlayList[]>(`${API_URL}/playlists/user/${userId}`);
  }

  getPlaylistById(playlistId): Observable<PlayList> {
    return this.http.get<PlayList>(`${API_URL}/playlists/${playlistId}`);
  }
}
