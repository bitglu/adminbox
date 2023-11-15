"use client";

import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { Layout, ConfigProvider } from "antd";

import React from "react";
import TokenDesign from "@/styles/theme.json";
import SidebarComponent from "@/components/layouts/SidebarComponent";
import ContentComponent from "@/components/layouts/ContentComponent";

import { config } from "@fortawesome/fontawesome-svg-core";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "@/services/supabase/supabase";
config.autoAddCss = false;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <html lang="en">
        <head />
        <body>
          <ConfigProvider
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
    </SessionContextProvider>
  );
}
