import React from "react";

interface InputBoxProps {
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const InputBox = ({
  type = "text",
  placeholder = "",
  value,
  onChange,
  className,
}: InputBoxProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={className}
    />
  );
};

export default InputBox;
