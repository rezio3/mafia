import { Button } from "@mui/material";

type ButtonCustomPropsType = {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "contained" | "outlined";
  paddingLeft?: string;
  color?: "primary" | "secondary";
  className?: string;
  gap?: "1" | "2" | "3";
};

const ButtonCustom: React.FC<ButtonCustomPropsType> = ({
  children,
  onClick,
  variant,
  paddingLeft = "16px",
  color = "primary",
  className,
  gap = "2",
}) => {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      style={{ paddingLeft: paddingLeft }}
      className={`d-flex align-items-center gap-${gap} ${className}`}
      color={color}
    >
      {children}
    </Button>
  );
};

export default ButtonCustom;
