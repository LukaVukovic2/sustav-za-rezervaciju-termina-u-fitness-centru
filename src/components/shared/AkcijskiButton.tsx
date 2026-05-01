import { Button, type ButtonProps } from "antd";
import type { ReactNode } from "react";

type Props = ButtonProps & {
  children: ReactNode;
};

export const AkcijskiButton = ({ children, ...props }: Props) => {
  return (
    <Button
      className="akcijski-btn"
      {...props}
    >
      {children}
    </Button>
  );
};
