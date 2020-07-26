import { CustomDurationUtcPipe } from './custom-duration-utc.pipe';

describe('CustomDurationUtcPipe', () => {
  it('create an instance', () => {
    const pipe = new CustomDurationUtcPipe();
    expect(pipe).toBeTruthy();
  });
});
