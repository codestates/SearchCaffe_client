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
<<<<<<< HEAD

=======
>>>>>>> 6dc69fa605bdc5fa674c5b862bcfaa339a6397d4
const ButtonStyle = styled.span`
  margin-top: 20px;
  position: relative;
  display: inline-block;
  left: 60%;
`;

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
<<<<<<< HEAD
=======

>>>>>>> 6dc69fa605bdc5fa674c5b862bcfaa339a6397d4
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
    <span>
<<<<<<< HEAD
      <ButtonStyle onClick={handleLike} >
=======
      <ButtonStyle onClick={handleLike}>
>>>>>>> 6dc69fa605bdc5fa674c5b862bcfaa339a6397d4
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
<<<<<<< HEAD
=======

>>>>>>> 6dc69fa605bdc5fa674c5b862bcfaa339a6397d4
        <Button
          name="찜하기"
          icon={like}
          color="inherit"
          hoverColor="inherit"
          fontColor="#333333"
          hoverFontColor="#8a705a"
          noBorder={true}
<<<<<<< HEAD
          imgSize="32px"
          margin="1px"
          fontSize='20px'
          hoverFontSize={true}
=======
          imgSize="30px"
          margin="1px"
>>>>>>> 6dc69fa605bdc5fa674c5b862bcfaa339a6397d4
        >
          리뷰 작성
        </Button>
      </ButtonStyle>
<<<<<<< HEAD
    </span >
  );
};
=======
    </span>
  );
};

>>>>>>> 6dc69fa605bdc5fa674c5b862bcfaa339a6397d4
function mapStateToProps(state, ownProps) {
  console.log(state);
  return { ...state, ownProps };
}
<<<<<<< HEAD
=======

>>>>>>> 6dc69fa605bdc5fa674c5b862bcfaa339a6397d4
function mapDispatchToProps(dispatch) {
  return {
    handleUserHeart: (cafe) => dispatch(actionCreators.changeUserHeart(cafe)),
  };
}
<<<<<<< HEAD
export default connect(mapStateToProps, mapDispatchToProps)(Like);
=======

export default connect(mapStateToProps, mapDispatchToProps)(Like);
>>>>>>> 6dc69fa605bdc5fa674c5b862bcfaa339a6397d4
