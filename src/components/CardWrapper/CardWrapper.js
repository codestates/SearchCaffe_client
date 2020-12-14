import styled from 'styled-components';
import Card from '../utils/Card/index';
import CardSkeleton from '../utils/Card/CardSkeleton';
import noResultImg from './noResult.png';
import { connect } from 'react-redux';
import { actionCreators } from '../../reducer/store';
import { dbService, storageService } from '../../firebase/mainbase';
import { useEffect, useState, useMemo, Fragment } from 'react';
import { cafes } from '../../cafeInfos';
import {
  CSSTransition,
  TransitionGroup,
  Transition,
} from 'react-transition-group';
import Recommendation from './Recommendation';

const CardWrapperCover = styled.div``;

const WrapperLine = styled.span`
  display: inline-block;
  width: 100%;
  border-top: 1px solid black;
`;
const WrapperLineLeft = styled(WrapperLine)`
  width: 20%;
  max-width: 350px;
  position: relative;
  left: 30px;
  bottom: 10px;
`;
const WrapperLineRight = styled(WrapperLine)`
  max-width: 350px;
  width: 20%;
  position: relative;
  right: 30px;
  bottom: 10px;
`;
const WrapperTitle = styled.div`
  width: 100%;
  display: inline-block;
  font-size: 1.7rem;
  font-weight: bold;
  text-align: center;
`;
const CardWrapperStyle = styled.div`
  display: flex;
  flex-direction: row;
  width: 95%;
  max-width: 1130px;
  margin: 20px auto;
  background-color: #ebebeb;

  /* &.appearingCard-enter {
    opacity: 0;
  }
  &.appearingCard-enter-active {
    opacity: 1;
  }
  &.appearingCard-exit {
    opacity: 1;
  }
  &.appearingCard-exit-active {
    opacity: 0;
  }
  &.appearingCard-appear {
    opacity: 1;
  }
  &.appearingCard-appear-active {
    opacity: 0;
  } */
`;

const NoSearchResultContainer = styled.div`
  margin: auto;
  width: 60%;
  height: auto;
  position: relative;
  top: 50px;
`;
const NoSearchResultTitle = styled.div`
  font-size: 2rem;
  width: 90%;
  height: 50px;
  text-align: center;
  margin: auto;
  display: block;
  font-weight: bold;
`;
const NoSearchResultImg = styled.img`
  width: 30px;
  display: inline;
  position: relative;
  top: 6px;
  margin: 3px 10px 0 4px;
`;

const CardWrapper = ({ state, cardList }) => {
  // NOTE 화면 진입시 보여줄 스켈레톤 카드
  let Skeleton = [
    <Card key={1} skeletonSize="445px"></Card>,
    <Card key={2} skeletonSize="460px"></Card>,
    <Card key={3} skeletonSize="430px"></Card>,
    <Card key={4} skeletonSize="470px"></Card>,
    <Card key={5} skeletonSize="420px"></Card>,
    <Card key={6} skeletonSize="445px"></Card>,
  ];
  const [isTag, setIsTag] = useState(false);
  const [cards, setCards] = useState([]);
  const [isCozyCafe, setCozyCafe] = useState(Skeleton);
  const [isGoodForTask, setGoodForTask] = useState(Skeleton);
  const [currentKeyword, setCurrentKeyword] = useState('');

  let cardListArr = [];
  let cozyCafe = [];
  let goodForTask = [];

  // NOTE '전체 카드목록' + '메인화면 카드' 설정 및 'cards' 설정
  useEffect(() => {
    dbService
      .collection('CafeInformation')
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          cardListArr.push(doc.data());
        });
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error);
        cardList = cafes;
      })
      .finally(function () {
        cardList(cardListArr);
        setCards(cardListArr);

        cozyCafe = cardListArr.filter((card) =>
          !card.cafeTag
            ? (card.cafeTag = [])
            : card.cafeTag.indexOf('편안한') !== -1
        );
        goodForTask = cardListArr.filter((card) =>
          !card.cafeTag
            ? (card.cafeTag = [])
            : card.cafeTag.indexOf('작업하기 좋은') !== -1
        );
        cozyCafe.length > 6
          ? (cozyCafe = cozyCafe.slice(0, 6))
          : cozyCafe.length > 3
          ? cozyCafe.slice(0, 3)
          : (cozyCafe = []);
        goodForTask.length > 6
          ? (goodForTask = goodForTask.slice(0, 6))
          : goodForTask.length > 3
          ? goodForTask.slice(0, 3)
          : (goodForTask = []);
        setCozyCafe(cozyCafe);
        setGoodForTask(goodForTask);
      });
  }, []);

  // NOTE 태그 변화시 cards 변경
  let tags = state.tagArr ? state.tagArr.join() : '';
  useEffect(() => {
    if (tags !== '') {
      let results = state.cardArr;
      let tags = state.tagArr ? state.tagArr : [];
      for (let tag of tags) {
        results = results.filter((card) => {
          if (!card.cafeTag) {
            card.cafeTag = [];
          }
          return card.cafeTag.indexOf(tag) !== -1;
        });
      }

      setCards(results);
    }

    if (tags === '') {
      setCards(state.cardArr);
    }
  }, [tags]);

  // NOTE 키워드 변화시 cards 변경
  useEffect(() => {
    let keyword = state.keyword || '';
    let returnArr = [];
    let cardArr = state.cardArr || [];
    cardArr.forEach((card) => {
      if (card.cafeName.indexOf(keyword) !== -1) {
        returnArr.push(card);
      } else if (card.cafeAddress.indexOf(keyword) !== -1) {
        returnArr.push(card);
      }
    });
    setCards(returnArr);
    // if (returnArr.length > 0) {
    //   console.log(returnArr);
    //   setCards(returnArr);
    // } else {
    //   returnArr
    // }
  }, [state.keyword]);

  // NOTE 검색 결과 없음'
  if (cards) {
    if (
      (tags && tags !== '') &
      (state && state.keyword !== '') &
      (cards && cards.length === 0)
    ) {
      return (
        <NoSearchResultContainer>
          <NoSearchResultTitle>
            검색 결과가 없어요.
            <NoSearchResultImg src={noResultImg}></NoSearchResultImg>이런 카페는
            어떠신가요?
          </NoSearchResultTitle>
          <CardWrapperStyle>
            <Recommendation recommendation={isGoodForTask}></Recommendation>
          </CardWrapperStyle>
        </NoSearchResultContainer>
      );
    }
  }
  // NOTE 메인화면
  return (!tags | (tags === '')) & (!state.keyword | (state.keyword === '')) ? (
    <CardWrapperCover>
      <WrapperTitle>
        <WrapperLineRight />
        <span>분위기 좋은 카페</span>
        <WrapperLineLeft />
      </WrapperTitle>
      <CardWrapperStyle>
        <Recommendation recommendation={isCozyCafe}></Recommendation>
      </CardWrapperStyle>
      <WrapperTitle>
        <WrapperLineRight />
        <span>작업하기 좋은 카페</span>
        <WrapperLineLeft />
      </WrapperTitle>
      <CardWrapperStyle>
        <Recommendation recommendation={isGoodForTask}></Recommendation>
      </CardWrapperStyle>
    </CardWrapperCover>
  ) : (
    // NOTE 검색결과(키워드 또는 태그 => 아직은 둘 중 하나만 가능)
    <CardWrapperCover>
      <WrapperTitle>
        <WrapperLineRight />
        <span>검색 결과</span>
        <WrapperLineLeft />
      </WrapperTitle>
      <CSSTransition
        in={true}
        timeout={300}
        classNames="appearingCard"
        mountOnEnter
        unmountOnExit
      >
        <CardWrapperStyle>
          <TransitionGroup component={null}>
            <Recommendation recommendation={cards}></Recommendation>
          </TransitionGroup>
        </CardWrapperStyle>
      </CSSTransition>
    </CardWrapperCover>
  );
};
function mapStateToProps(state, ownProps) {
  return { state };
}

function mapDispatchToProps(dispatch) {
  return {
    cardList: (card) => dispatch(actionCreators.addCardList(card)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CardWrapper);
