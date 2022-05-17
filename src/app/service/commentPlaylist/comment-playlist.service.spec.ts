import { TestBed } from '@angular/core/testing';

import { CommentPlaylistService } from './comment-playlist.service';

describe('CommentPlaylistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommentPlaylistService = TestBed.get(CommentPlaylistService);
    expect(service).toBeTruthy();
  });
});
