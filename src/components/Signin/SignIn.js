import React, { useState } from 'react';
import { authService } from '../../firebase/mainbase';
import Auth from './auth';
import './SignIn.css';

const SignIn = ({ handleClose, show }) => {
  const showHideClassName = show
    ? 'modal-signin display-block'
    : 'modal-signin display-none';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleChange = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await authService.signInWithEmailAndPassword(email, password);
    } catch (error) {
      let code = error.code;
      console.log(code);
      if (code === 'auth/user-not-found') {
        setError('존재하지 않는 이메일입니다.');
      } else if (code === 'auth/invalid-email') {
        setError('잘못된 이메일 형식입니다.');
      } else if (code === 'auth/wrong-password') {
        setError('패스워드가 틀렸습니다.');
      }
    }
  };

  return (
    <div className={showHideClassName}>
      <section className="modal-signin-main">
        <h1 className="header-signin">로그인</h1>
        <div className="email-login container">
          <form className="login-form" onSubmit={handleLogin}>
            <input
              type="text"
              className="input-login"
              name="email"
              onChange={handleChange}
              placeholder="email"
              required
            />
            <input
              type="password"
              className="input-login"
              name="password"
              onChange={handleChange}
              placeholder="password"
              required
            />
            <div className="wrap-checkbox">
              <input type="checkbox" id="chk" />
              <label for="chk">이메일 기억하기</label>
            </div>
            <button className="signin-button" type="submit" className="btn">
              이메일 로그인
            </button>
          </form>
          <div>{error}</div>
        </div>
        <Auth />
        <a href="#" className="link-signup">
          이메일로 회원가입
        </a>
      </section>
    </div>
  );
};

export default SignIn;
