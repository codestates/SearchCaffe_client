import { ReactComponent as Table } from './Table.svg';
import { ReactComponent as Cup } from './Cup.svg';
import { ReactComponent as Time } from './Time.svg';
import blank from './blank.png';
import { tagName } from '../../cafeInfos';
import Tag from '../utils/Tag/index';
import styled from 'styled-components';
import Like from '../utils/Like/Like';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import locationImg from './location.png';
import { cafes } from '../../cafeInfos';
import React, { useState, useEffect, useMemo } from 'react';
import defaultImg from '../utils/Card/dummyImg/defaultCafe.jpeg';
import { connect } from 'react-redux';
import { actionCreators } from '../../reducer/store';
import { $CombinedState } from 'redux';

/////////////////////////////////////
const Detail = styled.div`
  display: grid;
  grid-template-columns: 3fr 10fr 2fr 10fr 1fr;
  /* padding: 20px auto auto 20px; */
  width: 1424px;
  height: 700px;
  background: #fafafa;
  padding: 20px 20px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
  margin: auto;
`;

const DescribeContainer = styled.div`
  display: grid;
  grid-gap: 0.3rem;
  grid-template-rows: 120px 1fr auto auto auto auto 1.3fr auto 120px;
  align-items: center;
  width: 30%;
  min-width: 400px;
`;
//////ANCHOR  First
const Header = styled.header`
  justify-items: end;
  align-self: self-end;
`;
const TittleWrap = styled.div`
  display: flex;
  flex-direction: row;

  font-weight: bold;
`;
const Title = styled.span`
  margin: 0 0 1.6rem 0;
  font-size: ${(props) =>
    props.cafeName ? 3 - props.cafeName.length * 0.07 + 'rem' : '2rem'};
`;
const ActionButtonWrap = styled.div`
  position: relative;
  bottom: 7px;
  right: 20px;
  flex-direction: row;
  justify-items: center;
`;
const LikeCss = styled(Like)`
  align-items: start;
`;
///////ANCHOR Second
const InfoAdress = styled.div`
  display: grid;
  grid-template-columns: 70px 1.8rem auto;
  grid-template-rows: auto auto;
  margin-left: 0;
`;
const InfoAddressContent = styled.span`
  color: #272727;
  grid-column: 2 / 4;
`;
const AdressIcon = styled.span`
  position: relative;
  top: 0.31rem;
  border-radius: 2px;
  border: solid 1px #5c5c5c;
  padding: 0 0.1rem;
  margin-right: 2px;
  font-size: 0.6rem;
  text-align: center;
  color: #7f7f7f;
  grid-column: -3 / -2;
  height: 0.9rem;
`;
const Info = styled.div`
  display: grid;
  grid-template-columns: 70px auto;
  margin-left: 0;
`;
const Location = styled.img`
  width: 30px;
`;
const InfoTitle = styled.span`
  color: #4f4f4f;
`;
const InfoContent = styled.span`
  color: #272727;
`;

/// ANCHOR Three
const SvgContainer = styled.div`
  margin: 0;
  position: relative;
  left: -1.5rem;
  display: flex;
  justify-content: cener;
  align-items: center;
`;

const SvgOneContainer = styled.div`
  display: flex;
  padding: 0 1.4rem 0 1.4rem;
  border-right: 2px solid black;
  flex-direction: column;
  align-items: center;
`;
const SvgLastContainer = styled.div`
  display: flex;
  padding: 0 0 0 1.4rem;
  flex-direction: column;
  align-items: center;
`;

const H4 = styled.h4`
  font-size: 18px;
  margin: 0 0 0 0;
`;
const SvgInfo = styled.span`
  margin: 1rem 0 0 0;
  font-size: 15px;
`;

const TagContainer = styled.div`
  margin-left: 0;
`;

//////

const SlideContainer = styled.div`
  display: flex;
  margin: 4rem 0 0 0;
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

  :focus {
    outline: none;
  }
`;

const Image = styled.img`
  width: 550px;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 13px 27px -5px hsla(240, 30.1%, 28%, 0.25),
    0 8px 16px -8px hsla(0, 0%, 0%, 0.3);
`;

const Thumbnailcontainer = styled.div`
  margin-top: 2rem;
  height: auto;
  width: 550px;
  position: relative;
  right: 10px;
  overflow-x: scroll;

  white-space: nowrap;
`;

const ThumbSlickSlide = styled.div`
  position: relative;
  display: inline-block;
  margin-right: 10px;
  :focus {
    outline: none;
  }
`;

const ThumbnailImg = styled.img`
  display: inline-block;
  width: 120px;
  height: 120px;
  background-image: ${({ src }) => (!!src ? `url(${src})` : 'none')};
  border-radius: 4px;
  box-shadow: 0 13px 27px -5px hsla(240, 30.1%, 28%, 0.25),
    0 8px 16px -8px hsla(0, 0%, 0%, 0.3), 0 -6px 16px -6px hsla(0, 0%, 0%, 0.03);
`;
const Divide = styled.div`
  border-left: 1px solid #cccccc;
  height: 60%;
  left: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 20px;
  margin: auto 0 auto 0;
`;

const ContentHeader = (props) => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);
  let cafeid = !props.currentCafe ? '' : props.currentCafe.cafeid;
  let cafeTag = !props.currentCafe ? '' : props.currentCafe.cafeTag;
  let cafeName = !props.currentCafe ? '' : props.currentCafe.cafeName;
  let cafeAddress = !props.currentCafe ? '' : props.currentCafe.cafeAddress;
  let addressname = !props.currentCafe ? '' : props.currentCafe.addressname;
  let cafeImg = !props.currentCafe ? '' : props.currentCafe.cafeImg;
  let cafePhoneNumber = !props.currentCafe
    ? ''
    : props.currentCafe.cafePhoneNumber;
  let cafeDetail = !props.currentCafe ? '' : props.currentCafe.cafeDetail;
  let cafeTable = !props.currentCafe ? '' : props.currentCafe.cafeTable;
  let Americano = !props.currentCafe ? '' : props.currentCafe.Americano;

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
    dots: true,
    autoplay: true,
    centerPadding: '70px',
    speed: 1000,
  };

  const settingsThumbs = {
    slidesToShow: cafeImg ? cafeImg.length + 1 : 0,
    slidesToScroll: 1,
    variableWidth: true,
  };

  // const cardArr = props.cardArr ? props.cardArr : cafes;

  //console.log('==================current>> :', current);

  return (
    <>
      {/* <MainImgCover />
      <MainImage style={{ backgroundImage: `url(${cafeImg[0]})` }} /> */}
      <Detail>
        <div></div>
        <DescribeContainer>
          <div />
          <Header>
            <TittleWrap>
              <Title cafeName={cafeName}>
                {cafeName ? cafeName : '해당 정보를 불러오는 중입니다.'}
              </Title>
            </TittleWrap>
          </Header>
          <ActionButtonWrap>
            <Like />
          </ActionButtonWrap>
          <InfoAdress>
            <InfoTitle>주소</InfoTitle>
            <InfoAddressContent>
              {addressname ? addressname : '해당 정보를 불러오는 중입니다.'}
            </InfoAddressContent>
            <AdressIcon>지번</AdressIcon>
            <InfoContent>
              {cafeAddress ? cafeAddress : '해당 정보를 불러오는 중입니다.'}
            </InfoContent>
          </InfoAdress>
          <Info>
            <InfoTitle>연락처</InfoTitle>
            <InfoContent>{cafePhoneNumber ? cafePhoneNumber : ''}</InfoContent>
          </Info>
          <Info>
            <InfoTitle>안녕</InfoTitle>
            <InfoContent>나는 텍스트야</InfoContent>
          </Info>
          <SvgContainer>
            <div></div>
            <SvgOneContainer>
              <Table />
              <SvgInfo>좌석</SvgInfo>
              <H4>{cafeTable ? cafeTable : '없어'}</H4>
            </SvgOneContainer>
            <SvgOneContainer>
              <Cup />
              <SvgInfo>아메리카노</SvgInfo>
              <H4>{Americano ? Americano : '없어'}</H4>
            </SvgOneContainer>
            <SvgLastContainer>
              <Time />
              <SvgInfo>영업시간</SvgInfo>
              <H4>{cafeDetail ? cafeDetail : '없어'} </H4>
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
        <Divide></Divide>
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
                    <SlickSlide id="aaaa">
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
              <ThumbSlickSlide>
                <ThumbnailImg src={blank} />
              </ThumbSlickSlide>
            </Slider>
          </Thumbnailcontainer>
        </SlideContainer>
        <div></div>
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
