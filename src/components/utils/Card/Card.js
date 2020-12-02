import LocationImg from './location.png';
import defaultImg from './dummyImg/defaultCafe.jpeg';
import Tag from '../Tag/Tag';
import styled from 'styled-components';

// props
// cafeImage:? 카페 대표 이미지
// cafeName:string - 카페 이름
// cafeAddress:string - 카페 주소
// cafeTag:array - 카페 태그 배열

const CardStyle = styled.span`
  width: 400px;
  height: 500px;
  background-color: #ffffff;
  font-size: 0.8rem;
  display: inline-block;
  text-align: left;
  margin: 5px 5px 5px 5px;
  box-shadow: 1.2px 1.2px 1.2px 1.2px gray;
`;

const CardImg = styled.img`
  text-align: center;
  position: relative;
  top: 1%;
  left: 1.5%;
  width: 97%;
  height: 70%;
`;

const CardName = styled.div`
  position: relative;
  top: 3%;
  left: 4%;
  font-size: 1.2rem;
`;

const CardAddress = styled.div`
  position: relative;
  top: 5%;
  left: 4%;
`;
const CardLocationImg = styled.img`
  width: 20px;
  height: 20px;
`;
const CardAddressDetail = styled.span`
  position: relative;
  bottom: 5px;
  left: 2%;
`;

const CardTags = styled.div`
  position: relative;
  top: 7%;
  left: 3%;
`;

const Card = (props) => {
  return (
    <CardStyle>
      <CardImg src={props.cafeImage || defaultImg} />
      <CardName>{props.cafeName ? props.cafeName : '제목'}</CardName>
      <CardAddress>
        <CardLocationImg src={LocationImg}></CardLocationImg>
        <CardAddressDetail>
          {props.cafeAddress ? props.cafeAddress : '등록된 주소가 없습니다'}
        </CardAddressDetail>
      </CardAddress>
      <CardTags>
        {props.cafeTag
          ? props.cafeTag.map((tag) => <Tag isSmall={true} tagName={tag}></Tag>)
          : '관련 태그가 없습니다'}
      </CardTags>
    </CardStyle>
  );
};

export default Card;
