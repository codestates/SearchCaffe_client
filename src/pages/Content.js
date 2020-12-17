import styled, { createGlobalStyle } from 'styled-components';
import { dbService } from '../firebase/mainbase';
import NearbyCafe from '../components/NearbyCafe/NearbyCafe';
import { connect } from 'react-redux';
import { actionCreators } from '../reducer/store';

import ContentHeader from '../components/ContentHeader/index';
// import ContentDetail from '../components/ContentDetail/index';
import ContentComment from '../components/ContentComment/index';
import { img } from './main.jpeg';
import { cafeComment } from '../cafeInfos';

const GlobalStyle = createGlobalStyle`
body {
  margin: 0 auto;
}
`;

const ContentWrapper = styled.div`
  width: calc(100% - 400px);
  background: white;
  flex: 1;
  float: left;
  padding: 0 20px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
  margin: 0 auto;
`;

const Inner = styled.div`
  box-sizing: border-box;
`;

const Content = (props) => {
  console.log('propsfdks;lf0', props);
  return (
    <>
      <GlobalStyle />
      <ContentHeader></ContentHeader>

      <ContentComment></ContentComment>
      <NearbyCafe cafeInfo={props.currentCafe}></NearbyCafe>
    </>
  );
};
function mapStateToProps(state, ownProps) {
  return { ...state };
}

export default connect(mapStateToProps, null)(Content);
