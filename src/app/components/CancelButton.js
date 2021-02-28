import { useHistory } from "react-router-dom";
import React from "react";
import Button from "./Button";

const CancelButton = ({previousUrl = "/"}) => {
  const history = useHistory();
  return (
    <Button
      type="reset"
      className="muted-button"
      onClick={(e) => {
        e.preventDefault();
        history.push(previousUrl);
      }}
    >
      Cancel
    </Button>
  );
};

export default CancelButton;