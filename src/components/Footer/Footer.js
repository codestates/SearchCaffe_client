import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
const FooterStyle = styled.div`
  width: 100%;
  height: 300px;
  background-color: white;
`;

const FooterContainer = styled.div`
  margin: auto;
  display: flex;
  width: 80%;
  align-items: center;
  height: 250px;
  justify-content: space-around;
  color: #5a403a;
`;
const CafeLogoContainer = styled.div`
  background-color: grey;
  width: 100px;
  height: 100px;
`;
const MemberContainer = styled.div`
  text-align: center;
  font-size: 30px;
`;
const Members = styled.ul`
  list-style: none;
  padding: 0px;
  font-size: 17px;
  line-height: 40px;
  letter-spacing: 10px;
`;
const AboutContainer = styled.div``;
const VerticalLine = styled.div`
  border-left: 1px solid black;
  height: 100px;
`;
const CopyRight = styled.div`
  text-align: center;
  font-size: 10px;
`;
const Footer = (props) => {
  return (
    <FooterStyle>
      <FooterContainer>
        <CafeLogoContainer>LOGO</CafeLogoContainer>
        <VerticalLine />
        <MemberContainer>
          Contribution<br></br>&<br></br>
          Contact
        </MemberContainer>
        <Members>
          <li>
            김면수
            <a href="#">
              <FontAwesomeIcon
                className="icon"
                color="black"
                icon={faGithub}
                size="lg"
              />
            </a>
          </li>
          <li>
            설명재
            <a href="#">
              <FontAwesomeIcon
                className="icon"
                color="black"
                icon={faGithub}
                size="lg"
              />
            </a>
          </li>
          <li>
            이광섭
            <a href="#">
              <FontAwesomeIcon
                className="icon"
                color="black"
                icon={faGithub}
                size="lg"
              />
            </a>
          </li>
          <li>
            임경섭
            <a href="#">
              <FontAwesomeIcon
                className="icon"
                color="black"
                icon={faGithub}
                size="lg"
              />
            </a>
          </li>
        </Members>

        <VerticalLine />
        <AboutContainer>
          <span style={{ fontSize: '30px', marginRight: '30px' }}>
            About Project
          </span>
          <span style={{ marginRight: '30px' }}>|</span>
          <a href="#" style={{ textDecoration: 'none', color: '#5a403a' }}>
            Link
          </a>
        </AboutContainer>
      </FooterContainer>
      <hr align="center" style={{ width: '80%' }}></hr>
      <CopyRight>
        CopyRight&copy; projectname {new Date().getFullYear()} | All right
        reserved
      </CopyRight>
    </FooterStyle>
  );
};

export default Footer;
