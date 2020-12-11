import Comment from '../utils/Comment/index';
import CommentWrite from '../utils/CommentWrite/index';
import { cafeComment } from '../../cafeInfos';
import styled from 'styled-components';
import { useState } from 'react';
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

const ContentComment = (props) => {
  const [commentModal, setModal] = useState(false);
  const handleModal = () => {
    setModal((pres) => !pres);
  };
  return (
    <Detail3>
      <div className="Line2">REVEIW</div>
      <button onClick={handleModal}>리뷰작성</button>

      {commentModal ? (
        <>
          <BackGroundCover>
            <CommentWrite handleModal={handleModal}></CommentWrite>
          </BackGroundCover>
        </>
      ) : (
        ''
      )}

      {cafeComment.filter((comment) => comment.cafeId === 0).length !== 0
        ? cafeComment
            .filter((comment) => comment.cafeId === 0)
            .map((userComment, index) => (
              <Comment key={index} userComment={userComment}></Comment>
            ))
        : ''}
    </Detail3>
  );
};

export default ContentComment;