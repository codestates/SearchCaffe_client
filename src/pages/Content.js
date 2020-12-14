import styled, { createGlobalStyle } from 'styled-components';
import { dbService } from '../firebase/mainbase';

import { connect } from 'react-redux';
import { actionCreators } from '../reducer/store';

import ContentHeader from '../components/ContentHeader/index';
import ContentDetail from '../components/ContentDetail/index';
import ContentComment from '../components/ContentComment/index';
import { img } from './main.jpeg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { cafeComment } from '../cafeInfos';

const GlobalStyle = createGlobalStyle`
body {
  background: #e9ecef;
  margin: auto;
}
`;



const Content = (props) => {
  const addCurrentCafe = async () => {
    let currnetCafeObj = {};
    currnetCafeObj['cafeid'] = props.cafeid;
    currnetCafeObj['cafeTag'] = props.cafeTag;
    currnetCafeObj['cafeName'] = props.cafeName;
    currnetCafeObj['cafeAddress'] = props.cafeAddress;
    currnetCafeObj['cafeImage'] = props.cafeImage;
    currnetCafeObj['cafeStar'] = props.cafeStar;
    props.currentCafe(currnetCafeObj);
  };


  return (
    <>
      <GlobalStyle />
      <ContentHeader></ContentHeader>
      <ContentDetail></ContentDetail>
      <ContentComment></ContentComment>
    </>
  );
};

function mapStateToProps(state, ownProps) {
  console.log('=============this is state', state);
  return { state };
}

function mapDispatchToProps(dispatch) {
  return {
    currentCafe: (currentCafe) => {
      dispatch(actionCreators.currentCafeClick(currentCafe))
    },
    currentCafeComment: (currentCafeComment) => {
      dispatch(actionCreators.currentCafeComment(currentCafeComment))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);
