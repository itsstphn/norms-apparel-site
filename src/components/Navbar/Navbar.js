import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState } from "react";
import logo from "../../assets/logo.png";

export const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);

  const openSidebar = () => {
    setIsActive(true);
  };

  const closeSidebar = () => {
    setIsActive(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleClickLogo = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="navbar">
      <Sidebar isActive={isActive} closeSidebar={closeSidebar}></Sidebar>
      <button onClick={openSidebar} className="menu-btn">
        <i className="fas fa-bars"></i>
      </button>
      <div className="logo">
        <img onClick={handleClickLogo} src={logo} alt="" />
      </div>
      <form onSubmit={handleSubmit}>
        <input type="search" />
        <button>
          <i className="fas fa-search"></i>
        </button>
      </form>
      <div className="btn-cart">
        <Link to="/cart">
          <i className="fas fa-shopping-cart"></i>
        </Link>
      </div>
    </div>
  );
};
