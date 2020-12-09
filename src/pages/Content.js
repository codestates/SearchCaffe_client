import styled, { createGlobalStyle } from 'styled-components';
import Tag from '../components/utils/Tag';
import tagnames from '../components/utils/Tag/tagnames';
import { ReactComponent as Table } from './Table.svg';
import { ReactComponent as Cup } from './Cup.svg';
import { ReactComponent as Time } from './Time.svg';
import Slider from 'react-slick';
import img from './main.jpeg';
import CommentWrite from '../components/CommentWrite/index';
import Comment from '../components/Comment/index';
import cafes from '../cafeInfos';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Content(props) {
  const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

  const Detail = styled.div`
    width: 90%;
    height: 100%;
    background: white;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

    margin: auto;

    padding-top: 48px;
    padding-left: 32px;
    padding-right: 32px;
    padding-bottom: 24px;

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
  `;
  const Line = styled.div`
    border: 1px solid #000000;
  `;

  const SvgContainer = styled.div`
    display: flexbox;
    flex-direction: row;
  `;

  const MainImg = styled.img`
    float: right;
    width: 30%;
    height: 30%;
  `;

  const Detail2 = styled.div`
    width: 90%;
    height: 100%;
    display: flexbox;
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
      font-size: 40px;
      margin: 8px 0px;
      &:before,
      &:after {
        content: '';
        flex-grow: 1;
        background: black;
        height: 2px;
        font-size: 0px;
        line-height: 0px;
        margin: 0px 16px;
      }
    }
  `;
  const Detail3 = styled.div`
    width: 90%;
    height: 100%;

    margin: auto;

    position: relative;
    background: #fafafa;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

    margin-top: 5rem;
    padding-top: 48px;
    padding-left: 32px;
    padding-right: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid #e9ecef;
  `;

  const StyledSlider = styled(Slider)`
    width: 40%;
    position: relative;
    left: 55%;

    .slick-slide div {
      outline: none;
    }
  `;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    centerMode: true,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  const ImageContainer = styled.div`
    margin-right: 100%;
  `;

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
        <div className="describe">
          모던한 인테리어와 수제 디저트가 특징인 카페
        </div>
        <StyledSlider {...settings}>
          <div>
            <div className="block">1</div>
          </div>
          <div>
            <h1>2</h1>
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
        <Tag
          isButton={true}
          color="#ffffff"
          isSmall={true}
          tagName={tagnames.가까운}
        ></Tag>
      </Detail>
      <Detail2>
        <div className="Line2">MEUN</div>
      </Detail2>
      <Detail3>
        <div className="Line2">REVEIW</div>
        <CommentWrite cafe={cafes[0]}></CommentWrite>
        {cafes[0].cafeComment.length !== 0
          ? cafes[0].cafeComment.map((userComment) => (
              <Comment
                key={userComment.username}
                userComment={userComment}
              ></Comment>
            ))
          : ''}
      </Detail3>
    </>
  );
}
