import { assert } from '@open-wc/testing';
import { sanitizeText } from '../../src/utils/sanitize.js';

suite('sanitizeText', () => {
  test('is defined', () => {
    assert.isFunction(sanitizeText);
  });

  test('should sanitize text', () => {
    const text = '<script>alert("Hello, world!");</script>';
    const expected = '';
    const result = sanitizeText(text);
    console.log("result", result);
    assert.equal(result, expected);
  });
});