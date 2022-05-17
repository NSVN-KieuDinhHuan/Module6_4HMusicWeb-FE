import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CommentSong} from '../../model/comment-song';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CommentSongService {

  constructor(private http: HttpClient) {
  }

  getAllCommentBySongId(songId): Observable<CommentSong[]> {
    return this.http.get<CommentSong[]>(`${API_URL}/commentSong/${songId}`);
  }

  createNewComment(songId, userId, commentSong): Observable<CommentSong> {
    return this.http.post<CommentSong>(`${API_URL}/commentSong?songId=${songId}&userId=${userId}`, commentSong);
  }

  deleteComment(commentSongId): Observable<CommentSong> {
    return this.http.delete<CommentSong>(`${API_URL}/commentSong/${commentSongId}`);
  }
}
