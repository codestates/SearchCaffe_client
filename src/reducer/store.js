import { createStore } from 'redux';

const TAGARRAY = 'TAGARRAY';
const CARDARRAY = 'CARDARRAY';

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

const reducer = (state = [], action) => {
  switch (action.type) {
    case TAGARRAY:
      let tagArr = action.tagName
      console.log('tagArr :' + tagArr);
      return Object.assign({}, state, {
        tagArr,
        ...state,
      });
    case CARDARRAY:
      let cardArr = action.card.slice();
      return {
        cardArr,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export const actionCreators = {
  tagNameArray,
  addCardList,
};

export default store;
