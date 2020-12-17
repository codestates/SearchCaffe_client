import { ReactComponent as Table } from './Table.svg';
import { ReactComponent as Cup } from './Cup.svg';
import { ReactComponent as Time } from './Time.svg';

import { tagName } from '../../cafeInfos';
import Tag from '../utils/Tag/index';
import styled from 'styled-components';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import locationImg from './location.png';
import Like from '../utils/Like/Like';
import React, { useState, useEffect } from 'react';
import defaultImg from '../utils/Card/dummyImg/defaultCafe.jpeg';
import { connect } from 'react-redux';
import { actionCreators } from '../../reducer/store';
import { $CombinedState } from 'redux';

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

/////////////////////////////////////
const Detail = styled.div`
  /* position: relative;
  top: 80px;
  width: 800px;
  margin: 0px auto auto auto;

  background-color: red;
  display: flex; */

  display: flex;
  justify-content: space-evenly;
  /* padding: 20px auto auto 20px; */
  width: 1424px;
  height: 800px;
  background: #fafafa;
  flex: 1;

  padding: 20px 20px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
  margin: auto auto auto auto;
`;

const DescribeContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  justify-content: flex-start;
  align-items: center;
  width: 30%;
  min-width: 400px;
`;

//////ANCHOR  First
const Header = styled.header``;

const TittleWrap = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 3rem;
  font-weight: bold;
  justify-content: space-around;
  /* -webkit-flex-direction: row;
  -wedkit-box-direction: normal;
  --webkit-box-orient: horizontal; */
`;
const Title = styled.span`
  position: relative;
  top: 10px;
  /* padding-right: 50px;
  max-width: 75%;
  font-size: 1.2rem;
  line-height: 46px; */
`;

// const Name = styled.h1`
//   display: inline-block;
//   max-width: 100%;
//   word-break: break-all;
// `;

const ActionButtonWrap = styled.div`
  margin: auto;
  /* display: flex;
  flex-direction: row;
  -webkit-flex-direction: row;
  -wedkit-box-direction: normal;
  --webkit-box-orient: horizontal;
  margin: 0; */
`;

const LikeWrap = styled.div`
  position: relative;
  cursor: pointer;
  display: inline-block;
`;

const LikeModi = styled(Like)``;

///////ANCHOR Second
const Info = styled.div`
  margin: auto;
`;

const Location = styled.img`
  width: 30px;
`;

const InfoTitle = styled.span`
  margin-right: 30px;
`;
const InfoContent = styled.span``;

/// ANCHOR Three
const SvgContainer = styled.div`
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 2fr 1fr;
`;

const SvgOneContainer = styled.div`
  display: flex;
  padding: 0 1.2rem 0 1.2rem;
  border-right: 2px solid black;
  flex-direction: column;
  align-items: center;
`;
const SvgLastContainer = styled.div`
  display: flex;
  padding: 0 0 0 1.2rem;
  flex-direction: column;
  align-items: center;
`;

const H4 = styled.h4`
  font-size: 18px;
  margin: 1rem 0 0 0;
`;
const SvgInfo = styled.span`
  font-size: 12px;
`;

const TagContainer = styled.div`
  margin: auto;
`;

//////

const Line = styled.div`
  margin: auto;
  border-bottom: 1px solid #000000;
  width: 5rem;
  transform: rotate(90deg);
`;

const MainImg = styled.img`
  float: right;
  width: 30%;
  height: 30%;
`;

const SlideContainer = styled.div`
  display: flex;
  margin: 9rem 0 0 0;
  flex-direction: column;
  align-items: center;
  object-fit: scale-down;
`;

const SlideMaincontainer = styled.div`
  width: 700px;
  position: relative;
  background-size: cover;
`;

const SlickSlide = styled.div`
  text-align: center;
  position: relative;
  margin: auto;
  :focus {
    outline: none;
  }
`;

const Image = styled.img`
  width: 600px;
  height: 500px;
  object-fit: cover;
  margin-right: 10px;
  border-radius: 8px;
  box-shadow: 0 13px 27px -5px hsla(240, 30.1%, 28%, 0.25),
    0 8px 16px -8px hsla(0, 0%, 0%, 0.3);
`;

const Thumbnailcontainer = styled.div`
  margin-top: 10px;
  height: 75px;
  width: 510px;
`;

const ThumbSlickSlide = styled.div`
  position: relative;
  margin: auto;
  :focus {
    outline: none;
  }
`;

const ThumbnailImg = styled.img`
  width: 150px;
  height: 150px;
  background-image: ${({ src }) => (!!src ? `url(${src})` : 'none')};
  border-radius: 4px;
  box-shadow: 0 13px 27px -5px hsla(240, 30.1%, 28%, 0.25),
    0 8px 16px -8px hsla(0, 0%, 0%, 0.3), 0 -6px 16px -6px hsla(0, 0%, 0%, 0.03);
`;

const ContentHeader = (props) => {
  const current = props.cardArr.filter(
    (el) => el.id === props.currentCafe.cafeid
  );

  const {
    cafeid,
    cafeTag,
    cafeName,
    cafeAddress,
    cafeImg,
    cafePhoneNumber,
    cafeDetail,
    cafeTable,
    Americano,
  } = current[0];
  console.log('=========== detail :', current[0][cafeDetail]);
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
    swipeToSlide: true,
    focusOnSelect: true,
    centerPadding: '10px',
  };

  // const cardArr = props.cardArr ? props.cardArr : cafes;

  //console.log('==================current>> :', current);

  return (
    <>
      {/* <MainImgCover />
      <MainImage style={{ backgroundImage: `url(${cafeImg[0]})` }} /> */}
      <Detail>
        <DescribeContainer>
          <div></div>

          <Header>
            <TittleWrap>
              <Title>
                {cafeName ? cafeName : '해당 정보를 불러오는 중입니다.'}
              </Title>
              <div></div>
            </TittleWrap>
          </Header>

          <Info>
            <Location src={locationImg}></Location>
            <InfoContent>
              {cafeAddress ? cafeAddress : '해당 정보를 불러오는 중입니다.'}
            </InfoContent>
            <InfoTitle>연락처</InfoTitle>
            <InfoContent>{cafePhoneNumber ? cafePhoneNumber : ''}</InfoContent>
          </Info>
          <ActionButtonWrap>
            <LikeWrap>
              <LikeModi />
            </LikeWrap>
          </ActionButtonWrap>
          <SvgContainer>
            <div></div>
            <SvgOneContainer>
              <Table />
              <H4>{cafeTable ? cafeTable : '없어'}</H4>
              <SvgInfo>좌석</SvgInfo>
            </SvgOneContainer>
            <SvgOneContainer>
              <Cup />
              <H4>{Americano ? Americano : '없어'}</H4>
              <SvgInfo>아메리카노</SvgInfo>
            </SvgOneContainer>
            <SvgLastContainer>
              <Time />
              <H4>{cafeDetail ? cafeDetail : '없어'} </H4>
              <SvgInfo>영업시간</SvgInfo>
            </SvgLastContainer>
            <div></div>
          </SvgContainer>

          <TagContainer className="tagBox">
            {cafeTag
              ? cafeTag.map((el) => {
                  return (
                    <Tag
                      isButton={true}
                      color="#ffffff"
                      isSmall={true}
                      tagName={el}
                    />
                  );
                })
              : ''}
          </TagContainer>

          <div></div>
        </DescribeContainer>
        <SlideContainer>
          <SlideMaincontainer>
            <Slider
              {...settingsMain}
              asNavFor={nav2}
              ref={(slider) => setSlider1(slider)}
            >
              {cafeImg ? (
                cafeImg.map((el) => {
                  return (
                    <SlickSlide>
                      <Image src={el} />
                    </SlickSlide>
                  );
                })
              ) : (
                <div>'사진이 없습니다.'</div>
              )}
            </Slider>
          </SlideMaincontainer>
          <Thumbnailcontainer>
            <Slider
              {...settingsThumbs}
              asNavFor={nav1}
              ref={(slider) => setSlider2(slider)}
            >
              {cafeImg ? (
                cafeImg.map((el) => {
                  return (
                    <ThumbSlickSlide>
                      <ThumbnailImg src={el} />
                    </ThumbSlickSlide>
                  );
                })
              ) : (
                <div>'사진이 없습니다.'</div>
              )}
            </Slider>
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
