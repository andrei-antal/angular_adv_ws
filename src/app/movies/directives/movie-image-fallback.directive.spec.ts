import { MovieImageFallbackDirective } from './movie-image-fallback.directive';

describe('MovieImageFallbackDirective', () => {
  it('should create an instance', () => {
    const elRefMock = {
      nativeElement: document.createElement('img')
    };
    const directive = new MovieImageFallbackDirective(elRefMock);
    expect(directive).toBeTruthy();
  });
});
