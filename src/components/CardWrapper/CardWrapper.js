import styled from 'styled-components';
import Card from '../utils/Card/index';

const CardWrapperStyle = styled.div`
  text-align: center;
  position: relative;
  top: 30px;
`;

const CardWrapper = (props) => {
  return (
    <CardWrapperStyle>
      <Card cafeName="한강" cafeTag={['이디야', '스타벅스']}></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
      <Card></Card>
    </CardWrapperStyle>
  );
};

export default CardWrapper;
