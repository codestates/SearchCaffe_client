import { authService } from '../../firebase/mainbase';
import { useHistory } from 'react-router-dom';

const Profile = ({ userInfo }) => {
  const history = useHistory();
  const handleLogOut = () => {
    authService.signOut();
    history.push('/');
  };
  console.log(userInfo.photoURL);
  return (
    <div>
      <h3>프로필 사진 변경</h3>
      <div className="avatar">
        <img src={userInfo.photoURL} />
      </div>
      <button onClick={handleLogOut}>Log Out</button>
    </div>
  );
};

export default Profile;
