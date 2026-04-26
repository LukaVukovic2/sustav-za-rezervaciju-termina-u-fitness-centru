import { Flex } from "antd";
import Navigacija from "./Navigacija";
import { Outlet } from "react-router";

export const GlavniLayout = () => (
  <Flex>
    <Navigacija />
    <div style={{ flex: 1 }}>
      <Outlet />
    </div>
  </Flex>
);