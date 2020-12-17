import { ReactComponent as Table } from './Table.svg';
import { ReactComponent as Cup } from './Cup.svg';
import { ReactComponent as Time } from './Time.svg';


import { tagName } from '../../cafeInfos';
import Tag from '../utils/Tag/index';
import styled from 'styled-components';


import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Like from '../utils/Like/Like'
import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { actionCreators } from '../../reducer/store'

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
const Detail = styled.section`
width:1000px;
margin:0 auto;
margin-top:20px;

display:flex;
`;

const Header = styled.header`
position:relative;
padding-bottom: 10px;
min-height:74px;
`

const TittleWrap = styled.div`
display:flex;
display:--webkit-flex;
flex-direction:row;
-webkit-flex-direction:row;
-wedkit-box-direction:normal;
--webkit-box-orient:horizontal;
`
const Tittle = styled.span`
padding-right: 50px;
max-width: 75%;
font-size:1.2rem;
line-height:46px;
`

const Name = styled.h1`
display:inline-block;
max-width:100%;
word-break:break-all;
`

const ActionButtonWrap = styled.div`
display:flex;
display:--webkit-flex;
flex-direction:row;
-webkit-flex-direction:row;
-wedkit-box-direction:normal;
--webkit-box-orient:horizontal;
margin-left:auto;
`

const LikeWrap = styled.div`
position:relative;
padding-top:-10px;
cursor: pointer;
display:inline-block;
text-align:center;
`

const LikeModi = styled(Like)`
display: inline-block;
text-indent: -9999px;
vertical-align: middle;
font-size: 20px;
`

const Info = styled.table`
border-collapse: collapse;
border-spacing:0;

`

const Tbody = styled.tbody`
display:table-row-group;
vertical-align:middle;
border-color:inherit;
`

const Tr = styled.tr`
  display: table-row;
  vertical-align: inherit;
  border-color: inherit;

`
const Th = styled.th`
  width: 110px;
  font-size: .9rem;
  color: rgba(79,79,79,0.6);
  line-height: 1.7;
  text-align: left;
  vertical-align: top;
  padding-right: 10px;
  padding-bottom: 5px;
`

const Td = styled.td`
  font-size: .9rem;
  color: #4f4f4f;
  line-height: 1.7;
  text-align: left;
  vertical-align: middle;
  padding-bottom: 5px;
`

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
margin-left: 50%;
width:100%;
`;

const SlideMaincontainer = styled.div`
  display:block;
  position:relative;
  overflow:hidden;
  background-size:cover;
  background-position: 50% 50%;
`

const StyledSlider = styled(Slider)`
`;

const Image = styled.img`
  width: 300px;
  height: 400px;
  object-fit:cover;
  border-radius: 8px;
  box-shadow: 0 13px 27px -5px hsla(240, 30.1%, 28%, 0.25), 0 8px 16px -8px hsla(0, 0%, 0%, 0.3),
`;

const Thumbnailcontainer = styled.div`
  margin-top: 15px;
  height: 75px;
  text-align: center;
  width: 50%;
`

const ThumbnailImg = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 16px;
  background-image: ${({ src }) => (!!src ? `url(${src})` : 'none')};
  display: flex;
  align-items: center;
  border-radius: 4px;
  box-shadow: 0 13px 27px -5px hsla(240, 30.1%, 28%, 0.25), 0 8px 16px -8px hsla(0, 0%, 0%, 0.3),
    0 -6px 16px -6px hsla(0, 0%, 0%, 0.03);

`

const SlickSlide = styled.div`
  text-align: center;
  position: relative;
  margin : auto;
  :focus {
    outline: none;
  } 
`


const ContentHeader = (props) => {

  const current = (props.cardArr).filter(el => el.id === props.currentCafe.cafeid);

  const { cafeid, cafeTag, cafeName, cafeAddress, cafeImg, cafeStar } = current[0];

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
    asNavFor: '.slider-nav'
  };

  const settingsThumbs = {
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: true,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    centerPadding: '10px'
  };


  //console.log('==================current>> :', current);

  return (
    <>
      {/* <MainImgCover />
      <MainImage style={{ backgroundImage: `url(${cafeImg[0]})` }} /> */}
      <Detail>
        <DescribeContainer>
          <Header>
            <TittleWrap>
              <Tittle>
                <Name>{cafeName ? cafeName : "해당 정보를 불러오는 중입니다."}</Name>
              </Tittle>
              <ActionButtonWrap>
                <LikeWrap>
                  <LikeModi />
                </LikeWrap>
              </ActionButtonWrap>
            </TittleWrap>
          </Header>
          <Info>
            <Tbody>
              <Tr>
                <Th >주소</Th>
                <Td>{cafeAddress ? cafeAddress : '해당 정보를 불러오는 중입니다.'}</Td>
              </Tr>
            </Tbody>
          </Info>
          <SvgContainer>
            <Table />
            <Line />
            <Cup />
            <Line />
            <Time />
          </SvgContainer>
          <div className="tagBox">
            {cafeTag ? cafeTag.map((el) => {
              return (
                <Tag
                  isButton={true}
                  color="#ffffff"
                  isSmall={true}
                  tagName={el} />
              )
            }) : <div>태그가 존자하지 않습니다</div>}
          </div>
        </DescribeContainer>
        <SlideContainer>
          <SlideMaincontainer>
            <StyledSlider {...settingsMain} asNavFor={nav2} ref={slider => (setSlider1(slider))}>
              {cafeImg ? cafeImg.map(el => {
                return (
                  <SlickSlide>
                    <Image src={el} />
                  </SlickSlide>
                )
              }) : <div>'사진이 없습니다.'</div>}
            </StyledSlider>
          </SlideMaincontainer>
          <Thumbnailcontainer>
            <StyledSlider {...settingsThumbs} asNavFor={nav1} ref={slider => (setSlider2(slider))}>
              {cafeImg ? cafeImg.map(el => {
                return (
                  <SlickSlide>
                    <ThumbnailImg src={el} />
                  </SlickSlide>
                )
              }) : <div>'사진이 없습니다.'</div>}
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
