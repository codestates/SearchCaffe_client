import { ReactComponent as Table } from './Table.svg';
import { ReactComponent as Cup } from './Cup.svg';
import { ReactComponent as Time } from './Time.svg';

import { tagName } from '../../cafeInfos';
import Tag from '../utils/Tag/index';
import styled from 'styled-components';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { cafes } from '../../cafeInfos';
import React, { useState, useEffect } from 'react';
import defaultImg from '../utils/Card/dummyImg/defaultCafe.jpeg';
import { connect } from 'react-redux';
import { actionCreators } from '../../reducer/store';

const MainImgCover = styled.div`
  width: 100%;
  height: 600px;
  background-color: #160a0a9f;
  position: absolute;
`;

const MainImage = styled.div`
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
  flex-direction: row;

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
  margin-left: 35%;
`;

const SlideMaincontainer = styled.div`
  width: 760px;
  height: 12rem;
  margin: auto;
`;

const StyledSlider = styled(Slider)``;

const Image = styled.img`
  max-width: 70%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 13px 27px -5px hsla(240, 30.1%, 28%, 0.25),
    0 8px 16px -8px hsla(0, 0%, 0%, 0.3);
`;

const Thumbnailcontainer = styled.div`
  margin-top: 15px;
  height: 75px;
  text-align: center;
  width: 70%;
`;

const ThumbnailImg = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 16px;
  background-image: ${({ src }) => (!!src ? `url(${src})` : 'none')};
  display: flex;
  align-items: flex-end;
  border-radius: 4px;
  box-shadow: 0 13px 27px -5px hsla(240, 30.1%, 28%, 0.25),
    0 8px 16px -8px hsla(0, 0%, 0%, 0.3), 0 -6px 16px -6px hsla(0, 0%, 0%, 0.03);
`;

const SlickSlide = styled.div`
  text-align: center;
  position: relative;
  margin: auto;
  :focus {
    outline: none;
  }
`;

const ContentHeader = (props) => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  });

  const settingsMain = {
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    autoplay: true,
    asNavFor: '.slider-nav',
  };

  const settingsThumbs = {
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: true,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    centerPadding: '10px',
  };

  // const cardArr = props.cardArr ? props.cardArr : cafes;
  const current = props.cardArr.filter(
    (el) => el.id === props.currentCafe.cafeid
  );

  const {
    cafeid,
    cafeTag,
    cafeName,
    cafeAddress,
    cafeImg,
    cafeStar,
  } = current[0];
  //console.log('==================current>> :', current);

  return (
    <>
      <MainImgCover />
      <MainImage
        style={
          cafeImg
            ? { backgroundImage: `url(${cafeImg[0]})` }
            : { backgroundImage: `url(${defaultImg})` }
        }
      />
      <Detail>
        <DescribeContainer>
          <h1>{cafeName ? cafeName : '해당 정보를 불러오는 중입니다.'}</h1>
          <div className="adress">
            {cafeAddress ? cafeAddress : '해당 정보를 불러오는 중입니다.'}
          </div>
          <div className="describe"></div>
          <SvgContainer>
            <Table />
            <Line />
            <Cup />
            <Line />
            <Time />
          </SvgContainer>
          <div className="tagBox">
            {cafeTag.map((el) => {
              return (
                <Tag
                  isButton={true}
                  color="#ffffff"
                  isSmall={true}
                  tagName={el}
                />
              );
            })}
          </div>
        </DescribeContainer>

        <SlideContainer>
          <SlideMaincontainer>
            <StyledSlider
              {...settingsMain}
              asNavFor={nav2}
              ref={(slider) => setSlider1(slider)}
            >
              {cafeImg.map((el) => {
                return (
                  <SlickSlide>
                    <Image src={el} />
                  </SlickSlide>
                );
              })}
            </StyledSlider>
          </SlideMaincontainer>
          <Thumbnailcontainer>
            <StyledSlider
              {...settingsThumbs}
              asNavFor={nav1}
              ref={(slider) => setSlider2(slider)}
            >
              {cafeImg
                ? cafeImg.map((el) => {
                    return (
                      <SlickSlide>
                        <ThumbnailImg src={el} />
                      </SlickSlide>
                    );
                  })
                : ''}
            </StyledSlider>
          </Thumbnailcontainer>
        </SlideContainer>
      </Detail>
    </>
  );
};

function mapStateToProps(state, ownProps) {
  return { ...state };
}

// function mapDispatchToProps(dispatch) {
//   return {
//     addcurrentCafe: (currentCafe) =>
//       dispatch(actionCreators.currentCafeClick(currentCafe)),
//   };
// }

export default connect(mapStateToProps, null)(ContentHeader);
