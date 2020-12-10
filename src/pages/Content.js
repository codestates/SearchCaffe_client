import styled, { createGlobalStyle } from 'styled-components';
import { dbService, storageService } from '../firebase/mainbase';
import { useEffect, useState, useMemo, Fragment } from 'react';
import { connect } from 'react-redux';

import Tag from '../components/utils/Tag';
import tagnames from '../components/utils/Tag/tagnames';
import ContentHeader from '../components/ContentHeader/index';
import ContentDetail from '../components/ContentDetail/index';
import ContentComment from '../components/ContentComment/index';
import { img } from './main.jpeg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { actionCreators } from '../reducer/store';
import { cafeComment } from '../cafeInfos';

const GlobalStyle = createGlobalStyle`
body {
  background: #e9ecef;
  margin: auto;
}
`;

const ImageContainer = styled.div``;

let cardListArr = [];
const Content = ({ state }) => {
  dbService
    .collection('CafeInformation')
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        cardListArr.push(doc.data());
      });
    })
    .catch((err) => console.log('ERROR!', err));

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
  return { state };
}

function mapDispatchToProps(dispatch) {
  return {
    cardList: (card) => dispatch(actionCreators.addCardList(card)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);
