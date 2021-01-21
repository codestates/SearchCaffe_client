import LocationImg from './location.png';
import defaultImg from './dummyImg/defaultCafe.jpeg';
import Tag from '../Tag/Tag';
import styled from 'styled-components';
import Scope from '../Scope/index';
// props
// cafeImage:? 카페 대표 이미지
// cafeName:string - 카페 이름
// cafeAddress:string - 카페 주소
// cafeTag:array - 카페 태그 배열

const CardStyle = styled.span`
  width: 400px;
  height: ${(props) =>
    !props.tag ? '470px' : 470 + props.tag.length * 25 + 'px'};
  background-color: #ffffff;
  font-size: 0.8rem;

  text-align: left;
  transition: 0.2s;
  box-shadow: 1.2px 1.2px 1.2px 1.2px gray;

  &.fadeCard-enter {
    opacity: 0;
  }
  // enter to
  &.fadeCard-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: opacity 300ms, transform 300ms;
  }
  // exit from
  &.fadeCard-exit {
    opacity: 1;
  }
  // exit to
  &.fadeCard-exit-active {
    opacity: 0;
    transform: scale(0.9);
    transition: opacity 300ms, transform 300ms;
  }
  &.fadeCard-appear {
    opacity: 1;
  }
  &.fadeCard-appear-active {
    opacity: 0;
  }
`;

const CardImg = styled.img`
  transition: 0.2s;
  text-align: center;
  position: relative;
  top: 1%;
  left: 1.5%;
  width: 97%;
  height: 65%;
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

const ScopeContain = styled.div`
  position: relative;
  top: 6%;
  left: 4%;
`;

const Card = (props) => {
  return (
    <CardStyle tag={props.cafeTag}>
      <CardImg src={props.cafeImage || defaultImg} />
      <CardName>{props.cafeName ? props.cafeName : '제목'}</CardName>
      <CardAddress>
        <CardLocationImg src={LocationImg}></CardLocationImg>
        <CardAddressDetail>
          {props.cafeAddress ? props.cafeAddress : '등록된 주소가 없습니다'}
        </CardAddressDetail>
      </CardAddress>
      <ScopeContain>
        <Scope isScope={true} size="20px" scope={props.cafeStar}></Scope>
      </ScopeContain>

      <CardTags>
        {props.cafeTag
          ? props.cafeTag.map((tag) => <Tag isSmall={true} tagName={tag}></Tag>)
          : '관련 태그가 없습니다'}
      </CardTags>
    </CardStyle>
  );
};

export default Card;
