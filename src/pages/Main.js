import SearchWrapper from '../components/SearchWrapper/index';
import CardWrapper from '../components/CardWrapper/index';
import mainImg from './main.jpeg';
import styled from 'styled-components';

const MainImg = styled.img`
  display: inline-block;
  text-align: center;
  width: 100%;
  height: 30%;
`;

export default function Main(props) {
  return (
    <main>
      <MainImg src={mainImg}></MainImg>
      <SearchWrapper></SearchWrapper>
      <CardWrapper></CardWrapper>
    </main>
  );
}
