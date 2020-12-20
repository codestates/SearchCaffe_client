/*global kakao*/
import './App.css';
import Main from './pages/Main';
import Content from './pages/Content';
import Mypage from './pages/Mypage';
import Nav from './components/Nav/index';
import Footer from './components/Footer/index';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { cafeComment } from './cafeInfos';
import NearbyCafe from './components/NearbyCafe/NearbyCafe';
import { cafes } from './cafeInfos';
import ScrollToTop from './ScrollToTop';

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Nav></Nav>
      <Switch>
        <Route exact path="/">
          <Main></Main>
        </Route>
        <Route path="/content" component={Content}>
          <Route path="/content/:id" component={Content}></Route>
        </Route>
        <Route path="/mypage">
          <Mypage></Mypage>
        </Route>
      </Switch>
      <Footer></Footer>
    </BrowserRouter>
  );
};

export default App;
