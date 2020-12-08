import styled from 'styled-components';
import Card from '../utils/Card/index';
import { connect } from 'react-redux';
import { actionCreators } from '../../reducer/store';
import { dbService, storageService } from '../../firebase/mainbase';
import { useEffect, useState, useMemo, Fragment } from 'react';

import {
  CSSTransition,
  TransitionGroup,
  Transition,
} from 'react-transition-group';

const WrapperLine = styled.span`
  display: inline-block;
  width: 100%;
  border-top: 1px solid black;
`;

const WrapperLineLeft = styled(WrapperLine)`
  width: 20%;
  max-width: 350px;
  position: relative;
  left: 30px;
  bottom: 10px;
`;

const WrapperLineRight = styled(WrapperLine)`
  max-width: 350px;
  width: 20%;
  position: relative;
  right: 30px;
  bottom: 10px;
`;

const WrapperTitle = styled.div`
  width: 100%;
  margin-top: 50px;
  font-size: 1.7rem;
  font-weight: bold;
  text-align: center;
`;

const CardWrapperStyle = styled.div`
  column-width: 350px;
  column-gap: 15px;
  width: 95%;
  max-width: 1130px;
  margin: 20px auto;
  background-color: #ebebeb;

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
  const [currentKeyword, setCurrentKeyword] = useState('');
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

  useEffect(() => {
    let keyword = state.keyword || '';
    let returnArr = [];
    let cardArr = state.cardArr || [];
    cardArr.forEach((card) => {
      if (card.cafeName.indexOf(keyword) !== -1) {
        returnArr.push(card);
      } else if (card.cafeAddress.indexOf(keyword) !== -1) {
        returnArr.push(card);
      }
    });
    if (returnArr.length > 0) {
      setCards(returnArr);
    }
  }, [state.keyword]);
  return (
    <div>
      <WrapperTitle>
        <WrapperLineRight />
        <span>검색 결과</span>
        <WrapperLineLeft />
      </WrapperTitle>
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
                      cafeid={card.id}
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
    </div>
  );
};
function mapStateToProps(state, ownProps) {
  return { state };
}

function mapDispatchToProps(dispatch) {
  return {
    cardList: (card) => dispatch(actionCreators.addCardList(card)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CardWrapper);
