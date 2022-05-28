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

  getAll(): Observable<Song[]> {
    return this.http.get<Song[]>(`${API_URL}/songs/user`);
  }

  getSongById( id): Observable<Song> {
    return this.http.get<Song>(`${API_URL}/songs/${id}`);
  }

  createSong(song: FormData, userId): Observable<Song> {
    return this.http.post(`${API_URL}/songs/user`, song);
  }

  editSong(userId, id, song: FormData): Observable<Song> {
    return this.http.post(`${API_URL}/songs/user/${id}`, song);
  }

  deleteSong(id): Observable<Song> {
    return this.http.delete<Song>(`${API_URL}/songs/${id}`);
  }

  getAllSongForAllUser(): Observable<Song[]> {
    return this.http.get<Song[]>(`${API_URL}/songs`);
  }

  getTopViewSongList(): Observable<Song[]> {
    return this.http.get<Song[]>(`${API_URL}/songs/getMostViewSongs`);
  }

  getTopViewSong(): Observable<Song> {
    return this.http.get<Song>(`${API_URL}/songs/getTopViewSong`);
  }

  getTopLikeSongList(): Observable<Song[]> {
    return this.http.get<Song[]>(`${API_URL}/songs/getTopLikeSong`);
  }
  getTopLikeSongNumer(): Observable<number[]> {
    return this.http.get<number[]>(`${API_URL}/songs/getTopLikeNumber`);
  }
  addview(id): Observable<Song> {
    return this.http.post(`${API_URL}/songs/views/${id}`,null);
  }
  getAllSongForAllArtist(artistId): Observable<Song[]> {
    return this.http.get<Song[]>(`${API_URL}/songs/artist/${artistId}`);
  }
}
