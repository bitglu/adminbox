"use client";

import { Divider, Layout } from "antd";
import React from "react";
import HeaderComponent from "./HeaderComponent";
import "../../app/globals.css";

const { Content, Footer } = Layout;

const ContentComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout className="mainBackgroundColor">
      <HeaderComponent />
      <Divider style={{ margin: 0 }} />
      <Content style={{ margin: "24px 16px 0" }}>
        <div
          style={{
            minHeight: 360,
          }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        AdminBox ©2023 Created by{" "}
        <a href="https://bitglu.net/" target="_blank" rel="noreferrer">
          Bitglu
        </a>
      </Footer>
    </Layout>
  );
};

export default ContentComponent;
