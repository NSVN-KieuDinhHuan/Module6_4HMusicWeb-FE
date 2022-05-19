import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CommentPlaylist} from '../../model/comment-playlist';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CommentPlaylistService {

  constructor(private http: HttpClient) {
  }

  getAllCommentPlaylist(playlistId): Observable<CommentPlaylist[]> {
    return this.http.get<CommentPlaylist[]>(`${API_URL}/commentPlaylist/playlist/${playlistId}`);
  }

  createNewComment(playlistId, userId, commentPlaylist): Observable<CommentPlaylist> {
    return this.http.post<CommentPlaylist>(`${API_URL}/commentPlaylist?playlistId=${playlistId}&userId=${userId}`, commentPlaylist);
  }

  deleteComment(commentPlaylistId): Observable<CommentPlaylist> {
    return this.http.delete<CommentPlaylist>(`${API_URL}/commentPlaylist/${commentPlaylistId}`);
    // http://localhost:8080/commentPlaylist/playlist/2
  }
}
