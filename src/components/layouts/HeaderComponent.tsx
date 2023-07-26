"use client";

import { Alert, Avatar, Button, Layout, Typography } from "antd";
import {
  CalendarOutlined,
  BellOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

const { Header } = Layout;
const { Text, Link } = Typography;

const HeaderComponent = () => {
  const router = useRouter();

  useEffect(() => {}, []);

  return (
    <Header style={{ padding: 0, background: "#FFF", marginBottom: 0 }}>
      <div className="header-items">
        <div>
          <Avatar
            src="https://joeschmoe.io/api/v1/random"
            style={{
              backgroundColor: "#fde3cf",
              color: "#f56a00",
              marginRight: 10,
            }}
          >
            A
          </Avatar>
          <Text>Hi!, SuperService</Text>
        </div>

        <div>
          <Button type="ghost" shape="circle" icon={<BellOutlined />} />
          <Button type="ghost" shape="circle" icon={<LogoutOutlined />} />
        </div>
      </div>
    </Header>
  );
};

export default HeaderComponent;
