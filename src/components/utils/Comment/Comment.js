import Tag from '../Tag/index';
import Scope from '../Scope/index';
import styled from 'styled-components';
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
const UploadedImg = styled.span`
  display: inline-block;
  width: 120px;
  height: 120px;
  margin: 10px 30px 10px 10px;
  background-image: ${(props) => 'url(' + props.img + ')'};
  background-size: 100%;
`;

const Divide = styled.div`
  padding-top: 20px;
  border-bottom: 1px solid black;
  margin: auto;
  width: 93%;
`;

const Comment = (props) => {
  const upLoadTask = storageService.ref('images');

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
        {props.userComment.userImg
          ? props.userComment.userImg.map((img) => {
              return <UploadedImg img={img}></UploadedImg>;
            })
          : ''}
      </CommentImages>
      <Divide></Divide>
    </CommentStyle>
  );
};

export default Comment;
