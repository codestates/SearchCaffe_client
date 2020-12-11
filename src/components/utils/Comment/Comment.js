import Tag from '../Tag/index';
import Scope from '../Scope/index';
import styled from 'styled-components';
import { ImageModal } from '../ImageModal/ImageModal';
import enlargeImg from '../CommentWrite/images/enlarge.png';
import commentLoading from './commentLoading.svg';
import CommentWrite from '../CommentWrite/CommentWrite';
import { useEffect, useState } from 'react';
import { storageService } from '../../../firebase/mainbase';
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

const Comment = (props) => {
  // const upLoadTask = storageService.ref('images');
  const [images, setImages] = useState([commentLoading, commentLoading]);
  const [imageModal, setModal] = useState(false);
  const [currentImg, setCurrentImg] = useState('');

  useEffect(() => {
    setImages(props.userComment.userImg);
  }, []);

  const handleImageEnlarge = (index) => {
    setCurrentImg(images[index]);
    setModal((pres) => !pres);
  };
  const handleUnEnlarge = () => {
    setModal((pres) => !pres);
  };

  return (
    <CommentStyle>
      <UserAndScope>
        <UserName>
          {props.userComment.username ? props.userComment.username : '게스트'}
        </UserName>
        <ScopeContainer>
          <Scope
            isScope={true}
            size="20px"
            scope={props.userComment.userStar ? props.userComment.userStar : -1}
          ></Scope>
        </ScopeContainer>
      </UserAndScope>

      <TagWrapper>
        {props.userComment.userTag
          ? props.userComment.userTag.map((tag) => {
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
      {props.userComment.userComment ? (
        <CommentInput>{props.userComment.userComment}</CommentInput>
      ) : (
        ''
      )}

      <CommentImages>
        {images
          ? images.map((img, index) => {
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
// function mapStateToProps(state, ownProps) {

//   return { state };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Content);

export default Comment;
