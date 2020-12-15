import styled from 'styled-components';

const ButtonStyle = styled.div`
  border-radius: 30px;
  margin-left: ${(props) => (props.margin ? props.margin : '25px')};
  border: none;
  background-color: ${(props) => (props.color ? props.color : '#8a706a')};
  outline: none;
  width: ${(props) =>
    props.name ? 80 + props.name.length * 5 + 'px' : '80px'};
  height: 40px;
  font-size: 12px;
  color: ${(props) => (props.fontColor ? props.fontColor : '#ffffff')};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.2s;

  border: ${(props) => (props.noBorder ? '' : '0.5px solid #7f7f7f')};
  :hover {
    transition: 0.2s;
    background-color: ${(props) =>
      props.hoverColor ? props.hoverColor : '#5a403a'};
    color: ${(props) =>
      props.hoverFontColor ? props.hoverFontColor : '#ffffff'};
    font-size: ${(props) => (props.hoverFontColor ? '0.85rem' : '')};
  }
`;
const ButtonIcon = styled.img`
  width: ${(props) => (props.imgSize ? '0.85rem' : '20px')};
  position: relative;
  right: 6px;
  top: 1px;
`;

// props로 받는 값
// hoverColor
// color
// name
// icon
// fontColor

const Button = (props) => {
  if (props.icon) {
    return (
      <ButtonStyle {...props}>
        <ButtonIcon src={props.icon} imgSize={props.imgSize}></ButtonIcon>
        {props.name}
      </ButtonStyle>
    );
  }
  return <ButtonStyle {...props}>{props.name}</ButtonStyle>;
};

export default Button;
