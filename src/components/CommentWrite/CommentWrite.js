import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Scope from '../utils/Scope/index';
import Tag from '../utils/Tag/index';
import Blank from './BlankImg.png';
import { storageService } from '../../firebase/mainbase';

const CommentWriteStyle = styled.div`
  display: block;
  margin: auto;
  min-width: 400px;
  max-width: 1000px;
  width: 60%;
  height: auto;
  border: 1px solid black;
`;

const UserAndScope = styled.h3`
  display: inline;
  font-weight: initial;
  margin-left: 6%;
`;
const CommentTitle = styled.span`
  margin-top: 25px;
  display: inline-block;
`;
const ScopeContainer = styled.span`
  margin-left: 10px;
`;
const TagWrapper = styled.div`
  position: relative;
  margin-top: 15px;
  margin-left: 6%;
`;
const CommentInput = styled.textarea`
  resize: none;
  margin-left: 6%;
  width: 80%;
  height: 200px;
  margin-top: 20px;
`;
const CommentImgWrapper = styled.div`
  min-width: 400px;
  width: 70%;
  height: 30%;
  margin-bottom: 50px;
  position: relative;
  display: inline;
  left: 5%;
  @media (max-width: 1750px) {
    display: inline-block;
  }
  @media (max-width: 980px) {
    left: 10%;
  }
`;
const CommentSubmitButton = styled.button`
  float: right;
  display: block;
  position: relative;
  right: 20%;
  top: 15px;
  margin-top: 10px;
  margin-bottom: 20px;
  width: 110px;
  height: 40px;
  @media (max-width: 1750px) {
    position: absolute;
    bottom: 30%;
    margin: 30px;
    left: 95%;
  }
  @media (max-width: 1695px) {
    position: absolute;
    bottom: 30%;
    margin: 30px;
    left: 90%;
  }
  @media (max-width: 1290px) {
    position: absolute;
    bottom: 500px;
    left: 80%;
  }
  @media (max-width: 980px) {
    position: relative;
    left: 160px;
    float: none;
  }
`;

const UploadImg = styled.span`
  display: inline-block;
  width: 120px;
  height: 120px;
  margin: 20px 20px 15px 20px;
  background-image: url(${Blank});
`;
const UploadedImg = styled.input`
  display: inline-block;
  width: 120px;
  height: 120px;
  margin: 10px 30px 15px 10px;

  background-image: url(${Blank});
`;

const commentTags = [
  '커피가 맛있는',
  '디저트가 맛있는',
  '편안한',
  '작업하기 좋은',
  '대화하기 좋은',
  '바다가 보이는',
];

const CommentWrite = (props) => {
  const [selectedTags, setTags] = useState([]);
  const [scope, setScope] = useState(-1);
  const [comment, setComment] = useState('');
  const [isFile, setIsFile] = useState();
  const getData = async () => {
    const data = await storageService.ref().child('cafeImage');
    console.log(data);
  };
  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (e) => {
      const {
        currentTarget: { result },
      } = e;
      setIsFile(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const fileRef = storageService.ref().child(`cafeImage/practice`);
    const response = await fileRef.putString(isFile, 'data_url');
    const publirUrl = await response.ref.getDownloadURL();
    console.log(publirUrl);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <CommentWriteStyle>
      <UserAndScope>
        <CommentTitle>카페에 대한 리뷰를 작성해주세요</CommentTitle>
        <ScopeContainer>
          <Scope setScope={setScope}></Scope>
        </ScopeContainer>
      </UserAndScope>

      <TagWrapper>
        {commentTags.map((tag) => (
          <span
            key={tag}
            onClick={() => {
              if (selectedTags.indexOf(tag) === -1) {
                let tempTags = selectedTags;
                tempTags.push(tag);
                setTags(tempTags);
              } else {
                let tempTags = selectedTags;
                tempTags.splice(selectedTags.indexOf(tag), 1);
                setTags(tempTags);
              }
            }}
          >
            <Tag
              tagName={tag}
              isSmall={true}
              color="white"
              isButton={true}
            ></Tag>
          </span>
        ))}
      </TagWrapper>
      <CommentInput
        onChange={(e) => {
          setComment(e.target.value);
        }}
      ></CommentInput>
      <CommentImgWrapper>
        <form onSubmit={onSubmit}>
          {isFile && <img src={isFile} width="200px" height="200px" />}
          <input type="submit" value="제출하기" />
        </form>
        <UploadImg></UploadImg>
        <UploadedImg
          type="file"
          accept="image/*"
          onChange={onFileChange}
        ></UploadedImg>
        <UploadedImg></UploadedImg>
        <UploadedImg></UploadedImg>
        <CommentSubmitButton>제출</CommentSubmitButton>
      </CommentImgWrapper>
    </CommentWriteStyle>
  );
};

export default CommentWrite;
