import Card from '../utils/Card/Card';
import styled from 'styled-components';
const CardColumn = styled.div``;
const Recommendation = ({ recommendation }) => {
  return (
    <>
      <CardColumn>
        {recommendation
          .slice(0, parseInt(recommendation.length / 3))
          .map((card, index) => (
            <Card
              key={index}
              cafeid={card.id}
              cafeName={card.cafeName}
              cafeTag={card.cafeTag}
              cafeAddress={card.cafeAddress}
              cafeImage={card.cafeImg ? card.cafeImg[0] : ''}
              cafeStar={card.cafeStar}
            ></Card>
          ))}
      </CardColumn>
      <CardColumn>
        {recommendation
          .slice(
            parseInt(recommendation.length / 3),
            parseInt((recommendation.length * 2) / 3)
          )
          .map((card, index) => (
            <Card
              key={index}
              cafeid={card.id}
              cafeName={card.cafeName}
              cafeTag={card.cafeTag}
              cafeAddress={card.cafeAddress}
              cafeImage={card.cafeImg ? card.cafeImg : ''}
              cafeStar={card.cafeStar}
              cafePhoneNumber={card.cafePhoneNumber}
              cafeDetail={card.cafeDetail}
            ></Card>))}
      </CardColumn>
      <CardColumn>
        {recommendation
          .slice(parseInt((recommendation.length * 2) / 3))
          .map((card, index) => (
            <Card
              key={index}
              cafeid={card.id}
              cafeName={card.cafeName}
              cafeTag={card.cafeTag}
              cafeAddress={card.cafeAddress}
              cafeImage={card.cafeImg ? card.cafeImg[0] : ''}
              cafeStar={card.cafeStar}
            ></Card>
          ))}
      </CardColumn>
    </>
  );
};

export default Recommendation;
