import '../utils/testing';
import { trimLabel } from './trimLabel';

describe('trimLabel', () => {
  
  it('converts a number to a string when passed', () => {
    let number = 15;

    expect(trimLabel(number)).toEqual('15');
  });

  // hmm..not sure this is desired, but it's the currently implemented behavior
  it('returns empty string when untrimmable datatype is passed', () => {
    expect(trimLabel(()=>{})).toEqual('');
  });

  it('returns empty string when pssing null or undefined', () => {
    expect(trimLabel(undefined)).toEqual('');
    expect(trimLabel(null)).toEqual('');
  });

  it('returns the same string in case it is <= max length', () => {
    let text = 'Hi, try a2d3!';

    expect(trimLabel(text, 13)).toEqual(text);
  });

  it('should trim down to 16 chars by default', () => {
    let text = 'Hi, you should check out a2d3, DO IT!';
    let trimmedText = trimLabel(text);

    expect(trimmedText).toEqual('Hi, you should c...');
  });

  it('should trim the passed text to the given max length', () => {
    let text = 'Hi, a2d3 is cool!';

    let trimmedText = trimLabel(text, 8);
    expect(trimmedText).toEqual(`Hi, a2d3...`);
  });

});
