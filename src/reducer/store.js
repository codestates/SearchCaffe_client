import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';
import { createStore } from 'redux';

const TAGARRAY = 'TAGARRAY';
const CARDARRAY = 'CARDARRAY';
const KEYWORD = 'KEYWORD';
const CURRENTCAFE = 'CURRENTCAFE';
const CURRENTCAFECOMMENT = 'CURRENTCAFECOMMENT';

const tagNameArray = (tagName) => {
  return {
    type: TAGARRAY,
    tagName,
  };
};

const addCardList = (card) => {
  return {
    type: CARDARRAY,
    card,
  };
};

const searchKeyword = (keyword) => {
  return {
    type: KEYWORD,
    keyword,
  };
};

const currentCafeClick = (currentCafe) => {
  return {
    type: CURRENTCAFE,
    currentCafe,
  };
};

const currentCafeComment = (currentCafeComment) => {
  return {
    type: CURRENTCAFECOMMENT,
    currentCafeComment,
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case TAGARRAY:
      let tagArr = action.tagName;
      return Object.assign({}, state, {
        ...state,
        tagArr,
      });
    case CARDARRAY:
      let cardArr = action.card.slice();
      return {
        cardArr,
      };
    case KEYWORD:
      let keyword = action.keyword;
      for (let i in state) {
        if (i === 'keyword') {
          state[i] = keyword;
        }
      }
      return Object.assign({}, state, {
        keyword,
        ...state,
      });
    case CURRENTCAFECOMMENT:
      let currentCafeComment = action.currentCafeComment;
      for (let i in state) {
        if (i === 'currentCafeComment') {
          state[i] = currentCafeComment;
        }
      }
      return Object.assign({}, state, {
        currentCafeComment,
        ...state,
      });
    case CURRENTCAFE:
      let currentCafe = action.currentCafe;
      for (let i in state) {
        if (i === 'currentCafe') {
          state[i] = currentCafe;
        }
      }
      return Object.assign({}, state, {
        currentCafe,
        ...state,
      });
    default:
      return state;
  }
};

const store = createStore(reducer);

export const actionCreators = {
  tagNameArray,
  addCardList,
  searchKeyword,
  currentCafeClick,
  currentCafeComment,
};

export default store;
