import Tag from '../Tag/index';
import Scope from '../Scope/index';
import styled from 'styled-components';
import { ImageModal } from '../ImageModal/ImageModal';
import enlargeImg from '../CommentWrite/images/enlarge.png';
import commentLoading from './commentLoading.svg';
import CommentWrite from '../CommentWrite/CommentWrite';
import { connect } from 'react-redux';
import { actionCreators } from '../../../reducer/store';
import { useEffect, useState } from 'react';
import { dbService, storageService } from '../../../firebase/mainbase';
import defaultUser from './defaultUser.png';
const CommentStyle = styled.div`
  display: block;
  margin: 0 auto 10px auto;
  min-width: 400px;
  max-width: 800px;
  width: 50%;
  height: auto;
  padding-top: 50px;
  transition: 0.2s;
  :hover {
    background-color: #efefef;
    transition: 0.2s;
  }
`;
const UserAndScope = styled.div`
  display: inline;
  padding-left: 5%;

  display: relative;
`;

const UserProfile = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 15px;
  position: relative;
  top: 10px;
`;

const DeleteButton = styled.button`
  display: inline-block;
  text-align: center;
  text-decoration: none;
  position: relative;
  border: none;
  background-color: inherit;
  color: #555555;
  transition: 0.2s;
  :hover {
    color: #222222;
    font-size: 0.9rem;
    transition: 0.2s;
  }
  :focus {
    color: #222222;
    outline: 0;
    font-size: 0.9rem;
    transition: 0.2s;
  }
`;

const ModifyButton = styled.button`
  display: inline-block;
  margin-left: 30%;
  margin-right: 7px;
  text-align: center;
  text-decoration: none;
  position: relative;
  border: none;
  background-color: inherit;
  color: #555555;
  transition: 0.2s;
  :hover {
    color: #222222;
    font-size: 0.9rem;
    transition: 0.2s;
  }
  :focus {
    color: #222222;
    outline: 0;
    font-size: 0.9rem;
    transition: 0.2s;
  }
`;

const UserName = styled.span``;
const ScopeContainer = styled.span`
  margin-left: 30px;
  position: relative;
  top: 2px;
`;
const TagWrapper = styled.div`
  margin-top: 13px;
  padding-left: 8%;
`;
const CommentInput = styled.div`
  margin-top: 10px;
  margin-left: 8%;
  padding-left: 2%;
  width: 80%;
  height: auto;
  min-height: 50px;

  background-color: #ffffff;
`;
const CommentImages = styled.div`
  margin-top: 13px;
  margin-left: 7%;
`;

const UploadedImgCover = styled.span`
  background-color: rgba(207, 204, 201, 0.61);
  position: absolute;
  width: 102px;
  height: 102px;
  margin-top: 1px;
  margin-left: 11px;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0.2s linear, opacity 0.2s linear;
`;
const Uploaded = styled.span`
  display: inline-block;
  width: 122px;
  height: 122px;
  margin: 0px 10px 0px 10px;
  &:hover ${UploadedImgCover} {
    visibility: visible;
    opacity: 1;
  }
`;
const UploadedImg = styled.img`
  border: 1px solid #d1d1d1;
  display: inline-block;
  width: 100px;
  height: 100px;
  margin: 0px 10px 0px 10px;
  /* background-image: ${(props) => 'url(' + props.img + ')'};
  background-size: 100%; */
`;
const EnlargeImg = styled.img`
  width: 17px;
  position: absolute;
  margin-top: 75px;
  margin-left: 10px;
`;
const Divide = styled.div`
  padding-top: 5px;
  border-bottom: 1px solid #888888;
  margin: auto auto auto auto;
  width: 93%;
`;

const BackGroundCover = styled.div`
  position: fixed;
  top: 0%;
  left: 0%;
  margin: auto;
  width: 100%;
  height: 100%;
  background-color: rgba(220, 220, 220, 0.94);
  z-index: 1;
`;

const Detail3 = styled.div`
  width: 90%;
  height: 100%;
  margin: auto;
  max-width: 1500px;
  position: relative;
  background: #fafafa;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

  margin-top: 5rem;
  padding-top: 48px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e9ecef;
`;

const Comment = ({ userComment, currentCafe, user, currentCafeComment }) => {
  const [commentModal, setCommentModal] = useState(false);
  const [images, setImages] = useState([commentLoading, commentLoading]);
  const [imageModal, setModal] = useState(false);
  const [currentImg, setCurrentImg] = useState('');
  const [beforeModify, setBeforeModify] = useState();
  const [userProfileImg, setUserProfileImg] = useState(defaultUser);

  useEffect(() => {
    setImages(userComment.userImg);
    dbService
      .collection('users')
      .where('displayName', '==', userComment.username)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          setUserProfileImg(doc.data().photoURL);
        });
      });
  }, []);
  const handleModal = () => {
    setCommentModal((pres) => !pres);
  };

  const handleImageEnlarge = (index) => {
    setCurrentImg(images[index]);
    setModal((pres) => !pres);
  };
  const handleUnEnlarge = () => {
    setModal((pres) => !pres);
  };

  const deleteComment = async () => {
    try {
      await dbService
        .collection('CafeComment')
        .doc(`${userComment.cafeId}&${userComment.commentId}`)
        .delete();
      console.log('Document successfully deleted!');
    } catch (error) {
      console.error('CafeComment Delete Fail :' + error);
    }

    try {
      let cafeCommentArr = [];
      const data = await dbService.collection('CafeComment').get();
      data.forEach((commentData) => {
        if (currentCafe.cafeid === commentData.data().cafeId) {
          cafeCommentArr.push(commentData.data());
        }
      });
      currentCafeComment(cafeCommentArr);
    } catch (error) {
      console.error('CafeComment get Error :' + error);
    }
    setCommentModal(false);
  };

  const modifyComment = async () => {
    try {
      const data = await dbService
        .collection('CafeComment')
        .doc(`${userComment.cafeId}&${userComment.commentId}`)
        .get();

      const tempObj = await data.data();
      setBeforeModify(tempObj);
      setCommentModal((pres) => !pres);
    } catch (error) {
      console.error(`can't find ModifyComment:` + error);
    }
  };

  return (
    <CommentStyle>
      <UserAndScope>
        <UserProfile src={userProfileImg}></UserProfile>
        <UserName>
          {userComment.username ? userComment.username : '게스트'}
        </UserName>
        {commentModal ? (
          <>
            <Detail3>
              <BackGroundCover>
                <CommentWrite
                  onChange={commentModal}
                  beforeModify={beforeModify}
                  handleModal={handleModal}
                ></CommentWrite>
              </BackGroundCover>
            </Detail3>
          </>
        ) : (
          ''
        )}
        <ScopeContainer>
          <Scope
            isScope={true}
            size="20px"
            scope={userComment.userStar ? userComment.userStar : -1}
          ></Scope>
        </ScopeContainer>
        <span>
          {userComment.username === user?.displayName ? (
            <ModifyButton onClick={modifyComment}>수정</ModifyButton>
          ) : (
            ''
          )}
        </span>
        <span>
          {userComment.username === user?.displayName ? (
            <DeleteButton onClick={deleteComment}>삭제</DeleteButton>
          ) : (
            ''
          )}
        </span>
      </UserAndScope>

      <TagWrapper>
        {userComment.userTag
          ? userComment.userTag.map((tag) => {
              return (
                <Tag
                  key={tag}
                  tagName={tag}
                  isSmall={true}
                  color="#efefef"
                ></Tag>
              );
            })
          : ''}
      </TagWrapper>
      {userComment.userComment ? (
        <CommentInput>
          <span>{userComment.userComment}</span>
        </CommentInput>
      ) : (
        ''
      )}

      <CommentImages>
        {userComment.userImg
          ? userComment.userImg.map((img, index) => {
              return (
                <Uploaded key={index}>
                  <UploadedImgCover>
                    <EnlargeImg
                      data-index={index}
                      onClick={(e) => {
                        handleImageEnlarge(e.target.dataset.index);
                      }}
                      src={enlargeImg}
                    ></EnlargeImg>
                  </UploadedImgCover>
                  <UploadedImg src={img}></UploadedImg>
                </Uploaded>
              );
            })
          : ''}
      </CommentImages>
      {imageModal ? (
        <ImageModal image={currentImg} unEnlarge={handleUnEnlarge}></ImageModal>
      ) : (
        ''
      )}
      <Divide></Divide>
    </CommentStyle>
  );
};

function mapStateToProps(state, ownProps) {
  return { ...state, ownProps };
}

function mapDispatchToProps(dispatch) {
  return {
    currentCafeComment: (comment) =>
      dispatch(actionCreators.currentCafeComment(comment)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Comment);
