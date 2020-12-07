/*global kakao*/
import './App.css';
import Main from './pages/Main';
import Content from './pages/Content';
import Mypage from './pages/Mypage';
import Nav from './components/Nav/index';
import Footer from './components/Footer/index';
import Scope from './components/utils/Scope/index';
import { dbService } from './firebase/mainbase';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';

function App() {
  return (
    <BrowserRouter>
      <Nav></Nav>

      <Switch>
        <Route exact path="/">
          <Main></Main>
        </Route>
        <Route path="content">
          <Content></Content>
        </Route>
        <Route path="mypage">
          <Mypage></Mypage>
        </Route>
      </Switch>
      <Footer></Footer>
      <Scope></Scope>
    </BrowserRouter>
  );
}

export default App;
