import {assert} from '@open-wc/testing';
import {Router} from '@vaadin/router';
import {
  setSearchFilters,
  getSearchFilters,
} from '../../src/utils/search-filters.js';

suite('searchFilters', () => {
  let originalGo;
  let goCalls = [];

  function setQuery(q = '?view=table') {
    const path = window.location.pathname || '/';
    const hash = window.location.hash || '';
    const normalized = q ? (q.startsWith('?') ? q : `?${q}`) : '';
    window.history.replaceState({}, '', `${path}${normalized}${hash}`);
  }

  setup(() => {
    setQuery('?view=table');

    originalGo = Router.go;
    goCalls = [];
    Router.go = (url) => {
      goCalls.push(url);
    };
  });

  teardown(() => {
    Router.go = originalGo;
    setQuery('');
  });

  test('setSearchFilters is defined', () => {
    assert.isFunction(setSearchFilters);
  });

  test('getSearchFilters is defined', () => {
    assert.isFunction(getSearchFilters);
  });

  test('getSearchFilters returns value of existing key', () => {
    const value = getSearchFilters('view');
    assert.equal(value, 'table');
  });

  test('getSearchFilters returns null for missing key', () => {
    const value = getSearchFilters('vieww');
    assert.isNull(value);
  });

  test('setSearchFilters updates an existing key', () => {
    setSearchFilters('view', 'grid');

    assert.equal(goCalls.length, 1, 'Router.go should be called once');
    const newUrl = goCalls[0];
    assert.include(newUrl, '/?');
    assert.include(newUrl, 'view=grid');
  });

  test('setSearchFilters deletes key when value is empty string', () => {
    setSearchFilters('view', '');

    assert.equal(goCalls.length, 1);
    const newUrl = goCalls[0];
    assert.include(newUrl, '/?');
    assert.notInclude(newUrl, 'view=');
  });
});
