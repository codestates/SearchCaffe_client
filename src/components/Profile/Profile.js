import { authService } from '../../firebase/mainbase';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Profile.css';

const Profile = (props) => {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState(null);
  const [attachment, setAttachment] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [newDisplayName, setNewDisplayName] = useState('');
  const handleLogOut = () => {
    authService.signOut();
    props.userHandler(null);
    history.push('/');
  };
  const onChange = (event) => {
    const {
      target: { value, name },
    } = event;
    if (name === 'username') {
      setNewDisplayName(value);
    } else if (name === 'password') {
      setNewPassword(value);
    } else if (name === 're-password') {
      setRePassword(value);
    }
  };
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserInfo(user);
        if (user.displayName) {
          setNewDisplayName(user.displayName);
        } else {
          setNewDisplayName(user.email);
        }
      }
    });
  }, []);
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const handleChange = (event) => {
    const {
      target: { name },
    } = event;
    if (name === 'change-avatar') {
      console.log(name);
      userInfo.updateProfile({ photoURL: attachment });
    }
  };
  return (
    <div className="myprofile">
      {userInfo && (
        <>
          <div className="avatar-upload">
            <h3>프로필 사진 변경</h3>
            <div className="avatar">
              <img
                className="image"
                src={attachment ? attachment : userInfo.photoURL}
              />
            </div>
            <label htmlFor="input-file" className="upload-btn">
              이미지 선택
            </label>
            <button
              className="change-btn"
              name="change-avatar"
              onClick={handleChange}
            >
              변경
            </button>
            <input
              type="file"
              id="input-file"
              onChange={onFileChange}
              accept="image/*"
              style={{ display: 'none' }}
            />
            <button className="logout-btn" onClick={handleLogOut}>
              로그아웃
            </button>
          </div>
          <div className="user-info">
            <h3>유저 정보</h3>
            <div className="user-inf">
              <div className="user-em-id">이메일: {userInfo.email}</div>
              <div className="user-em-id">
                <span>닉네임:</span>
                <input
                  type="text"
                  name="username"
                  className="username"
                  onChange={onChange}
                  value={newDisplayName}
                />
              </div>
            </div>
            <button className="change-btn" name="change-username">
              변경
            </button>
            <h3>비밀번호 변경</h3>
            <div>
              <input
                className="pwchange"
                type="password"
                placeholder="현재 비밀번호"
              ></input>
            </div>
            <div>
              <input
                className="pwchange"
                onChange={onChange}
                type="password"
                name="password"
                placeholder="새 비밀번호"
                value={newPassword}
              ></input>
            </div>
            <div>
              <input
                className="pwchange"
                onChange={onChange}
                type="password"
                name="re-password"
                placeholder="새 비밀번호 확인"
              ></input>
            </div>
            <div>
              <button
                className="change-btn"
                name="change-pw"
                onClick={handleChange}
              >
                변경
              </button>
              {/* {this.state.error ? <div className="alert-box">{this.state.error}</div> : ''} */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
