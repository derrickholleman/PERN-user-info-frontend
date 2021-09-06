import React from "react";
import { BsPencilSquare } from "react-icons/bs";

const EditButton = () => {
  return (
    <div style={{display: 'inline-block'}}>
      <BsPencilSquare style={{ cursor: "pointer", fontSize: "1.25rem", margin:'.2rem' }} />
    </div>
  );
};

export default EditButton;
