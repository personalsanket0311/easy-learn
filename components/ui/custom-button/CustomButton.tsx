import { Button } from "primereact/button";
import React from "react";

interface CustomButtonProps {
  label?: string;
  severity?: "secondary" | "success" | "info" | "warning" | "help" | "danger" | "contrast" ;
  className?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  outlined?: boolean;
  size?: "small" | "large" ;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  severity,
  className,
  icon,
  onClick,
  type,
  disabled,
  outlined,
  size,
}) => {
  return (
    <Button
      label={label}
      severity={severity}
      className={`${className} rounded-pill`}
      onClick={onClick}
      icon={icon}
      type={type}
      disabled={disabled}
      outlined={outlined}
      size={size}
    />
  );
};

export default CustomButton;
