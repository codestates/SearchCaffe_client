import './Nav.css';
import React, { useState, useEffect } from 'react';
import SignIn from '../Signin/SignIn';
import { authService } from '../../firebase/mainbase';
import { Link } from 'react-router-dom';
import SignUp from '../SignUp/SignUp';

const Nav = () => {
  // const [Login, setLogin] = useState(false);
  const [showSignin, setShowSignin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });
  }, []);
  const openSignin = () => {
    setShowSignin(true);
    document.body.style.overflow = 'hidden'; // 모달창이 열리면 스크롤 고정
  };
  const closeSignin = () => {
    setShowSignin(false);
    document.body.style.overflow = 'unset'; // 스크롤 고정 해제
  };
  const openSignup = () => {
    setShowSignup(true);
    document.body.style.overflow = 'hidden'; // 모달창이 열리면 스크롤 고정
  };
  const closeSignup = () => {
    setShowSignup(false);
    document.body.style.overflow = 'unset'; // 스크롤 고정 해제
  };
  return (
    <div className="header">
      <span className="logo">
        <Link to="/">LOGO</Link>
      </span>
      <div className="login">
        <SignIn show={showSignin} handleClose={closeSignin} handleOpen={openSignup} />
        <SignUp show={showSignup} handleClose={closeSignup} handleOpen={openSignin} />
        {isLogin ? (
          <span className="mypage-btn">
            <Link to="mypage">마이페이지</Link>
          </span>
        ) : (
          <span className="login-btn" onClick={openSignin}>
            로그인
          </span>
        )}
      </div>
    </div>
  );
};

export default Nav;
