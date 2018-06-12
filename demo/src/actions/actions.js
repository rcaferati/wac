import {
  PAGE_LOAD_START,
  PAGE_LOAD_SUCCESS,
  PAGE_LOAD_ERROR,
} from '../constants';

// Load the page data
export function pageLoadStart() {
  return {
    type: PAGE_LOAD_START,
  };
}

export function pageLoadSuccess(data) {
  return {
    type: PAGE_LOAD_SUCCESS,
    data,
  };
}

export function pageLoadError() {
  return {
    type: PAGE_LOAD_ERROR,
  };
}
