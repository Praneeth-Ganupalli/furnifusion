import React, { useEffect, useReducer } from "react";
import "./Login.css";
import ButtonLoader from "../UI/ButtonLoader";
import useAuth from "../../helpers/hooks/useAuth";
import { Link } from "react-router-dom";
const intialFormData = {
  userName: "",
  passWord: "",
  email: "",
  isUserNameTouched: false,
  isPassFieldTouched: false,
  isEmailFieldTouched: false,
  isUserError: false,
  isPassError: false,
  isEmailError: false,
  isSignupForm: false,
  isSubmitting: false,
  isFormError:false
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
    case "EMAIL_BLUR": {
      const isEmailTouched = true;
      const isEmailError = isEmailTouched && !state.email;
      return { ...state, isEmailError, isEmailTouched };
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
    case "EMAIL_INPUT": {
      const email = action.value;
      const isEmailTouched = true;
      const isEmailError =
        (isEmailTouched && !email) || (isEmailTouched && !email.includes("@"));
      return { ...state, isEmailError, isEmailTouched, email };
    }
    case "SET_USER_ERROR": {
      return { ...state, isUserError: true, isUserNameTouched: true };
    }
    case "SET_PASS_ERROR": {
      return { ...state, isPassError: true, isPassFieldTouched: true };
    }
    case "SET_EMAIL_ERROR": {
      return { ...state, isEmailError: true, isEmailFieldTouched: true };
    }
    case "TOGGLE_LOGIN_FORM_VISIBILITY": {
      return { ...state, isSignupForm: !state.isSignupForm };
    }
    case "SET_FORM_SUBMITTING": {
      return { ...state, isSubmitting: action.value };
    }
    case "SET_FORM_ERROR":{
      return {...state,isFormError:action.value}
    }
    default:
      return intialFormData;
  }
};
function LoginForm() {
  const [loginformData, dispatch] = useReducer(loginReducer, intialFormData);
  const {
    userName,
    passWord,
    isUserError,
    isPassError,
    isSignupForm,
    isEmailError,
    email,
    isSubmitting,
    isFormError:formError
  } = loginformData;
  const {createAccount,isLoading,loginWithCredentials,error} = useAuth();
  const loginSubmitHandler = (e) => {
    e.preventDefault();
    if (!userName && isSignupForm) {
      dispatch({ type: "SET_USER_ERROR" });
    }
    if (!email) {
      dispatch({ type: "SET_EMAIL_ERROR" });
    }
    if (!passWord) {
      dispatch({ type: "SET_PASS_ERROR" });
    }
    if (isUserError || isPassError || isEmailError) return;
    if(isSignupForm)
    {
      createAccount(userName,email,passWord)
    }
    else{
      loginWithCredentials(email,passWord)
    }
  };
  const toggleLoginForm = () => {
    dispatch({ type: "TOGGLE_LOGIN_FORM_VISIBILITY" });
  };
  useEffect(()=>{
    dispatch({type:"SET_FORM_SUBMITTING",value:isLoading});
    dispatch({type:"SET_FORM_ERROR",value:error});
  },[isLoading,error])
  return (
    <div className="container mt-5">
      <div className="row align-items-center justify-content-center">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h3 className="text-center">
                {isSignupForm?'Create Account':'Login'}
              </h3>
              <section className="login-form">
                <form onSubmit={loginSubmitHandler}>
                  {isSignupForm && (
                    <div
                      className={`form-group ${
                        isUserError ? "input-error" : ""
                      }`}
                    >
                      <label htmlFor="username">Name</label>
                      <input
                        type="text"
                        id="username"
                        className="form-control mt-2"
                        placeholder="Enter User Name..."
                        value={userName}
                        onBlur={()=>dispatch({ type: "USER_BLUR" })}
                        onChange={(e)=>dispatch({ type: "USER_INPUT", value: e.target.value })}
                      />
                      {isUserError && (
                        <p className="text-danger">User Name is Mandatory</p>
                      )}
                    </div>
                  )}
                  <div
                    className={`form-group ${
                      isEmailError ? "input-error" : ""
                    }`}
                  >
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="form-control mt-2"
                      placeholder="johndoe@gmail.com"
                      value={email}
                      onBlur={() => dispatch({ type: "EMAIL_BLUR" })}
                      onChange={(e) =>
                        dispatch({ type: "EMAIL_INPUT", value: e.target.value })
                      }
                    />
                    {isEmailError && (
                      <p className="text-danger">
                        {!email
                          ? "Email is required"
                          : "Please Enter valid Email"}
                      </p>
                    )}
                  </div>
                  <div
                    className={`form-group mt-2 ${
                      isPassError ? "input-error" : ""
                    }`}
                  ></div>
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
                      onBlur={()=>dispatch({ type: "PASS_BLUR" })}
                      onChange={(e)=>dispatch({ type: "PASS_INPUT", value: e.target.value })}
                    />
                    {isPassError && (
                      <p className="text-danger">Password is Mandatory</p>
                    )}
                  </div>
                  {!isSignupForm && (
                    <p className="mb-0 mt-2">
                      New to furnifusion?{" "}
                      <button
                        className="btn p-0 signup_helper"
                        onClick={toggleLoginForm}
                        type="button"
                      >
                        Sign up
                      </button>{" "}
                      Here
                    </p>
                  )}
                  {isSignupForm && (
                    <p className="mb-0 mt-2">
                      Already a member?{" "}
                      <button
                        type="button"
                        onClick={toggleLoginForm}
                        className="btn p-0 signup_helper"
                      >
                        login
                      </button>{" "}
                      Here
                    </p>
                  )}
                  {formError && <p className="mb-0 mt-2 text-danger">{formError}</p>}
                  {!isSignupForm && <Link to={"/forgotPass"} className="mt-2 text-decoration-none ">Forgot Password?</Link>}
                  <ButtonLoader
                    type="submit"
                    clickCb={() => {}}
                    className="mt-3 btn btn-block w-100 btn-custom__primary"
                    isLoading={isSubmitting}
                    text={isSignupForm ? "Sign up" : "Login"}
                  />
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
