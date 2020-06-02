import { MovieStaticService } from './movie-static.service';
import { Movie } from '../model/movie';

const moviesMock: Movie[] = [
  {
    id: '1',
    comment: 'comment1',
    genre: 'genre1',
    plot: 'plot1',
    title: 'title1',
    year: 1111,
  },
  {
    id: '2',
    comment: 'comment2',
    genre: 'genre2',
    plot: 'plot2',
    title: 'title2',
    year: 2222,
  },
  {
    id: '3',
    comment: 'comment3',
    genre: 'genre3',
    plot: 'plot3',
    title: 'title3',
    year: 3333,
  },
];

const movieMock: Movie = {
  id: null,
  comment: 'comment4',
  genre: 'genre4',
  plot: 'plot4',
  title: 'title4',
  year: 4444,
};

describe('MovieStaticService', () => {
  let service: MovieStaticService;

  it('should be created', () => {
    service = new MovieStaticService();
    expect(service).toBeTruthy();
  });

  it('should return the movies list', () => {
    // Arrange
    service = new MovieStaticService();
    service.setMovies(moviesMock);
    // Act + Assert
    expect(service.movies).toEqual(moviesMock);
  });

  it('should return one movie by id', () => {
    // Arrange
    service = new MovieStaticService();
    service.setMovies(moviesMock);
    // Act + Assert
    expect(service.getMovie('1')).toEqual(moviesMock[0]);
  });

  it('should correctly create a movie', () => {
    // Arrange
    service = new MovieStaticService();
    service.setMovies(moviesMock);
    // Act
    const newMovie = service.createMovie(movieMock);
    // Assert
    expect(service.movies.length).toBe(moviesMock.length + 1);
    expect(newMovie.title).toBe(movieMock.title);
    expect(newMovie.genre).toBe(movieMock.genre);
  });

  it('should correctly update a movie', () => {
    // Arrange
    service = new MovieStaticService();
    service.setMovies(moviesMock);
    // Act
    service.updateMovie({
      ...moviesMock[0],
      title: 'new title',
    });
    // Assert
    expect(service.movies.length).toBe(moviesMock.length);
    expect(service.getMovie('1').title).toBe('new title');
    expect(service.getMovie('1').genre).toBe(moviesMock[0].genre);
  });

  it('should correctly update a comment', () => {
    // Arrange
    service = new MovieStaticService();
    service.setMovies(moviesMock);
    // Act
    service.updateComment('1', 'newComment');
    // Assert
    expect(service.getMovie('1').comment).toBe('newComment');
    expect(service.getMovie('1').genre).toBe(moviesMock[0].genre);
  });

  it('should correctly delete a movie', () => {
    // Arrange
    service = new MovieStaticService();
    service.setMovies(moviesMock);
    // Act
    service.deleteMovie('1');
    // Assert
    expect(service.movies.length).toBe(moviesMock.length - 1);
    expect(service.getMovie('1')).toBeUndefined();
  });
});
