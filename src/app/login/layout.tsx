"use client";

import "@fortawesome/fontawesome-svg-core/styles.css";

import { Layout, ConfigProvider } from "antd";

import esEs from "antd/locale/es_ES";
import React from "react";
import TokenDesign from "@/styles/theme.json";

import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConfigProvider
      locale={esEs}
      theme={{
        token: TokenDesign.token,
      }}
    >
      <Layout>{children}</Layout>
    </ConfigProvider>
  );
}
