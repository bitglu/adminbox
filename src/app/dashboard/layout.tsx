"use client";

import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { Layout, ConfigProvider } from "antd";

import esEs from "antd/locale/es_ES";
import React from "react";
import TokenDesign from "@/styles/theme.json";
import SidebarComponent from "@/components/layouts/SidebarComponent";
import ContentComponent from "@/components/layouts/ContentComponent";

import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <ConfigProvider
          locale={esEs}
          theme={{
            token: TokenDesign.token,
          }}
        >
          <Layout>
            <SidebarComponent />
            <ContentComponent>{children}</ContentComponent>
          </Layout>
        </ConfigProvider>
      </body>
    </html>
  );
}
