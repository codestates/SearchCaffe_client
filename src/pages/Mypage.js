import React, { useState } from 'react';
import './Mypage.css';
import Profile from '../components/Profile/Profile';
import { authService } from '../firebase/mainbase';
export default function Mypage() {
  const [activeTab, setActiveTab] = useState(0);
  const [userInfo, setUserInfo] = useState(authService.currentUser);
  const handleTabClick = (id) => {
    setActiveTab(id);
  };
  const content = {
    0: <Profile userInfo={userInfo}></Profile>,
    1: <h1>찜한카페</h1>,
    2: <h1>리뷰관리</h1>,
  };
  const tabName = ['정보수정', '찜한 카페', '리뷰관리'];
  return (
<<<<<<< HEAD
    <>
      <div className="tabs-wrapper">
        <div className="tabs">
          {tabName.map((tab, i) => {
            return (
              <div
                key={i}
                className="tabs-contents"
                onClick={() => handleTabClick(i)}
              >
                {tab}
              </div>
            );
          })}
        </div>
      </div>
      <div className="content-profile">{content[activeTab]}</div>
    </>
=======
    <div className="tabs-wrapper">
      <div className="tabs">
        {tabName.map((tab, i) => {
          return (
            <div key={i} className="tabs-contents" onClick={() => handleTabClick(i)}>
              {tab}
            </div>
          );
        })}
      </div>
      <div className="content">{content[activeTab]}</div>
    </div>
>>>>>>> a4b257752d6b002df108f71fd1118436415cde16
  );
}
