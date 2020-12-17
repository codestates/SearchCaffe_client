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

const ContentStyle = styled.div`
  position: relative;
  top: 80px;
  margin-bottom: 300px;
`;

// const GlobalStyle = createGlobalStyle`
// body {
//   margin: 0 auto;
// }
// `;
const ContentWrapper = styled.div``;
const Inner = styled.div`
  box-sizing: border-box;
`;

const MiddleWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin: 0 auto;
`;

const Content = (props) => {
  return (
    <ContentStyle>
      {/* <GlobalStyle /> */}
      <ContentWrapper>
        <Inner>
          <ContentHeader></ContentHeader>
        </Inner>
      </ContentWrapper>
      <MiddleWrapper>
        <ContentComment></ContentComment>
        <NearbyCafe cafeInfo={props.currentCafe}></NearbyCafe>
      </MiddleWrapper>
    </ContentStyle>
  );
};
function mapStateToProps(state, ownProps) {
  return { ...state };
}

export default connect(mapStateToProps, null)(Content);
