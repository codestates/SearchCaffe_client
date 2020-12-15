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
const CommentStyle = styled.div`
  display: block;
  margin: auto;
  min-width: 400px;
  max-width: 800px;
  width: 50%;
  height: auto;
  padding-top: 50px;
`;
const UserAndScope = styled.h3`
  display: inline;
  padding-left: 5%;

  display: relative;
`;

const DeleteButton = styled.button`
  display: inline;
  text-align: center;
  text-decoration: none;
  display: relative;
`;

const ModifyButton = styled.button`
  display: inline;
  margin-left: 40%;
  margin-right: 5px;
  text-align: center;
  text-decoration: none;
  display: relative;
`;

const UserName = styled.span``;
const ScopeContainer = styled.span`
  margin-left: 30px;
  position: relative;
  top: 2px;
`;
const TagWrapper = styled.div`
  margin-top: 13px;
  padding-left: 2%;
`;
const CommentInput = styled.div`
  margin-top: 30px;
  margin-left: 5%;
  padding-left: 2%;
  width: 85%;
  height: auto;
  min-height: 50px;

  background-color: #ffffff;
`;
const CommentImages = styled.div`
  margin-top: 13px;
  margin-left: 5%;
`;

const UploadedImgCover = styled.span`
  background-color: rgba(207, 204, 201, 0.61);
  position: absolute;
  width: 102px;
  height: 102px;
  margin-top: 11px;
  margin-left: 10px;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0.2s linear, opacity 0.2s linear;
`;
const Uploaded = styled.span`
  display: inline-block;
  width: 122px;
  height: 122px;
  margin: 10px 10px 15px 10px;
  &:hover ${UploadedImgCover} {
    visibility: visible;
    opacity: 1;
  }
`;
const UploadedImg = styled.span`
  border: 1px solid #d1d1d1;
  display: inline-block;
  width: 100px;
  height: 100px;
  margin: 10px 20px 10px 10px;
  background-image: ${(props) => 'url(' + props.img + ')'};
  background-size: 100%;
`;
const EnlargeImg = styled.img`
  width: 17px;
  position: absolute;
  margin-top: 75px;
  margin-left: 10px;
`;
const Divide = styled.div`
  padding-top: 20px;
  border-bottom: 1px solid black;
  margin: auto;
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
  useEffect(() => {
    setImages(userComment.userImg);
  }, []);
  console.log(userComment);
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
      </UserAndScope>
      {userComment.username === user?.displayName ? (
        <ModifyButton onClick={modifyComment}>수정</ModifyButton>
      ) : (
        ''
      )}
      {userComment.username === user?.displayName ? (
        <DeleteButton onClick={deleteComment}>삭제</DeleteButton>
      ) : (
        ''
      )}
      <TagWrapper>
        {userComment.userTag
          ? userComment.userTag.map((tag) => {
              return (
                <Tag
                  key={tag}
                  tagName={tag}
                  isSmall={true}
                  color="#ffffff"
                ></Tag>
              );
            })
          : ''}
      </TagWrapper>
      {userComment.userComment ? (
        <CommentInput>{userComment.userComment}</CommentInput>
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
                  <UploadedImg img={img}></UploadedImg>
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
