import React, { useEffect, useReducer } from "react";
import "./Login.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginActions } from "../../store";
const intialFormData = {
  userName: "",
  passWord: "",
  isUserNameTouched: false,
  isPassFieldTouched: false,
  isUserError: false,
  isPassError: false,
};
const loginReducer = (state, action) => {
  switch (action.type) {
    case "USER_BLUR": {
      const isUserNameTouched = true;
      const isUserError = isUserNameTouched && !state.userName;
      return { ...state, isUserNameTouched, isUserError };
    }
    case "PASS_BLUR": {
      const isPassFieldTouched = true;
      const isPassError = isPassFieldTouched && !state.passWord;
      return { ...state, isPassError, isPassFieldTouched };
    }
    case "USER_INPUT": {
      const userName = action.value;
      const isUserNameTouched = true;
      const isUserError = isUserNameTouched && !userName;
      return { ...state, isUserError, isUserNameTouched, userName };
    }
    case "PASS_INPUT": {
      const passWord = action.value;
      const isPassFieldTouched = true;
      const isPassError = isPassFieldTouched && !passWord;
      return { ...state, isPassError, isPassFieldTouched, passWord };
    }
    case "SET_USER_ERROR": {
      return { ...state, isUserError: true, isUserNameTouched: true };
    }
    case "SET_PASS_ERROR": {
      return { ...state, isPassError: true, isPassFieldTouched: true };
    }
    default:
      return intialFormData;
  }
};
function LoginForm() {
  const navigate = useNavigate();
  const loginDispatch = useDispatch();
  const isLoggedIn=useSelector(({login})=>login.isLoggedIn);
  const [searchParams] = useSearchParams();
  const [loginformData, dispatch] = useReducer(loginReducer, intialFormData);
  const { userName, passWord, isUserError, isPassError } = loginformData;
  useEffect(()=>{
    if(isLoggedIn)
    {
        loginDispatch(loginActions.setLoginStatus(false))
    }
  },[isLoggedIn,loginDispatch])
  const userNameBlurHandler = () => {
    dispatch({ type: "USER_BLUR" });
  };
  const passwordBlurHandler = () => {
    dispatch({ type: "PASS_BLUR" });
  };
  const userInputChangeHandler = (e) => {
    dispatch({ type: "USER_INPUT", value: e.target.value });
  };
  const userPassWordChangeHandler = (e) => {
    dispatch({ type: "PASS_INPUT", value: e.target.value });
  };
  const loginSubmitHandler = (e) => {
    e.preventDefault();
    if (!userName) {
      dispatch({ type: "SET_USER_ERROR" });
    }
    if (!passWord) {
      dispatch({ type: "SET_PASS_ERROR" });
    }
    if (isUserError || isPassError) return;
    if (userName === "test" && passWord === "1234") {
      const isFromCart = searchParams.get("fromCart");
      loginDispatch(loginActions.setLoginStatus(true));
      if (isFromCart) {
        navigate("/cart");
      } else {
        navigate("/home");
      }
    }
  };
  return (
    <div className="container mt-5">
      <div className="row align-items-center justify-content-center">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h3 className="text-center">Customer Login</h3>
              <section className="login-form">
                <form onSubmit={loginSubmitHandler}>
                  <div
                    className={`form-group ${isUserError ? "input-error" : ""}`}
                  >
                    <label htmlFor="username">User Name</label>
                    <input
                      type="text"
                      id="username"
                      className="form-control mt-2"
                      placeholder="Enter User Name..."
                      value={userName}
                      onBlur={userNameBlurHandler}
                      onChange={userInputChangeHandler}
                    />
                    {isUserError && (
                      <p className="text-danger">User Name is Mandatory</p>
                    )}
                  </div>
                  <div
                    className={`form-group mt-2 ${
                      isPassError ? "input-error" : ""
                    }`}
                  >
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      className="form-control mt-2"
                      placeholder="****"
                      value={passWord}
                      onBlur={passwordBlurHandler}
                      onChange={userPassWordChangeHandler}
                    />
                    {isPassError && (
                      <p className="text-danger">Password is Mandatory</p>
                    )}
                  </div>
                  <button className="mt-3 btn btn-block w-100 btn-custom__primary">
                    Login
                  </button>
                </form>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
