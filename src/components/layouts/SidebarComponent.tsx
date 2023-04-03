"use client";

import { Layout, Menu } from "antd";

import Image from "next/image";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MENU_ITEMS_ADMIN_VM } from "./menuItems";

const { Sider } = Layout;

const SidebarComponent = () => {
  const router = useRouter();

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      theme="light"
      width={250}
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className="logo">
        <Image src="https://i.pinimg.com/originals/77/44/80/7744806c7e15d502830a1fdd8e2a37e9.gif" alt="VM" width={100} height={100} />
      </div>
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={["1"]}
        onClick={(e) => router.push(`/dashboard${e.key}`)}
        items={MENU_ITEMS_ADMIN_VM?.map((ele: any, index: any) => ({
          key: ele.key,
          icon: <FontAwesomeIcon icon={ele?.icon} />,
          label: ele.label,
          children: ele?.children,
        }))}
      />
    </Sider>
  );
};

export default SidebarComponent;
