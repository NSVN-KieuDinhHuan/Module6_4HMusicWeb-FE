import { TestBed } from '@angular/core/testing';

import { CommentSongService } from './comment-song.service';

describe('CommentSongService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommentSongService = TestBed.get(CommentSongService);
    expect(service).toBeTruthy();
  });
});
