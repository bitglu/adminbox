"use client";

import styles from "./page.module.css";
import {
  Button,
  Card,
  Dropdown,
  Image,
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
  faArrowLeft,
  faBoxesStacked,
  faRuler,
  faPenToSquare,
  faShield,
  faStoreSlash,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import type { ColumnsType } from "antd/es/table";
import { ProjectZonesDataFaker } from "@/services/data";
import { useRouter } from "next/navigation";

const { Paragraph } = Typography;

interface DataType {
  _id: string;
  code?: string;
  name: string;
  description: string;
  boxs: string;
}

const colorsTags: any = {
  Pending: "cyan",
  Delivery: "green",
  Cancel: "red",
};

export default function Home() {
  const router = useRouter();

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
      render: (text) => (
        <Paragraph
          copyable
          onClick={() => router.push("/dashboard/projects/zones/boxes")}
          style={{ cursor: "pointer" }}
        >
          {text.toString()}
        </Paragraph>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <Paragraph
          copyable
          onClick={() => router.push("/dashboard/projects/zones/boxes")}
          style={{ cursor: "pointer" }}
        >
          {text.toString()}
        </Paragraph>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => <Paragraph>{text.toString()}</Paragraph>,
    },
    {
      title: "N° Boxs",
      dataIndex: "boxs",
      key: "boxs",
      render: (text) => <Paragraph copyable>{text.toString()}</Paragraph>,
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
        title="Zones"
        extra={
          <Space>
            <Button
              type="ghost"
              icon={
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  style={{ marginRight: 5 }}
                />
              }
              onClick={() => router.push("/dashboard/projects")}
            >
              Back to projects
            </Button>
            <Button
              type="primary"
              icon={
                <FontAwesomeIcon icon={faRuler} style={{ marginRight: 5 }} />
              }
            >
              New Zone
            </Button>
            <Button
              type="dashed"
              icon={
                <FontAwesomeIcon
                  icon={faBoxesStacked}
                  style={{ marginRight: 5 }}
                />
              }
            >
              New Box
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
          dataSource={ProjectZonesDataFaker()}
        />
      </Card>
    </main>
  );
}
