import React, { useState } from 'react';
import { authService } from '../../firebase/mainbase';
import './SignUp.css';

const SignUp = ({ handleClose, show }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';
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

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <h1>회원가입</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="email" onChange={handleChange} placeholder="email" required />
          <input type="password" name="password" onChange={handleChange} placeholder="password" required />
          <button type="submit" className="btn">
            이메일 회원가입
          </button>
        </form>
        <div>{error}</div>
        <a href="#" className="link">
          이미 아이디가 있으신가요?
        </a>
      </section>
    </div>
  );
};

export default SignUp;
