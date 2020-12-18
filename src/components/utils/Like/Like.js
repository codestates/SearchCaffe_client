import Button from '../Button/Button';
import SignIn from '../../Signin/SignIn';
import SignUp from '../../SignUp/SignUp';
import likeImg from './like.png';
import likedImg from './liked.png';
import { useState } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../../../reducer/store';
import styled from 'styled-components';
import { dbService } from '../../../firebase/mainbase';

const ButtonStyle = styled.span``;

const Like = ({ user, currentCafe, handleUserHeart }) => {
  const handleLike = async () => {
    if (user) {
      if (like === likeImg) {
        setLike(likedImg);
        let tempHeart = [];
        user.heart ? (tempHeart = user.heart) : (tempHeart = []);
        tempHeart.push(currentCafe.cafeName);
        console.log(tempHeart);
        dbService.collection('users').doc(user.uid).update({
          heart: tempHeart,
        });
        handleUserHeart(tempHeart);
      } else {
        setLike(likeImg);
        let tempHeart = user.heart;
        tempHeart.splice(tempHeart.indexOf(currentCafe.cafeName), 1);
        console.log(tempHeart);
        dbService.collection('users').doc(user.uid).update({
          heart: tempHeart,
        });
        handleUserHeart(tempHeart);
      }
      return;
    } else {
      openSignin();
    }
  };
  const [showSignin, setShowSignin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isLogin, setIsLogin] = useState(!!user);
  const [like, setLike] = useState(
    !user | !user?.heart | (user?.heart?.indexOf(currentCafe.cafeName) === -1)
      ? likeImg
      : likedImg
  );
  const openSignin = () => {
    setShowSignin(true);
  };
  const closeSignin = () => {
    setShowSignin(false);
  };
  const openSignup = () => {
    setShowSignup(true);
  };
  const closeSignup = () => {
    setShowSignup(false);
  };
  return (
    <ButtonStyle onClick={handleLike}>
      <div>
        <span>
          <span>
            <SignIn
              show={showSignin}
              handleClose={closeSignin}
              handleOpen={openSignup}
            />
            <SignUp
              show={showSignup}
              handleClose={closeSignup}
              handleOpen={openSignin}
            />{' '}
          </span>
        </span>
      </div>
      <Button
        name="찜하기"
        icon={like}
        color="inherit"
        hoverColor="inherit"
        fontColor="#9A9A9A"
        hoverFontColor="#8a705a"
        noBorder={true}
        imgSize="27px"
        margin="1px"
        fontSize="19px"
        hoverFontSize={true}
      ></Button>
    </ButtonStyle>
  );
};
function mapStateToProps(state, ownProps) {
  console.log(state);
  return { ...state, ownProps };
}
function mapDispatchToProps(dispatch) {
  return {
    handleUserHeart: (cafe) => dispatch(actionCreators.changeUserHeart(cafe)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Like);
