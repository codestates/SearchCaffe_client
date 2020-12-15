import SearchWrapper from '../components/SearchWrapper/index';
import CardWrapper from '../components/CardWrapper/index';
import mainImg from './main.jpeg';
import styled from 'styled-components';
import coffeeImg from './coffee.svg';
import { actionCreators } from '../reducer/store';
import { connect } from 'react-redux';

const MainImgCover = styled.div`
  width: 100%;
  height: 600px;
  background-color: #160a0a9f;
  position: absolute;
`;

const MainImg = styled.div`
  background-image: url(${mainImg});
  background-position: center;
  background-size: 100% auto;
  display: inline-block;
  text-align: center;
  width: 100%;
  height: 600px;
`;

const MainStyle = styled.main`
  min-height: 1000px;
`;

const Main = (props) => {
  return (
    <MainStyle>
      <MainImgCover>
        {/* <img src={coffeeImg}></img> */}
      </MainImgCover>
      <MainImg />
      <SearchWrapper></SearchWrapper>
      <CardWrapper></CardWrapper>
    </MainStyle>
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);
