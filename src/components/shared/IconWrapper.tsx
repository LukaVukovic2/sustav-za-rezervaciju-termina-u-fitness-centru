import { Flex } from "antd";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const IconWrapper = ({ children }: Props) => {
  return (
    <Flex align="center" gap={5}>
      {children}
    </Flex>
  );
};