/* eslint @typescript-eslint/no-use-before-define: 0 */

import React, { useState, ReactNode } from "react";
import {
  TextField,
  TextFieldProps,
  InputBaseProps as MUIInputProps,
  InputLabelProps as MUIInputLabelProps,
  TooltipProps
} from "@material-ui/core";
import cn from "classnames";

import { Tooltip } from "../Tooltip/Tooltip";
import styles from "./TextInput.module.scss";

type Props = Omit<
  TextFieldProps,
  "variant" | "onChange" | "className" | "classes" | "error"
> & {
  error?: ReactNode;
  InputLabelProps?: Omit<
    TextFieldProps["InputLabelProps"],
    "className" | "classes"
  >;
  InputProps?: Omit<
    TextFieldProps["InputProps"],
    "disableUnderline" | "classes" | "className"
  >;
  errorPlacement?: TooltipProps["placement"];
  onChange?(value: string): void;
};

const TextInput = ({
  error,
  onChange,
  onFocus,
  onBlur,
  InputLabelProps,
  InputProps,
  errorPlacement = "top",
  ...rest
}: Props) => {
  const inputClasses: MUIInputProps["classes"] = {
    root: cn(styles.inputWrapper, { [styles.error]: Boolean(error) }),
    focused: cn(styles.inputWrapper, styles.focused),
    adornedEnd: cn(styles.inputWrapper, styles.adornedEnd),
    adornedStart: cn(styles.inputWrapper, styles.adornedStart),
    input: styles.input
  };

  const labelClasses: MUIInputLabelProps["classes"] = {
    root: styles.inputLabel
  };

  const [isFocused, setIsFocused] = useState(false);

  return (
    <Tooltip
      open={isFocused && !!error}
      message={error ?? ""}
      isError
      placement={errorPlacement}
    >
      <TextField
        {...rest}
        className={styles.root}
        variant="filled"
        onChange={handleChange}
        InputLabelProps={{
          ...InputLabelProps,
          classes: labelClasses
        }}
        InputProps={{
          ...InputProps,
          onFocus: handleFocus,
          onBlur: handleBlur,
          disableUnderline: true,
          classes: inputClasses
        }}
      />
    </Tooltip>
  );

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange?.(event.target.value);
  }

  function handleFocus(event: React.FocusEvent<HTMLInputElement>) {
    onFocus ? onFocus(event) : InputProps?.onFocus?.(event);
    setIsFocused(true);
  }

  function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    onBlur ? onBlur(event) : InputProps?.onBlur?.(event);
    setIsFocused(false);
  }
};

export { TextInput };
export type { Props as TextInputProps };
