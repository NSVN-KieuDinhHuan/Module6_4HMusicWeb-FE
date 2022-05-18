import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LikePlaylist} from '../../model/like-playlist';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class LikePlaylistService {

  constructor(private http: HttpClient) {
  }

  getLikePlaylist(playlistId, userId): Observable<LikePlaylist> {
    return this.http.get<LikePlaylist>(`${API_URL}/likePlaylist/playlist/${playlistId}/user/${userId}`);
  }

  getAllLikePlaylist(playlistId): Observable<LikePlaylist[]> {
    return this.http.get<LikePlaylist[]>(`${API_URL}/likePlaylist/playlist/${playlistId}`);
  }

  addLike(playlistId, userId): Observable<LikePlaylist> {
    return this.http.post<LikePlaylist>(`${API_URL}/likePlaylist/addLikePlaylist/playlist/${playlistId}/user/${userId}`, true);
  }

  deleteLike(playlistId, userId): Observable<LikePlaylist> {
    return this.http.delete<LikePlaylist>(`${API_URL}/likePlaylist/deleteLikePlaylist/playlist/${playlistId}/user/${userId}`);
  }

  addDefaultLike(playlistId, userId): Observable<LikePlaylist> {
    return this.http.post <LikePlaylist>(`${API_URL}/likePlaylist/addDefaultLike/playlist/${playlistId}/user/${userId}`, true);
  }

  changeLikeStatus(playlistId, userId): Observable<LikePlaylist> {
    return this.http.put<LikePlaylist>(`${API_URL}/likePlaylist/changeLikeStatus/playlist/${playlistId}/user/${userId}`, true);
  }
}
