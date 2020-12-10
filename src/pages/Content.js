import styled, { createGlobalStyle } from 'styled-components';
import Tag from '../components/utils/Tag';
import tagnames from '../components/utils/Tag/tagnames';
import { ReactComponent as Table } from './Table.svg'
import { ReactComponent as Cup } from './Cup.svg'
import { ReactComponent as Time } from './Time.svg'
import { dbService, storageService } from '../firebase/mainbase';
import { useEffect, useState, useMemo, Fragment } from 'react';
import Slider from "react-slick";
import { img } from './main.jpeg'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import Comment from "../components/Comment";
// import CommentWrite from '../components/CommentWrite';
import { actionCreators } from '../reducer/store';
import { connect } from 'react-redux'

const GlobalStyle = createGlobalStyle`
body {
  background: #e9ecef;
  margin: auto;
}
`;

const Detail = styled.div`
width: 90%;
height: 100%;
background: white;
box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
margin: auto;

display:flex;


padding-top: 48px;
padding-left: 32px;
padding-right: 32px;
padding-bottom: 24px;

h1{
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
  margin-top:30px;
  font-size: 18px
}

.block{
  width : 200px;
  height :200px;
  background: green;
}

.tagBox{
  margin-top:1rem;
}
`
const Line = styled.div`
border: 1px solid #000000;
width: 5rem;
transform: rotate(90deg);
`

const SvgContainer = styled.div`
display:flex;
padding-top: 3rem;
width: 15rem;
flex-basis: fill;
justify-content: space-between ;
flex-direction:row;
align-items: center;
`
const DescribeContainer = styled.div`
display:flex;
flex-direction:column;

`

const MainImg = styled.img`
float: right;
width: 30%;
height: 30%;
`;

const Detail2 = styled.div`
width: 90%;
height: 100%;
display:flex;
flex-direction: column;

margin: auto;

position: relative; 
background: white;
box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

margin-top: 5rem;
padding-top: 48px;
padding-left: 32px;
padding-right: 32px;
padding-bottom: 24px;
border-bottom: 1px solid #e9ecef;



.Line2 {
display: flex;
flex-basis: 100%;
align-items: center;
color: black;
font-size: 35px;
margin: 8px 0px;
&:before,
&:after {
content: "";
flex-grow: 1;
background: black;
height: 2px;
font-size: 0px;
line-height: 0px;
margin: 0px 16px;
}
}
`

const DetailBox = styled.div`
display:flex;
width:20rem;
`
const Ul = styled.ul`
    list-style:none;
    width:200px;
    margin : 12px 0 10px;
    padding-inline-start:0px;

   li{
    list-style:none;
    width:200px;
    margin : 12px 0 10px;;
    padding-left:0;
  }
    p{
      display:table;
      width:100%;
      }

`
const DetailBoxWrapper = styled.div`
display:flex;
justify-content: space-evenly;
`
const Strong = styled.strong`
  padding-left:1rem;
  height:1px;
  :after {
  content: '';
  display: block;
  width: 20rem;
  height: 2px;
  position: absolute;
  left: rem;
  background: gray;
  margin-top: 10px;
  }

`
const Meun = styled.span`
    
  display: table-cell;
  width: ${props => props.width || "auto"};
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.025em;
  vertical-align: middle;
  text-align: left;
  line-height: 30px;
  text-align:${(props) => props.text_align || 'left'};
  `


const Detail3 = styled.div`
width: 90%;
height: 100%;

margin: auto;

position: relative; 
background: white;
box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

  margin: auto;

.Line3 {
display: flex;
flex-basis: 100%;
align-items: center;
color: black;
font-size: 35px;
margin: 8px 0px;
&:before,
&:after {
content: "";
flex-grow: 1;
background: black;
height: 2px;
font-size: 0px;
line-height: 0px;
margin: 0px 16px;
}

}
`
const SlideContainer = styled.div`
width:300px;
height:300px;
margin-left:auto;
`

const StyledSlider = styled(Slider)`
padding-top: 2rem;
`;

const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  speed: 500,
  autoplay: true,
  slidesToShow: 1,
  slidesToScroll: 1
};

const ImageContainer = styled.div`
`

const Image = styled.img`
width:100%;
height:100%;
object-fit: contain;
`;
const imgUrl = require('./Table.svg');

const items = [
  { id: 1, url: imgUrl },
  { id: 2, url: imgUrl },
  { id: 3, url: imgUrl },
];


let cardListArr = [];
const Content = ({ state }) => {
  dbService
    .collection('CafeInformation')
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        cardListArr.push(doc.data());
      });
    })
    .catch((err) =>
      console.log('ERROR!', err))


  return (
    console.log('===============>>state', state),
    <>
      <GlobalStyle />
      <Detail>
        <DescribeContainer>
          <h1>나주 공간 카페</h1>
          <div className="adress">전남 나주시 그린로 331</div>
          <div className="describe">모던한 인테리어와 수제 디저트가 특징인 카페</div>
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
              tagName={tagnames["가까운"]}
            ></Tag>
            <Tag
              isButton={true}
              color="#ffffff"
              isSmall={true}
              tagName={tagnames["주차 가능"]}
            ></Tag>
            <Tag
              isButton={true}
              color="#ffffff"
              isSmall={true}
              tagName={tagnames["애완 동물 동반"]}
            ></Tag>
          </div>
        </DescribeContainer>
        <SlideContainer>
          <StyledSlider {...settings}>
            <div>
              <Image alt="#" src={'https://firebasestorage.googleapis.com/v0/b/searchcafe-17018.appspot.com/o/cafeImage%2F%EB%8A%98%EC%86%9C%EB%8B%B9%2F2020846016_editor_image.jpg?alt=media&token=1835984f-a8ed-405e-8f4e-df97175beab4'} />
            </div>
            <div>
              <Image alt="#" src={'https://firebasestorage.googleapis.com/v0/b/searchcafe-17018.appspot.com/o/cafeImage%2F%EB%8A%98%EC%86%9C%EB%8B%B9%2F20208172316_editor_image.jpg?alt=media&token=c5b05234-8a38-4f0a-9054-42565f2f7d2f'} />
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
*/}{' '}
          </StyledSlider>
        </SlideContainer>
      </Detail>
      <Detail2>
        <div className="Line2">MEUN</div>
        <DetailBoxWrapper>
          <DetailBox>
            <Strong>Coffee</Strong>
            <Ul>
              <li>
                <p>
                  <Meun>에스프레소</Meun>
                  <Meun text_align={"center"} width={"100px"}>핫</Meun>
                  <Meun text_align={"right"} width={"15px"}>5.0</Meun>
                </p>
              </li>
              <li>
                <p>
                  <Meun>아메리카노</Meun>
                  <Meun text_align={"center"} width={"100px"}>핫 / 아이스</Meun>
                  <Meun text_align={"right"} width={"15px"}>5.0</Meun>
                </p>
              </li>
              <li>
                <p>
                  <Meun>카푸치노</Meun>
                  <Meun text_align={"center"} width={"100px"}>핫 / 아이스</Meun>
                  <Meun text_align={"right"} width={"15px"}>6.0</Meun>
                </p>
              </li>
              <li>
                <p>
                  <Meun>카페라떼</Meun>
                  <Meun text_align={"center"} width={"100px"}>핫 / 아이스</Meun>
                  <Meun text_align={"right"} width={"15px"}>6.0</Meun>
                </p>
              </li>
              <li>
                <p>
                  <Meun>바닐라라뗴</Meun>
                  <Meun text_align={"center"} width={"100px"}> 핫 / 아이스</Meun>
                  <Meun text_align={"right"} width={"15px"}>7.0</Meun>
                </p>
              </li>
              <li>
                <p>
                  <Meun>넛라떼</Meun>
                  <Meun text_align={"center"} width={"100px"}>핫 / 아이스</Meun>
                  <Meun text_align={"right"} width={"15px"}>7.0</Meun>
                </p>
              </li>
            </Ul>
          </DetailBox>
          <DetailBox>
            <Strong>Dessert</Strong>
            <Ul>
              <li>
                <p>
                  <Meun>치즈케이크</Meun>
                  <Meun text_align={"center"} width={"100px"}></Meun>
                  <Meun text_align={"right"} width={"15px"}>7.0</Meun>
                </p>
              </li>
            </Ul>
          </DetailBox>
        </DetailBoxWrapper>
      </Detail2>
      <Detail3>
        <div className="Line3">REVEIW</div>
      </Detail3>
    </>
  );
}

function mapStateToProps(state, ownProps) {
  return { state };
}

function mapDispatchToProps(dispatch) {
  return {
    cardList: (card) => dispatch(actionCreators.addCardList(card)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);
