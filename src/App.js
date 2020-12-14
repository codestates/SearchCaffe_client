/*global kakao*/
import './App.css';
import Main from './pages/Main';
import getCurrentPosition from './getCurrentPosition';
import Content from './pages/Content';
import Mypage from './pages/Mypage';
import Nav from './components/Nav/index';
import Footer from './components/Footer/index';
import { actionCreators } from './reducer/store';
import { connect } from 'react-redux';
import { dbService } from './firebase/mainbase';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { cafeComment } from './cafeInfos';
import getNearbyCafe from './getNearbyCafe';
const App = () => {
  const [cafe, setCafe] = useState([]);
  const getData = async () => {
    let cafe = await getNearbyCafe();
    setCafe(cafe);
  };
  // const cafes = fakeData.map((cafe, i) => <Cafe place={cafe.address} key={i} />);
  // const [cafes, setCafe] = useState([]);
  // const getCafeInfo = async () => {
  //   let cafe = await dbService.collection('test').get();
  //   cafe.forEach((doc) => {
  //     return doc.data();
  //   });
  //   setCafe(cafe);
  // };
  // useEffect(() => {
  //   dbService.collection('test').onSnapshot((snapshot) => {
  //     const cafeInfo = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     setCafe(cafeInfo);
  //   });
  // }, []);
  // getCurrentPosition();
  useEffect(() => {
    getData();
    console.log(cafe);
  }, []);
  return (
    <BrowserRouter>
      <Nav></Nav>

      <Switch>
        <Route exact path="/">
          <Main></Main>
        </Route>
        <Route path="/content">
          <Content></Content>
        </Route>
        <Route path="/mypage">
          <Mypage></Mypage>
        </Route>
      </Switch>
      <Footer></Footer>
    </BrowserRouter>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    cardList: (card) => dispatch(actionCreators.addCardList(card)),
  };
}

export default connect(null, mapDispatchToProps)(App);
