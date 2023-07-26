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
import { ProjectZonesBoxesDataFaker } from "@/services/data";
import { useRouter } from "next/navigation";

const { Paragraph } = Typography;

interface DataType {
  _id: string;
  code?: string;
  zone: string;
  name: string;
  description: string;
  items: string;
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
      render: (text) => <Paragraph copyable>{text.toString()}</Paragraph>,
    },
    {
      title: "Zone",
      dataIndex: "zone",
      key: "zone",
      render: (text) => <Paragraph copyable>{text.toString()}</Paragraph>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <Paragraph copyable>{text.toString()}</Paragraph>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => <Paragraph>{text.toString()}</Paragraph>,
    },
    {
      title: "N° items",
      dataIndex: "items",
      key: "items",
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
        title="Boxes"
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
              onClick={() => router.push("/dashboard/projects/zones")}
            >
              Back to zones
            </Button>
            <Button
              type="primary"
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
          dataSource={ProjectZonesBoxesDataFaker()}
          expandable={{
            expandedRowRender: (record) => (
              <section>
                <Space size={100}>
                  <Card title="Items">
                    <Timeline
                      items={[
                        {
                          children: "Item 1, in zone 1",
                        },
                        {
                          children: "Item 2, in zone 1",
                        },
                        {
                          children: "Item 3, in zone 1",
                        },
                        {
                          children: "Item 4, in zone 1",
                        },
                      ]}
                    />
                  </Card>
                  <Card title="Qr code of the box">
                    <QRCode
                      errorLevel="H"
                      value={record.items}
                      icon="https://i.pinimg.com/originals/77/44/80/7744806c7e15d502830a1fdd8e2a37e9.gif"
                    />
                  </Card>
                  <Card title="Image box">
                    <Image.PreviewGroup
                      preview={{
                        onChange: (current, prev) =>
                          console.log(
                            `current index: ${current}, prev index: ${prev}`
                          ),
                      }}
                    >
                      <Image
                        width={200}
                        height={150}
                        alt="Text SuperService"
                        src="https://www.latercera.com/resizer/SbYYoV02jTaqyeWEVBI0Fr9Ttwo=/900x600/smart/cloudfront-us-east-1.images.arcpublishing.com/copesa/NMBIFI2K2RAJTCEUWCW2HQVFIA.jpg"
                      />
                      <Image
                        width={200}
                        height={150}
                        alt="Text SuperService"
                        src="https://www.revistainteriores.es/uploads/s1/79/35/27/istock-1016102754.jpeg"
                      />
                    </Image.PreviewGroup>
                  </Card>
                </Space>
              </section>
            ),
          }}
        />
      </Card>
    </main>
  );
}
