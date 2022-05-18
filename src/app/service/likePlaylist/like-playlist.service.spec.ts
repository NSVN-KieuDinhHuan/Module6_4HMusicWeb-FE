import { TestBed } from '@angular/core/testing';

import { LikePlaylistService } from './like-playlist.service';

describe('LikePlaylistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LikePlaylistService = TestBed.get(LikePlaylistService);
    expect(service).toBeTruthy();
  });
});
