import React from "react";

const CustomInputs = (props) => {

  return (
    <input
      id={props.id}
      type={props.type}
      value={props.valueInput}
      onChange={props.onChangeEvent}
    />
  );
}

export default CustomInputs;