import React, { useEffect, useState } from 'react';
import { authService } from '../../firebase/mainbase';
import './SignUp.css';

const SignUp = ({ handleClose, handleOpen, show }) => {
  const showHideClassName = show ? 'modal-signup display-block' : 'modal-signup display-none';
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      let code = error.code;
      if (code === 'auth/email-already-in-use') {
        setError('이미 가입된 이메일입니다.');
      } else if (code === 'auth/invalid-email') {
        setError('잘못된 이메일 형식입니다.');
      } else if (code === 'auth/weak-password') {
        setError('패스워드는 6자리이상 입력해주세요.');
      }
    }
  };
  const onClick = () => {
    handleClose();
    handleOpen();
    setEmail('');
    setPassword('');
    setError('');
  };
  return (
    <div className={showHideClassName}>
      <section className="modal-signup-main">
        <div className="close-btn" onClick={handleClose}>
          x
        </div>
        <h1 className="header-signup">회원가입</h1>
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            className="input-signup"
            type="text"
            name="email"
            onChange={handleChange}
            placeholder="email"
            value={email}
            required
          />
          <input
            className="input-signup"
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="password"
            value={password}
            required
          />
          <button type="submit" className="signup-btn">
            이메일 회원가입
          </button>
        </form>
        <div className="errorMsg">{error}</div>
        <span className="link-signin" onClick={onClick}>
          이미 아이디가 있으신가요?
        </span>
      </section>
    </div>
  );
};

export default SignUp;
