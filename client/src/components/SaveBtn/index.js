import React from "react";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function SaveBtn(props) {
  return (
    <button style={{ float: "right", marginBottom: 10 }} className="btn btn-success ml-1" {...props}  tabIndex="0">
      Save
    </button>
  );
}

export default SaveBtn;