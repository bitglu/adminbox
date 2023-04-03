"use client";

import styles from "./page.module.css";
import {
  Button,
  Card,
  Dropdown,
  MenuProps,
  QRCode,
  Space,
  Statistic,
  Table,
  Tag,
  Timeline,
  Typography,
} from "antd";
import {
  faChartSimple,
  faUsers,
  faBoxesStacked,
  faPenToSquare,
  faShield,
  faStoreSlash,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import type { ColumnsType } from "antd/es/table";
import { UsersDataFaker } from "@/services/data";

const { Paragraph } = Typography;

const STATISTIC_ITEMS = [
  {
    name: "Projects",
    value: 20,
    precision: 0,
    prefix: faChartSimple,
    suffix: "%",
    color: "#3f8600",
  },
  {
    name: "Boxs",
    value: 10000,
    precision: 0,
    prefix: faBoxesStacked,
    suffix: "",
    color: "#CDA434",
  },
  {
    name: "Clients",
    value: 100,
    precision: 0,
    prefix: faUsers,
    suffix: "",
    color: "#922B3E",
  },
];

interface DataType {
  _id: string;
  code?: string;
  name: string;
  email: string;
  rol: string;
}

const colorsTags: any = {
  User: "cyan",
  Admin: "green",
  Packer: "red",
};

export default function Home() {
  const [loading, setLoading] = useState(false);

  const handleMenuClick = (e: any, record: DataType) => {
    const status: any = {
      "1": "sdsd",
      "2": "StatusEnum.ACTIVE",
      "3": "StatusEnum.SUSPENDED",
      "4": "StatusEnum.BLOCKED",
    };
    //updateStatus(status[e?.key], record);
  };

  const menuProps: any = (record: DataType) => ({
    items,
    onClick: (e: MenuProps["onClick"]) => handleMenuClick(e, record),
  });

  const items: MenuProps["items"] = [
    {
      label: "Edit",
      key: "1",
      icon: <FontAwesomeIcon icon={faPenToSquare} />,
      disabled: true,
    },
    {
      label: "Activate",
      key: "2",
      icon: <FontAwesomeIcon icon={faShield} />,
      disabled: true,
    },
    {
      label: "suspend",
      key: "3",
      icon: <FontAwesomeIcon icon={faStoreSlash} />,
      danger: false,
      disabled: true,
    },

    {
      label: "Eliminate",
      key: "4",
      icon: <FontAwesomeIcon icon={faTrash} />,
      danger: true,
      disabled: true,
    },
  ];

  const columns: ColumnsType<DataType> = [
    {
      title: "# Code",
      dataIndex: "code",
      key: "code",
      render: (text) => <Paragraph copyable>{text.toString()}</Paragraph>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <Paragraph copyable>{text.toString()}</Paragraph>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <Paragraph copyable>{text.toString()}</Paragraph>,
    },
    {
      title: "Rol",
      key: "rol",
      dataIndex: "rol",
      render: (text) => <Tag color={colorsTags[text]}>{text.toString()}</Tag>,
    },
    {
      title: "Options",
      key: "action",
      render: (_, record: DataType) => (
        <Dropdown.Button menu={menuProps(record)}>Options</Dropdown.Button>
      ),
    },
  ];

  return (
    <main className={styles.main}>
      <Card
        bordered={false}
        title="Users"
        extra={
          <Space>
            <Button
              type="primary"
              icon={
                <FontAwesomeIcon
                  icon={faUsers}
                  style={{ marginRight: 5 }}
                />
              }
            >
              New User
            </Button>
            <Button
              type="ghost"
              loading={loading}
              disabled={loading}
              onClick={() => {}}
            >
              Refresh
            </Button>
          </Space>
        }
      >
        <Table
          rowKey="_id"
          loading={loading}
          columns={columns}
          dataSource={UsersDataFaker()}
        />
      </Card>
    </main>
  );
}
