import { ReactComponent as Table } from './Table.svg';
import { ReactComponent as Cup } from './Cup.svg';
import { ReactComponent as Time } from './Time.svg';
import { tagName } from '../../cafeInfos';
import Tag from '../utils/Tag/index';
import styled from 'styled-components';
import Slider from 'react-slick';
const Detail = styled.div`
  width: 90%;
  height: 100%;
  background: white;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
  margin: auto;

  display: flex;

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
  margin-left: auto;
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
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  centerMode: true,
  autoplay: true,
  autoplaySpeed: 4000,
};
const ContentHeader = (props) => {
  return (
    <Detail>
      <DescribeContainer>
        <h1>나주 공간 카페</h1>
        <div className="adress">전남 나주시 그린로 331</div>
        <div className="describe">
          모던한 인테리어와 수제 디저트가 특징인 카페
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
*/}{' '}
        </StyledSlider>
      </SlideContainer>
    </Detail>
  );
};

export default ContentHeader;
