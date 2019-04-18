import React from "react";

import "../style/Input.css";

const Input = props => (
  <textarea spellCheck={false} value={props.text} onChange={evt => props.setText(evt.target.value)}/>
);

export default Input;