import Comment from '../utils/Comment/index';
import CommentWrite from '../utils/CommentWrite/index';
import { cafeComment } from '../../cafeInfos';
import styled from 'styled-components';
const Detail3 = styled.div`
  width: 90%;
  height: 100%;
  margin: auto;

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

const ContentComment = (props) => {
  return (
    <Detail3>
      <div className="Line2">REVEIW</div>
      <CommentWrite></CommentWrite>
      {cafeComment.filter((comment) => comment.cafeId === 0).length !== 0
        ? cafeComment
            .filter((comment) => comment.cafeId === 0)
            .map((userComment) => (
              <Comment
                key={userComment.username}
                userComment={userComment}
              ></Comment>
            ))
        : ''}
    </Detail3>
  );
};

export default ContentComment;
