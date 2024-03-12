import React, {useEffect} from "react";
import "./Nav.css";
import {useDispatch, useSelector} from "react-redux";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {signOut} from "firebase/auth";
import {auth} from "../../config/firebase";
import {logout} from "../../features/AuthSlice";
const Nav = () => {
  const location = useLocation();
  const {pathname} = location;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Auth = useSelector((e) => e.auth.value);
  useEffect(() => {
    window.onscroll = function () {
      window.scrollY > 100
        ? document.querySelector(".nav").classList.add("active")
        : document.querySelector(".nav").classList.remove("active");
    };
  });
  const Logout = () => {
    signOut(auth)
      .then(() => {
        dispatch(logout());
        navigate("/signin");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return Auth ? (
    <div className="nav">
      <div className="mt-2.5 md:ml-20 ml-12 ">
        <Link to="/">
          <img className="w-24" src="./netflix-logo-png-2562.png" />
        </Link>
      </div>

      <div className="mb-4 flex">
        {" "}
        <Link to="/myaccount">
          <img
            className="userimg mx-1 mt-2.5"
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117"
          />
        </Link>
        <button
          id="btn-log"
          onClick={Logout}
          className="flex w-20 mx-1 mt-2.5 h-9 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Log Out
        </button>
      </div>
    </div>
  ) : (
    <div className="nav">
      <div className="mt-2.5 md:ml-20 ml-12 ">
        <img className="w-24" src="./netflix-logo-png-2562.png" />
      </div>
      {pathname === "/signup" ? (
        <Link to="/signin">
          <button
            type="submit"
            id="btn-log"
            className="flex w-20 mx-1 mt-2.5 h-9 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Sign in
          </button>
        </Link>
      ) : (
        pathname === "/signin" && (
          <Link to="/signup">
            <button
              type="submit"
              id="btn-log"
              className="flex w-20 mx-1 mt-2.5 h-9 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Sign up
            </button>
          </Link>
        )
      )}
    </div>
  );
};
export default Nav;
