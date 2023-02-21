import React, { useState } from "react";
import { NAV_LINKS } from "../../helpers/constants";
import { BsFillCartFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineUserAdd, AiOutlineUserDelete } from "react-icons/ai";
import { loginActions } from "../../store";
import { useNavigate } from "react-router-dom";
function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartData = useSelector((state) => state.cart.list);
  const cartCount = cartData.reduce((cur, acc) => {
    return cur + acc.quantity;
  }, 0);
  const { isLoggedIn } = useSelector((state) => state.login);
  const logoutUserHandler = () => {
    dispatch(loginActions.setLoginStatus(false));
    navigate("/home");
  };
  const [showSideBar,setShowSideBar]=useState(false);
  return (
    <>
       <nav className="navbar navbar-expand-lg navbar-dark bg-custom__primary text-white p-3">
      <div className="container">
        <NavLink className="navbar-brand fst-italic text-white" to="/home">
          FurniFusion
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={()=>{setShowSideBar(prevVal=>!prevVal)}}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${showSideBar? "d-block":''}`} id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            {NAV_LINKS.map((navItem) => {
              return (
                <li className="nav-item" key={navItem.path}>
                  <NavLink
                    className={({ isActive }) => {
                      return isActive
                        ? "active-nav-link nav-link text-white"
                        : " nav-link text-white";
                    }}
                    aria-current="page"
                    to={navItem.path}
                  >
                    {navItem.name}
                  </NavLink>
                </li>
              );
            })}
          </ul>
          <div className="d-flex">
            <NavLink
              className="nav-link text-white me-3 cart-icon-wrapper"
              to="/cart"
            >
              Cart
              <span className="cart-container mx-2">
                <BsFillCartFill className="cart-icon" />
                <span className="cart-value">{cartCount}</span>
              </span>
            </NavLink>
            {!isLoggedIn && (
              <NavLink className="nav-link text-white " to="/login">
                Login <AiOutlineUserAdd className="ms-1" />
              </NavLink>
            )}
            {isLoggedIn && (
              <span
                className="nav-link text-white cursor-pointer"
                onClick={logoutUserHandler}
              >
                Logout <AiOutlineUserDelete className="" />{" "}
              </span>
            )}
          </div>
        </div>
      </div>
    </nav>
    </>
   
  );
}

export default Header;
