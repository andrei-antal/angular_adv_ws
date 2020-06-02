import { WordCountPipe } from './word-count.pipe';

describe('WordCountPipe', () => {
  it('create an instance', () => {
    const pipe = new WordCountPipe();
    expect(pipe).toBeTruthy();
  });

  it('should correctly count the number of words in a text with a few words', () => {
    // Arrange
    const pipe = new WordCountPipe();
    const testString = 'This is a comment.';
    // Act + Assert
    expect(pipe.transform(testString)).toBe('4 words');
  });

  it('should correctly count the number of words in an empty text', () => {
    // Arrange
    const pipe = new WordCountPipe();
    const testString = '';
    // Act + Assert
    expect(pipe.transform(testString)).toBe('0 words');
  });

  it('should correctly calculate words when multiple spaces are present between words', () => {
    // Arrange
    const pipe = new WordCountPipe();
    const testString = 'Lots     of   spaces        between words';
    // Act + Assert
    expect(pipe.transform(testString)).toBe('5 words');
  });

  it('should correctly set the suffix', () => {
    // Arrange
    const pipe = new WordCountPipe();
    const testString = 'Testing the suffix';
    // Act + Assert
    expect(pipe.transform(testString, 'w')).toBe('3 w');
  });

  it('should correctly handle texts with newlines', () => {
    // Arrange
    const pipe = new WordCountPipe();
    const testString = 'A text with\nnew   \n\n\nlines';
    // Act + Assert
    expect(pipe.transform(testString)).toBe('5 words');
  });
});
