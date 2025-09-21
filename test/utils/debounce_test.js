import {assert} from '@open-wc/testing';
import {debounce} from '../../src/utils/debounce.js';

suite('debounce', () => {
  test('is defined', () => {
    assert.isFunction(debounce);
  });

  test('with delay', (done) => {
    let callCount = 0;
    const testFunction = () => {
      callCount++;
    };

    const debouncedFunction = debounce(testFunction, 10);
    debouncedFunction();

    setTimeout(() => {
      assert.equal(callCount, 1);
      done();
    }, 20);
  });

  test('without delay', () => {
    let callCount = 0;
    const testFunction = () => {
      callCount++;
    };

    const debouncedFunction = debounce(testFunction, 100);
    debouncedFunction();

    assert.equal(callCount, 0);
  });
});
