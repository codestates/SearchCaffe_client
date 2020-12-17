import React, { useEffect, useState } from 'react';
import { dbService } from '../../firebase/mainbase';
import Map from '../../Map';
import { Link } from 'react-router-dom';
import './NearbyCafe.css';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { actionCreators } from '../../reducer/store';

const CafeImage = styled.img`
  width: 100px;
  height: 100px;
`;

const NearbyCafeStyle = styled.div`
  margin: 0;
  box-sizing: border-box;
  width: 400px;
  height: auto;
  margin: 3rem 0 0 5px;
  background-color: #fafafa;
`;

const CafeList = styled.li`
  padding: 15px 0 15px 0;
  width: 100%;
  border-bottom: 1px solid #dbdbdb;
  transition: 0.3s;
`;

const Cover = styled.div`
  position: absolute;
  width: 380px;
  height: 130px;
`;
const LinkContent = styled(Link)`
  color: black;
  text-decoration: none;
  &:before {
    color: #24292e;
    cursor: default !important;
  }
  :hover ${CafeList} {
    background-color: #e9e9e9;
    transition: 0.3s;
  }
`;

const NearbyCafe = (props) => {
  const [nearbyCafe, setNearbyCafe] = useState([]);
  const onClick = async (e) => {
    let currentCafe = nearbyCafe.filter(
      (cafe) => cafe.id === Number(e.target.id)
    );
    let currentCafeObj = { ...currentCafe };
    currentCafe = currentCafe[0];
    currentCafeObj['cafeid'] = currentCafe.id;
    await props.cafe(currentCafeObj);
    let cafeCommentArr = [];
    try {
      const data = await dbService.collection('CafeComment').get();
      data.forEach((doc) => {
        if (props.cafeid === doc.data().cafeId) {
          cafeCommentArr.push(doc.data());
        }
      });
    } catch (error) {
      console.log('error' + error);
    }
    await props.currentCafeComment(cafeCommentArr);
  };
  useEffect(() => {
    dbService
      .collection('CafeInformation')
      .where('region_1depth', '==', props.cafeInfo.region_1depth)
      .where('region_2depth', '==', props.cafeInfo.region_2depth)
      .where('cafeName', '!=', props.cafeInfo.cafeName)
      .limit(4)
      .onSnapshot((snapshot) => {
        let cafes = snapshot.docs.map((doc) => doc.data());
        console.log(cafes);
        setNearbyCafe(cafes);
      });
  }, []);
  return (
    <NearbyCafeStyle>
      <div className="map-container">
        <Map cafeInfo={props.cafeInfo} />
      </div>
      <ul className="cafe-list">
        <h3 className="cafe-list-title">주변 카페 추천</h3>
        {nearbyCafe.map((cafe) => (
          <LinkContent to={`/content/${cafe.id}`}>
            <Cover id={cafe.id} onClick={onClick}></Cover>
            <CafeList className="cafe">
              <CafeImage src={cafe.cafeImg} />

              <div className="cafe-info">
                <div className="cafe-name">{cafe.cafeName}</div>
                <div className="cafe-address">주소 : {cafe.cafeAddress}</div>
              </div>
            </CafeList>
          </LinkContent>
        ))}
      </ul>
    </NearbyCafeStyle>
  );
};

function mapStateToProps(state, ownProps) {
  return { state, ownProps };
}

function mapDispatchToProps(dispatch) {
  return {
    cafe: (currentCafe) =>
      dispatch(actionCreators.currentCafeClick(currentCafe)),
    currentCafeComment: (comment) =>
      dispatch(actionCreators.currentCafeComment(comment)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NearbyCafe);
