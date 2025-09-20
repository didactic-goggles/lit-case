import {Router} from '@vaadin/router';

export const setSearchFilters = (key, value) => {
  const urlParams = new URLSearchParams(window.location.search);
  if (value === '') {
    urlParams.delete(key);
  } else {
    urlParams.set(key, value);
  }
  const newURL = `${window.location.pathname}?${urlParams.toString()}`;
  Router.go(newURL);
};

export const getSearchFilters = (key) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(key);
};

export const setMultipleSearchFilters = (filters) => {
  const urlParams = new URLSearchParams(window.location.search);
  filters.forEach(([key, value]) => {
    if (value === '') {
      urlParams.delete(key);
    } else {
      urlParams.set(key, value);
    }
  });
  const newURL = `${window.location.pathname}?${urlParams.toString()}`;
  Router.go(newURL);
};
