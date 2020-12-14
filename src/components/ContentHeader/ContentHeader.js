import { ReactComponent as Table } from './Table.svg';
import { ReactComponent as Cup } from './Cup.svg';
import { ReactComponent as Time } from './Time.svg';


import { tagName } from '../../cafeInfos';
import Tag from '../utils/Tag/index';
import styled from 'styled-components';


import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


import { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { actionCreators } from '../../reducer/store'

const MainImgCover = styled.div`
  width: 100%;
  height: 600px;
  background-color: #160a0a9f;
  position: absolute;
`;

const MainImage = styled.div`
  background-image: url(${'https://firebasestorage.googleapis.com/v0/b/searchcafe-17018.appspot.com/o/cafeImage%2F%EB%8A%98%EC%86%9C%EB%8B%B9%2F2020846016_editor_image.jpg?alt=media&token=1835984f-a8ed-405e-8f4e-df97175beab4'});
  background-position: center;
  background-size: 100% auto;
  display: inline-block;
  text-align: center;
  width: 100%;
  height: 600px;
`;


const Detail = styled.div`
  width: 90%;
  height: 100%;
  background: white;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
  margin: auto;

  display: flex;
  flex-direction:column;

  padding-top: 48px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;

  margin-top: 2rem;


  h1 {
    margin: 0;
    font-size: 40px;
    color: #343a40;
  }

  .adress {
    margin-top: 4px;
    color: #929191;
    font-size: 15px;
  }

  .describe {
    margin-top: 30px;
    font-size: 18px;
  }

  .block {
    width: 200px;
    height: 200px;
    background: green;
  }

  .tagBox {
    margin-top: 1rem;
  }
`;
const Line = styled.div`
  border: 1px solid #000000;
  width: 5rem;
  transform: rotate(90deg);
`;

const MainImg = styled.img`
  float: right;
  width: 30%;
  height: 30%;
`;
const SvgContainer = styled.div`
  display: flex;
  padding-top: 3rem;
  width: 15rem;
  flex-basis: fill;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;
const DescribeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SlideContainer = styled.div`
  width: 300px;
  height: 300px;
  margin: auto;
`;

const StyledSlider = styled(Slider)`
  padding-top: 2rem;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
const imgUrl = require('./Table.svg');

const items = [
  { id: 1, url: imgUrl },
  { id: 2, url: imgUrl },
  { id: 3, url: imgUrl },
];

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3
};

const ContentHeader = (props) => {
  return (
    <>
      <MainImgCover />
      <MainImage />
      <Detail>
        <SlideContainer>
          <StyledSlider {...settings}>
            <div>
              <Image
                alt="#"
                src={
                  'https://firebasestorage.googleapis.com/v0/b/searchcafe-17018.appspot.com/o/cafeImage%2F%EB%8A%98%EC%86%9C%EB%8B%B9%2F2020846016_editor_image.jpg?alt=media&token=1835984f-a8ed-405e-8f4e-df97175beab4'
                }
              />
            </div>
            <div>
              <Image
                alt="#"
                src={
                  'https://firebasestorage.googleapis.com/v0/b/searchcafe-17018.appspot.com/o/cafeImage%2F%EB%8A%98%EC%86%9C%EB%8B%B9%2F20208172316_editor_image.jpg?alt=media&token=c5b05234-8a38-4f0a-9054-42565f2f7d2f'
                }
              />
            </div>
            {/*          {items.map(item => {
    return (
      <div key={item.id}>
        <ImageContainer>
          <Image src={item.url} />
        </ImageContainer>
      </div>
    )
  })}
*/}
          </StyledSlider>
        </SlideContainer>
        <DescribeContainer>
          <h1>{props.cafeName ? props.cafeName : '카페 이름'}</h1>
          <div className="adress">{props.cafeAdress ? props.cafeAdress : '카페 주소'}</div>
          <div className="describe">
            {props.dscribe ? props.describe : '당신이 찾는 그 카페'}
          </div>
          <SvgContainer>
            <Table />
            <Line />
            <Cup />
            <Line />
            <Time />
          </SvgContainer>
          <div className="tagBox">
            <Tag
              isButton={true}
              color="#ffffff"
              isSmall={true}
              tagName={tagName['가까운']}
            ></Tag>
            <Tag
              isButton={true}
              color="#ffffff"
              isSmall={true}
              tagName={tagName['주차 가능']}
            ></Tag>
            <Tag
              isButton={true}
              color="#ffffff"
              isSmall={true}
              tagName={tagName['애완 동물 동반']}
            ></Tag>
          </div>
        </DescribeContainer>
      </Detail>
    </>
  );
};

function mapStateToProps(state, ownProps) {
  return { state };
}

function mapDispatchToProps(dispatch) {
  return {
    currentCafe: (currentCafe) =>
      dispatch(actionCreators.currentCafeClick(currentCafe)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ContentHeader);
