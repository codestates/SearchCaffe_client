import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

const Polygon = styled.polygon`
  fill: ${(props) => props.color};
  transition: 0.4s;
`;

const ScopeStyle = styled.button`
  background-color: white;
  outline: none;
  border: initial;
`;

const Star = (props) => {
  let index = props.index;
  return (
    <svg
      onClick={props.click}
      onMouseOver={props.onhover}
      onMouseLeave={props.unhover}
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      height={props.size}
      viewBox="0 0 12 12"
    >
      <Polygon
        color={props.color}
        points="6 8.5200001 2.47328849 10.854102 3.60333748 6.77872286 0.293660902 4.14589803 4.51878111 3.96127709 6 0 7.48121889 3.96127709 11.7063391 4.14589803 8.39666252 6.77872286 9.52671151 10.854102"
      ></Polygon>
    </svg>
  );
};

const Scope = (props) => {
  const [isHovering, setHover] = useState(-1);
  let size = '23px';
  const [scope, setScope] = useState(-1);
  let stars = [];
  let fixedStars = [];
  // 변하는 scope
  useMemo(() => {
    for (let i = 0; i <= isHovering; i++) {
      stars.push(
        <Star
          onhover={() => {
            setHover(i);
          }}
          unhover={() => {
            setHover(-1);
          }}
          click={() => {
            setScope(i);
          }}
          key={i}
          index={i}
          size={size}
          color="red"
        ></Star>
      );
    }
    for (let i = isHovering + 1; i < 5; i++) {
      stars.push(
        <Star
          onhover={() => setHover(i)}
          unhover={() => setHover(-1)}
          color="#dddddd"
          key={i}
          index={i}
          size={size}
        ></Star>
      );
    }
  }, [isHovering, scope]);

  // 고정된 scope
  useMemo(() => {
    for (let i = 0; i <= scope; i++) {
      fixedStars.push(
        <Star
          click={() => {
            if (scope === -1) {
              setScope(i);
            }
          }}
          key={i}
          index={i}
          size={size}
          color="red"
        ></Star>
      );
    }
    for (let i = scope + 1; i < 5; i++) {
      fixedStars.push(
        <Star color="#dddddd" key={i} index={i} size={size}></Star>
      );
    }
  }, [scope]);

  if (props.isScope) {
    let contentsScope = [];
    for (let i = 0; i <= props.scope - 1; i++) {
      contentsScope.push(
        <Star key={i} index={i} size={props.size} color="red"></Star>
      );
    }
    for (let i = props.scope; i < 5; i++) {
      contentsScope.push(
        <Star color="#dddddd" key={i} index={i} size={props.size}></Star>
      );
    }
    return <div>{contentsScope}</div>;
  }
  if (scope !== -1) {
    return (
      <ScopeStyle
        onClick={() => {
          setScope(-1);
        }}
      >
        {fixedStars}
      </ScopeStyle>
    );
  } else {
    return <ScopeStyle>{stars}</ScopeStyle>;
  }
};

export default Scope;
