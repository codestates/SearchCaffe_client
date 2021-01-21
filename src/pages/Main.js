import SearchWrapper from '../components/SearchWrapper/index';
import CardWrapper from '../components/CardWrapper/index';
import mainImg from './main.jpeg';
import styled from 'styled-components';
import { dbService } from '../firebase/mainbase';
import { actionCreators } from '../reducer/store';
import { connect } from 'react-redux';

const MainImg = styled.img`
  display: inline-block;
  text-align: center;
  width: 100%;
  height: 30%;
`;

const Main = (props) => {
  return (
    <main>
      <MainImg src={mainImg}></MainImg>
      <SearchWrapper></SearchWrapper>
      <CardWrapper></CardWrapper>
    </main>
  );
};

function mapStateToProps(state, ownProps) {
  return { tagArray: state };
}

function mapDispatchToProps(dispatch) {
  return {
    cardList: (card) => dispatch(actionCreators.addCardList(card)),
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Main);
