import styled, { createGlobalStyle } from 'styled-components';
import Tag from '../components/utils/Tag';
import tagnames from '../components/utils/Tag/tagnames';
import { ReactComponent as Table } from './Table.svg'
import { ReactComponent as Cup } from './Cup.svg'
import { ReactComponent as Time } from './Time.svg'
import Slider from "react-slick";
import { img } from './main.jpeg'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Comment from "../components/Comment";
import CommentWrite from '../components/CommentWrite';


export default function Content(props) {
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
  flex-direction:column;


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
  float:left;

  strong{
    padding-left:1rem;
    &:after {
    content: '';
    display: block;
    width: 20rem;
    height: 2px;
    position: absolute;
    left: 3rem;
    background: gray;
    margin-top: 3px;
    }
  }

    ul li{
      list-style:none;
      width:100%;
      margin : 12px 0 30px;
    }
      p{
        display:table;
        width:100%;
        }

      span{
        display: table-cell;
    width: auto;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: -0.025em;
    vertical-align: middle;
        }

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

  const StyledSlider = styled(Slider)`
  padding-top: 2rem;
  position:absolute;
  left:55%;
  `;

  const settings = {
    dots: true,
    centerMode: true,
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
    max-width: 30%;
    max-height: 30%;
  `;
  const imgUrl = require('./Table.svg');

  const items = [
    { id: 1, url: imgUrl },
    { id: 2, url: imgUrl },
    { id: 3, url: imgUrl },
  ];

  return (
    <>
      <GlobalStyle />
      <Detail>
        <h1>나주 공간 카페</h1>
        <div className="adress">전남 나주시 그린로 331</div>
        <div className="describe">모던한 인테리어와 수제 디저트가 특징인 카페</div>
        <StyledSlider {...settings} style={{ width: "300px" }}>
          <div>
            <img alt="#" src={'https://odden1.speedgabia.com/static/bb/lists/spot-n03-s02/spot_f_n03-s02-01.jpg'} style={{ width: "300px" }} ></img>
          </div>
          <div>
            <img alt="#" src={'https://www.jeongdong.or.kr/static/portal/img/HKPU_04_04_pic1.jpg'} style={{ width: "300px" }}></img>
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
      </Detail>
      <Detail2>
        <div className="Line2">MEUN</div>
        <DetailBox>
          <strong>Coffee</strong>
          <ul>
            <li>
              <p>
                <span>에스프레소</span>
                <span>핫</span>
                <span>5.0</span>
              </p>
            </li>
            <li>
              <p>
                <span>아메리카노</span>
                <span>핫 / 아이스</span>
                <span>5.0</span>
              </p>
            </li>
            <li>
              <p>
                <span>카푸치노</span>
                <span>핫 / 아이스</span>
                <span>6.0</span>
              </p>
            </li>
            <li>
              <p>
                <span>카페라떼</span>
                <span>핫 / 아이스</span>
                <span>6.0</span>
              </p>
            </li>
            <li>
              <p>
                <span>바닐라라뗴</span>
                <span>핫 / 아이스</span>
                <span>7.0</span>
              </p>
            </li>
            <li>
              <p>
                <span>넛라떼</span>
                <span>핫 / 아이스</span>
                <span>7.0</span>
              </p>
            </li>
          </ul>
        </DetailBox>
        <DetailBox>
          <strong>Dessert</strong>
          <ul>
            <li>
              <p>
                <span></span>
                <span></span>
                <span></span>
              </p>
            </li>
          </ul>
        </DetailBox>

      </Detail2>
      <Detail3>
        <div className="Line3">REVEIW</div>
        <Comment />
        <CommentWrite />
      </Detail3>
    </>
  );
}
