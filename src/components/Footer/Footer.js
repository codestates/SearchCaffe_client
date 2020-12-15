import styled from 'styled-components';

const FooterStyle = styled.div`
  width: 100%;
  height: 700px;
  background-color: ##ebebeb;
`;

const FooterContainer = styled.div`
  display: flex;
`;
const CafeLogoContainer = styled.div``;
const MemberContainer = styled.div``;
const AboutContainer = styled.div``;

const Footer = (props) => {
  return (
    <FooterStyle>
      <FooterContainer>
        <CafeLogoContainer></CafeLogoContainer>
        <MemberContainer></MemberContainer>
        <AboutContainer></AboutContainer>
      </FooterContainer>
    </FooterStyle>
  );
};

export default Footer;
