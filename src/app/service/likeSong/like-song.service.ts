import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LikePlaylist} from '../../model/like-playlist';
import {environment} from '../../../environments/environment';
import {LikeSong} from '../../model/like-song';
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class LikeSongService {

  constructor(private http: HttpClient) {
  }

  getLike(songId, userId): Observable<LikeSong> {
    return this.http.get<LikeSong>(`${API_URL}/likeSong/song/${songId}/user/${userId}`);
  }

  getAllLike(songId): Observable<LikeSong[]> {
    return this.http.get<LikeSong[]>(`${API_URL}/likeSong/song/${songId}`);
  }

  addLike(songId, userId): Observable<LikeSong> {
    return this.http.post<LikeSong>(`${API_URL}/likeSong/addLikeSong/song/${songId}/user/${userId}`, true);
  }

  deleteLike(songId, userId): Observable<LikeSong> {
    return this.http.delete<LikeSong>(`${API_URL}/likeSong/deleteLikeSong/song/${songId}/user/${userId}`);
  }

  addDefaultLike(songId, userId): Observable<LikeSong> {
    return this.http.post <LikeSong>(`${API_URL}/likeSong/addDefaultLike/song/${songId}/user/${userId}`, true);
  }

  changeLikeStatus(songId, userId): Observable<LikeSong> {
    return this.http.put<LikeSong>(`${API_URL}/likeSong/changeLikeStatus/song/${songId}/user/${userId}`, true);
  }
}
