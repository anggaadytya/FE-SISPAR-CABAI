import * as React from "react";

import TextField from "@mui/material/TextField";

export default function InputTextField(props) {
  return (
    <TextField
      id={props.id}
      label={props.label}
      variant={props.variant}
      fullWidth={props.fullWidth}
      required={props.required}
      margin={props.margin}
      autoFocus={props.autoFocus}
      name={props.name}
      type={props.type}
      autoComplete={props.autoComplete}
    />
  );
}
