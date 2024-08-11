import React from 'react';
// import { useNavigate } from 'react-router-dom';
import '../styles/Header.scss';
import logo from '../images/RP_1.png';
 
function Header() {
  // const navigate = useNavigate();
  // const handleLogoutClick = () => {
  //   navigate('/');
  // };
 
  return (
    <header className="custom-header">
      <div className="logo-container">
        <a href="/home">
          <img
            src={logo}
            alt="RP logo"
            className="desktop-logo"
          />
        </a>
        <nav >
        <a href="/contact">Data Anonymizer</a>
        <a href="/contact">Data Deanonymizer</a>
         
         
         
        </nav>
      </div>
    </header>
  );
}
 
export default Header;