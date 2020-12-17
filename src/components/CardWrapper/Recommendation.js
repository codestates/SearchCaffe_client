import Card from '../utils/Card/Card';
import styled from 'styled-components';
const CardColumn = styled.div``;
const NoResult = styled.div``;
const Recommendation = ({ recommendation, isMain }) => {
  console.log(isMain);
  return (
    <>
      <CardColumn>
        {recommendation
          .slice(0, parseInt(recommendation.length / 3))
          .map((card, index) => {
            return (
              <Card
                {...card}
                isMain={isMain}
                key={index}
                cafeid={card.id}
                cafeImage={card.cafeImg ? card.cafeImg : ''}
              ></Card>
            );
          })}
      </CardColumn>
      <CardColumn>
        {recommendation
          .slice(
            parseInt(recommendation.length / 3),
            parseInt((recommendation.length * 2) / 3)
          )
          .map((card, index) => {
            console.log('card in recommendation ', card);
            return (
              <Card
                {...card}
                isMain={isMain}
                key={index}
                cafeid={card.id}
                cafeImage={card.cafeImg ? card.cafeImg : ''}
              ></Card>
            );
          })}
      </CardColumn>
      <CardColumn>
        {recommendation
          .slice(parseInt((recommendation.length * 2) / 3))
          .map((card, index) => (
            <Card
              {...card}
              isMain={isMain}
              key={index}
              cafeid={card.id}
              cafeImage={card.cafeImg ? card.cafeImg : ''}
            ></Card>
          ))}
      </CardColumn>
    </>
  );
};

export default Recommendation;
