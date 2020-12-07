import { combineReducers } from 'redux';

import { SET_CAFE_COMMENT } from '../actions/index';

const initialState = {
  cafeAddress: '',
  cafeTag: [],
  cafeComment: [
    {
      username: 'ranisol',
      comment: '좋아요 카페',
      scope: 5,
    },
  ],
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CAFE_COMMENT:
      return {
        ...state,
        cafeComment: [...state.cafeComment, action.value],
      };
    default:
      return state;
  }
};

export default combineReducers({
  searchReducer,
});
