import styled from 'styled-components';
import Card from '../utils/Card/index';
import { connect } from 'react-redux';
import { actionCreators } from '../../reducer/store';
import { dbService } from '../../firebase/mainbase';
import { useEffect, useState } from 'react';

const CardWrapperStyle = styled.div`
  text-align: center;
  position: relative;
  top: 30px;
`;

const CardWrapper = ({ state, cardList }) => {
  const [cards, setCards] = useState([]);
  let cardListArr = [];
  let tags = state.tagArr ? state.tagArr.join() : '';
  useEffect(() => {
    dbService
      .collection('TestInfo')
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
    <CardWrapperStyle>
      {!cards
        ? ''
        : cards.map((card) => (
            <Card
              key={card.id}
              cardName={card.cafeName}
              cafeTag={card.cafeTag}
              cafeAddress={card.cafeAddress}
              // cafeImage={card.cafeImg[0]}
            />
          ))}
    </CardWrapperStyle>
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
