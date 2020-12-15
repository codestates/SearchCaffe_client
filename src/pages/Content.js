import styled, { createGlobalStyle } from 'styled-components';
import { dbService } from '../firebase/mainbase';

// import { connect } from 'react-redux';
// import { actionCreators } from '../reducer/store';

import ContentHeader from '../components/ContentHeader/index';
import ContentDetail from '../components/ContentDetail/index';
import ContentComment from '../components/ContentComment/index';
import { img } from './main.jpeg';
import { cafeComment } from '../cafeInfos';

const GlobalStyle = createGlobalStyle`
body {
  background: #e9ecef;
  margin: auto;
}
`;



const Content = (props) => {

  return (
    <>
      <GlobalStyle />
      <ContentHeader></ContentHeader>
      <ContentDetail></ContentDetail>
      <ContentComment></ContentComment>
    </>
  );
};


export default Content;
