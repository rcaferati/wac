import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import {
  PAGE_LOAD_SUCCESS,
} from '../constants';

const initialState = {
  loading: false,
  error: false,
  currentUser: false,
  data: {},
};

const website = (state = initialState, action) => {
  switch (action.type) {
    case PAGE_LOAD_SUCCESS:
      console.log('LOAD SUCCESS');
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  website,
  routing,
});

export default rootReducer;
