import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';
import { createStore } from 'redux';

const TAGARRAY = 'TAGARRAY';
const CARDARRAY = 'CARDARRAY';
const KEYWORD = 'KEYWORD';
const CURRENTCAFE = 'CURRENTCAFE';
const CURRENTCAFECOMMENT = 'CURRENTCAFECOMMENT';
const CURRENTUSER = 'CURRENTUSER';
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

const currentCafeComment = (comment) => {
  return {
    type: CURRENTCAFECOMMENT,
    comment,
  };
};

const currentUser = (user) => {
  return {
    type: CURRENTUSER,
    user,
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
        ...state,
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
        ...state,
        keyword,
      });
    case CURRENTCAFECOMMENT:
      let comment = action.comment;
      for (let i in state) {
        if (i === 'comment') {
          state[i] = comment;
        }
      }
      return Object.assign({}, state, {
        ...state,
        comment,
      });
    case CURRENTCAFE:
      let currentCafe = action.currentCafe;
      for (let i in state) {
        if (i === 'currentCafe') {
          state[i] = currentCafe;
        }
      }
      return (Object.assign({}, state, {
        ...state,
        currentCafe,
      })
      )
    case CURRENTUSER:
      let user = action.user;
      for (let i in state) {
        if (i === 'user') {
          state[i] = user;
        }
      }
      return Object.assign({}, state, {
        ...state,
        user,
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
  currentUser,
};

export default store;
