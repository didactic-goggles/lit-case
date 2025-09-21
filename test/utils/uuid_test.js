import {assert} from '@open-wc/testing';
import {generateUUID} from '../../src/utils/uuid.js';

suite('generateUUID', () => {
  test('is defined', () => {
    assert.isFunction(generateUUID);
  });

  test('should return 1 for an empty array', () => {
    const arr = [];
    const id = generateUUID(arr);

    assert.equal(id, 1);
  });

  test('should return max id in array + 1', () => {
    const arr = [{id: 1}, {id: 2}, {id: 5}];
    const id = generateUUID(arr);

    assert.equal(id, 6);
  });

  test('should use prevId when provided and increment by 1', () => {
    const arr = [{id: 1}, {id: 2}];
    const id = generateUUID(arr, 5);

    assert.equal(id, 6);
  });

  test('should skip duplicate ids and return the next available id', () => {
    const arr = [{id: 1}, {id: 2}, {id: 3}];
    const id = generateUUID(arr, 2);

    assert.isTrue(id > 3);
  });
});
