import styled from 'styled-components';
import Card from '../utils/Card/index';
import { connect } from 'react-redux';
import { actionCreators } from '../../reducer/store';
import { dbService, storageService } from '../../firebase/mainbase';
import { useEffect, useState, useMemo } from 'react';
import { useForm } from './useForm';

const CardWrapperStyle = styled.div`
  text-align: center;
  position: relative;
  top: 30px;
`;

const CardWrapper = ({ state, cardList }) => {
  console.log('state.tagArr :' + state.tagArr);
  const [isTag, setisTag] = useState(false);
  const [cards, setCards] = useState([]);
  let cardListArr = [];
  useEffect(() => {
    dbService
      .collection('cafeTestInfo')
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
  useMemo(() => {
    console.log("work!!");
  },[state.tagArr])
  return (
    <>
      {isTag ? (
        <CardWrapperStyle>
          <Card />
        </CardWrapperStyle>
      ) : (
        <CardWrapperStyle>
          {cards.map((card) => (
            <Card
              key={card.id}
              cardName={card.cafeName}
              cafeTag={card.cafeTag}
              cafeAddress={card.cafeAddress}
              cafeImage={card.cafeImg[0]}
            />
          ))}
        </CardWrapperStyle>
      )}
    </>
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
