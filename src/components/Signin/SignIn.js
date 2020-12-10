import React, { useState } from 'react';
import { authService, storageService } from '../../firebase/mainbase';
import Auth from './auth';
import './SignIn.css';

const SignIn = ({ handleClose, handleOpen, show }) => {
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
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.signInWithEmailAndPassword(email, password);
      const user = authService.currentUser;
      if (!user.photoURL) {
        user.updateProfile({
          photoURL:
            'https://firebasestorage.googleapis.com/v0/b/searchcafe-17018.appspot.com/o/images%2FdefaultImage.svg?alt=media&token=090d4e95-0b21-4838-ae05-f6c34b34ff84',
        });
      }
      setEmail('');
      setError('');
      setPassword('');
      handleClose();
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
  const onClick = () => {
    handleClose();
    handleOpen();
    setEmail('');
    setError('');
    setPassword('');
  };
  return (
    <div className={showHideClassName}>
      <section className="modal-signin-main">
        <div className="close-btn" onClick={handleClose}>
          x
        </div>
        <h1 className="header-signin">로그인</h1>
        <div className="email-login container">
          <form className="login-form" onSubmit={onSubmit}>
            <input
              type="text"
              className="input-login"
              name="email"
              onChange={handleChange}
              placeholder="email"
              value={email}
              required
            />
            <input
              type="password"
              className="input-login"
              name="password"
              onChange={handleChange}
              placeholder="password"
              value={password}
              required
            />
            <div className="wrap-checkbox">
              <input type="checkbox" id="chk" />
              <label for="chk">이메일 기억하기</label>
            </div>
            <button className="signin-btn" type="submit">
              이메일 로그인
            </button>
          </form>
          <div className="errorMsg">{error}</div>
        </div>
        <Auth handleClose={handleClose} />
        <span className="link-signup" onClick={onClick}>
          이메일로 회원가입
        </span>
      </section>
    </div>
  );
};

export default SignIn;
