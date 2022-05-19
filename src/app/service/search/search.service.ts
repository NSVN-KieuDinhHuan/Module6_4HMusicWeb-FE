import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SearchItem} from '../../model/search-item';
import {Song} from '../../model/song';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) {
  }

  getSearchItem(q): Observable<SearchItem> {
    return this.http.get<SearchItem>(`${API_URL}/search?q=${q}`);
  }
}
