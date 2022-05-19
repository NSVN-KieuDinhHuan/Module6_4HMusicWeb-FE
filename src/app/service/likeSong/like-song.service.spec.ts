import { TestBed } from '@angular/core/testing';

import { LikeSongService } from './like-song.service';

describe('LikeSongService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LikeSongService = TestBed.get(LikeSongService);
    expect(service).toBeTruthy();
  });
});
