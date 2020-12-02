import React from 'react';
import { authService, firebaseInstance } from '../../firebase/mainbase';
import '../../styles/oauth.css';

const Auth = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === 'google') {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === 'github') {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    } else if (name === 'facebook') {
      provider = new firebaseInstance.auth.FacebookAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };
  return (
    <div className="account-login">
      <button className="button--google" onClick={onSocialClick} name="google">
        <span className="social-logo" onClick={onSocialClick} name="google">
          <img
            alt=""
            src="https://img.icons8.com/fluent/35/000000/google-logo.png"
          />
        </span>
        <span className="social-text" onClick={onSocialClick}>
          구글로 로그인하기
        </span>
      </button>
      <button className="button--github" onClick={onSocialClick} name="github">
        <span className="social-logo" onClick={onSocialClick}>
          <img
            alt=""
            src="https://img.icons8.com/fluent/35/000000/github.png"
          />
        </span>
        <span className="social-text" onClick={onSocialClick}>
          깃허브로 로그인하기
        </span>
      </button>
      <button
        className="button--facebook"
        onClick={onSocialClick}
        name="facebook"
      >
        <span className="social-logo" onClick={onSocialClick}>
          <img
            alt=""
            src="https://img.icons8.com/fluent/35/000000/facebook-new.png"
          />
        </span>
        <span className="social-text" onClick={onSocialClick}>
          페이스북으로 로그인하기
        </span>
      </button>
    </div>
  );
};
export default Auth;
