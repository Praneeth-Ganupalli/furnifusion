import React, { useMemo, useState } from "react";
import "./ForgotPassword.css";
import ButtonLoader from "../UI/ButtonLoader";
import useAuth from "../../helpers/hooks/useAuth";
import { useNavigate } from "react-router-dom";
const steps = ["find", "verify", "submit"];
const ForgotPasswordForm = () => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [accessCode, setAccessCode] = useState(null);
  const [newPass, setNewPass] = useState(null);
  const [formSuccessMessage, setFormSuccessMessage] = useState("");
  const {
    isLoading,
    error,
    findUserByEmail,
    resetUserPassword,
    verifyResetCode,
  } = useAuth();
  const stepsToCallBackMapping = useMemo(() => {
    return {
      find: findUserByEmail,
      verify: verifyResetCode,
      submit: resetUserPassword,
    };
  }, [findUserByEmail, verifyResetCode, resetUserPassword]);
  const handleResetPassForm = async () => {
    const callback = stepsToCallBackMapping[steps[currentStepIdx]];
    if (!callback) return;
    const cbArgs = [email, accessCode, newPass].slice(0, callback.length);
    try {
      const data = await callback(...cbArgs);
      setFormSuccessMessage(data.message);
      if (steps[currentStepIdx] === "submit") {
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setCurrentStepIdx((prev) => prev + 1);
        setTimeout(() => {
          setFormSuccessMessage("");
        }, 2000);
      }
    } catch (e) {
      console.error("Error finding user", e.message);
    }
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleResetPassForm();
  };
  return (
    <article className="forgot-pass-card">
      <div className="card-body">
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="mb-2">
              Enter Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="johndoe@gmail.com"
              name="email"
              value={email}
              className="form-control"
              disabled={currentStepIdx > 0}
              required
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          {currentStepIdx === 1 && (
            <div className="form-group mt-2">
              <label htmlFor="accessCode" className="mb-2">
                Enter access code
              </label>
              <input
                type="password"
                id="accessCode"
                placeholder="******"
                name="accessCode"
                className="form-control"
                value={accessCode}
                onChange={(e) => {
                  setAccessCode(e.target.value);
                }}
                required
              ></input>
            </div>
          )}
          {currentStepIdx === 2 && (
            <div className="form-group mt-2">
              <label htmlFor="newPass" className="mb-2">
                Enter New Password
              </label>
              <input
                type="password"
                id="newPass"
                placeholder="******"
                name="newPass"
                className="form-control"
                value={newPass}
                onChange={(e) => {
                  setNewPass(e.target.value);
                }}
                required
              ></input>
            </div>
          )}
          <ButtonLoader
            text={steps[currentStepIdx]}
            className="btn btn-custom__primary mt-2 text-capitalize"
            type="submit"
            isLoading={isLoading}
            clickCb={() => {}}
          />
        </form>
        {error && (
          <p className="form-err-feedback mt-2 text-danger mb-0">{error}</p>
        )}
        {formSuccessMessage && (
          <p className="form-suc-feedback mt-2 text-success mb-0">
            {formSuccessMessage}
          </p>
        )}
      </div>
    </article>
  );
};

export default ForgotPasswordForm;
