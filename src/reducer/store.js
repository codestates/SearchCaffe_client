import { createStore } from 'redux';

const TAGARRAY = 'TAGARRAY';
const CARDARRAY = 'CARDARRAY';
const KEYWORD = 'KEYWORD';

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

const reducer = (state = [], action) => {
  switch (action.type) {
    case TAGARRAY:
      let tagArr = action.tagName;
      return Object.assign({}, state, {
        tagArr,
        ...state,
      });
    case CARDARRAY:
      let cardArr = action.card.slice();
      return {
        cardArr,
      };
    case KEYWORD:
      let keyword = action.keyword;
      for(let i in state) {
        if(i === 'keyword') {
          state[i] = keyword;
        }
      }
      return Object.assign({}, state, {
        keyword,
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
};

export default store;
