import React from "react";

const ButtonLoader = (props) => {
  const { text, clickCb, isLoading, ...otherProps } = props;
  return (
    <button {...otherProps} disabled={isLoading} onClick={clickCb}>
      {isLoading ? (
        <>
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Processing..</span>
        </>
      ) : (
        text 
      )}
    </button>
  );
};

export default ButtonLoader;
