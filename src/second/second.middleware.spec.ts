import { SecondMiddleware } from './second.middleware';

describe('SecondMiddleware', () => {
  it('should be defined', () => {
    expect(new SecondMiddleware()).toBeDefined();
  });
});
