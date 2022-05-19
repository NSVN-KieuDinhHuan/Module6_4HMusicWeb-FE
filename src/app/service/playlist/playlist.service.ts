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
  createPlaylist(playlist, userId): Observable<PlayList> {
    return this.http.post<PlayList>(`${API_URL}/playlists/user/${userId}`, playlist);
  }

  editPlaylist(playlist, id): Observable<PlayList> {
    return this.http.put<PlayList>(`${API_URL}/playlists/editPlaylist/${id}`, playlist);
  }

  deletePlaylist(id): Observable<PlayList> {
    return this.http.delete<PlayList>(`${API_URL}/playlists/${id}`);
  }

  addSongToPlaylist(songId, playlistId): Observable<PlayList> {
    return this.http.post<PlayList>(`${API_URL}/playlists/addSong?songId=${songId}&playlistId=${playlistId}`, true);
  }

  removeSongFromPlaylist(songId, playlistId): Observable<PlayList> {
    return this.http.post<PlayList>(`${API_URL}/playlists/removeSong?songId=${songId}&playlistId=${playlistId}`, true);
  }
}
