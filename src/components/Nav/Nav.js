import './Nav.css';
const Nav = (props) => {
  return (
    <div className="header">
      <a href="#" className="logo">
        LOGO
      </a>

      <div className="login">
        <span className="login-btn">로그인</span>
      </div>
    </div>
  );
};

export default Nav;
