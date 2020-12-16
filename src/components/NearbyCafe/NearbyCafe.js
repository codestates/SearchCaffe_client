import React, { useEffect, useState } from 'react';
import { dbService } from '../../firebase/mainbase';
import Map from '../../Map';
import { Link } from 'react-router-dom';
import './NearbyCafe.css';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { actionCreators } from '../../reducer/store';

const LinkContent = styled(Link)`
  color: black;
  text-decoration: none;
  &:before {
    color: #24292e;
    cursor: default !important;
  }
`;

const NearbyCafe = (props) => {
  const [nearbyCafe, setNearbyCafe] = useState([]);
  const onClick = async (e) => {
    let currentCafe = nearbyCafe.filter(
      (cafe) => cafe.id === Number(e.target.id)
    );

    let currentCafeObj = {};
    currentCafe = currentCafe[0];
    currentCafeObj['cafeid'] = currentCafe.id;
    currentCafeObj['cafeTag'] = currentCafe.cafeTag;
    currentCafeObj['cafeName'] = currentCafe.cafeName;
    currentCafeObj['cafeAddress'] = currentCafe.cafeAddress;
    currentCafeObj['cafeImage'] = currentCafe.cafeImg;
    currentCafeObj['cafeStar'] = currentCafe.cafeStar;
    currentCafeObj['cafeDetail'] = currentCafe.cafeDetail;
    currentCafeObj['cafePhoneNumber'] = currentCafe.cafePhoneNumber;
    await props.cafe(currentCafeObj);
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
    <div className="side-wrap">
      <div className="map-container">
        <Map cafeInfo={props.cafeInfo} />
      </div>
      <ul className="cafe-list">
        <h3 className="cafe-list-title">주변 카페 추천</h3>
        {nearbyCafe.map((cafe) => (
          <li className="cafe">
            <LinkContent to={`/content/${cafe.id}`}>
              <img
                id={cafe.id}
                src={cafe.cafeImg}
                className="cafe-img"
                onClick={onClick}
              />
            </LinkContent>
            <div className="cafe-info">
              <div className="cafe-name">{cafe.cafeName}</div>
              <div className="cafe-address">주소 : {cafe.cafeAddress}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  return { state, ownProps };
}

function mapDispatchToProps(dispatch) {
  return {
    cafe: (currentCafe) =>
      dispatch(actionCreators.currentCafeClick(currentCafe)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NearbyCafe);
