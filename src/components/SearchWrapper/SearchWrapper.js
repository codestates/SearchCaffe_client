import Tag from '../utils/Tag/index';
import SearchBar from '../utils/SearchBar/index';
import tagnames from '../utils/Tag/tagnames';
import styled from 'styled-components';

const SearchWrapperStyle = styled.div`
  text-align: center;
`;

const TagWrapperStyle = styled.div``;
const TagWrapperStyleDiv = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
`;

const SearchBarWrapperStyle = styled.div``;

const SearchWrapper = (props) => {
  return (
    <SearchWrapperStyle>
      <TagWrapperStyle>
        <TagWrapperStyleDiv>
          <Tag isButton={true} color="#ffffff" tagName={tagnames.가까운}></Tag>
          <Tag isButton={true} color="#ffffff" tagName={tagnames.단체석}></Tag>
          <Tag
            isButton={true}
            color="#ffffff"
            tagName={tagnames['애완 동물 동반']}
          ></Tag>
          <Tag
            isButton={true}
            color="#ffffff"
            tagName={tagnames['배달 가능']}
          ></Tag>
          <Tag
            isButton={true}
            color="#ffffff"
            tagName={tagnames['주차 가능']}
          ></Tag>
          <Tag
            isButton={true}
            color="#ffffff"
            tagName={tagnames['테이크 아웃 전문']}
          ></Tag>
        </TagWrapperStyleDiv>
        <TagWrapperStyleDiv>
          <Tag
            isButton={true}
            color="#ffffff"
            tagName={tagnames['커피가 맛있는']}
          ></Tag>
          <Tag
            isButton={true}
            color="#ffffff"
            tagName={tagnames['작업하기 좋은']}
          ></Tag>
          <Tag isButton={true} color="#ffffff" tagName={tagnames.편안한}></Tag>
          <Tag
            isButton={true}
            color="#ffffff"
            tagName={tagnames['대화하기 좋은']}
          ></Tag>
          <Tag
            isButton={true}
            color="#ffffff"
            tagName={tagnames['디저트가 맛있는']}
          ></Tag>
          <Tag
            isButton={true}
            color="#ffffff"
            tagName={tagnames['바다가 보이는']}
          ></Tag>
        </TagWrapperStyleDiv>
        <TagWrapperStyleDiv>
          <Tag
            isButton={true}
            color="#ffffff"
            tagName={tagnames.스타벅스}
          ></Tag>
          <Tag isButton={true} color="#ffffff" tagName={tagnames.이디야}></Tag>
          <Tag isButton={true} color="#ffffff" tagName={tagnames.커피빈}></Tag>
          <Tag
            isButton={true}
            color="#ffffff"
            tagName={tagnames.탐앤탐스}
          ></Tag>
          <Tag
            isButton={true}
            color="#ffffff"
            tagName={tagnames.투썸플레이스}
          ></Tag>
          <Tag isButton={true} color="#ffffff" tagName={tagnames.폴바셋}></Tag>
          <Tag isButton={true} color="#ffffff" tagName={tagnames.할리스}></Tag>
        </TagWrapperStyleDiv>
      </TagWrapperStyle>
      <SearchBarWrapperStyle>
        <SearchBar></SearchBar>
      </SearchBarWrapperStyle>
    </SearchWrapperStyle>
  );
};

export default SearchWrapper;