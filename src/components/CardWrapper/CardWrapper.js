import styled from 'styled-components';
import Card from '../utils/Card/index';
import { connect } from 'react-redux';
import { actionCreators } from '../../reducer/store';
import { dbService, storageService } from '../../firebase/mainbase';
import { useEffect, useState, useMemo } from 'react';

import {
  CSSTransition,
  TransitionGroup,
  Transition,
} from 'react-transition-group';

const CardWrapperStyle = styled.div`
  display: grid;
  background-color: blue;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
  grid-auto-columns: minmax(10px, auto);
  transition: opacity 0.3s;
  &.appearingCard-enter {
    opacity: 0;
  }
  &.appearingCard-enter-active {
    opacity: 1;
  }
  &.appearingCard-exit {
    opacity: 1;
  }
  &.appearingCard-exit-active {
    opacity: 0;
  }
  &.appearingCard-appear {
    opacity: 1;
  }
  &.appearingCard-appear-active {
    opacity: 0;
  }
`;

const CardWrapper = ({ state, cardList }) => {
  const [cards, setCards] = useState([]);
  let cardListArr = [];

  useEffect(() => {
    dbService
      .collection('CafeInformation')
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          cardListArr.push(doc.data());
        });
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error);
      })
      .finally(function () {
        cardList(cardListArr);
        setCards(cardListArr);
      });
  }, []);

  let tags = state.tagArr ? state.tagArr.join() : '';
  useEffect(() => {
    let results = state.cardArr;
    let tags = state.tagArr ? state.tagArr : [];
    for (let tag of tags) {
      results = results.filter((card) => {
        if (!card.cafeTag) {
          card.cafeTag = [];
        }
        return card.cafeTag.indexOf(tag) !== -1;
      });
    }
    setCards(results);
  }, [tags]);
  return (
    <CSSTransition
      in={true}
      timeout={300}
      classNames="appearingCard"
      mountOnEnter
      unmountOnExit
    >
      <CardWrapperStyle>
        <TransitionGroup component={null}>
          {!cards ? (
            <Card></Card>
          ) : (
            cards.map((card) => {
              return (
                <CSSTransition
                  timeout={300}
                  in={true}
                  key={card.id}
                  classNames="fadeCard"
                  mountOnEnter
                  unmountOnExit
                >
                  <Card
                    cafeName={card.cafeName}
                    cafeTag={card.cafeTag}
                    cafeAddress={card.cafeAddress}
                    cafeImage={card.cafeImg ? card.cafeImg[0] : ''}
                    cafeStar={card.cafeStar}
                  />
                </CSSTransition>
              );
            })
          )}
        </TransitionGroup>
      </CardWrapperStyle>
    </CSSTransition>
  );
};
function mapStateToProps(state, ownProps) {
  console.log(state);
  return { state };
}

function mapDispatchToProps(dispatch) {
  return {
    cardList: (card) => dispatch(actionCreators.addCardList(card)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CardWrapper);
