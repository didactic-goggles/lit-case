import { assert } from '@open-wc/testing';
import { formatDate } from '../../src/utils/format-date.js';

suite('formatDate', () => {
  test('formats date correctly for Turkish locale', () => {    
    const date = "1995-04-28";
    const formatted = formatDate(date);
    
    assert.isString(formatted);
    assert.include(formatted, 'Nis');
    assert.include(formatted, '1995');
    assert.include(formatted, '28');
  });
});
