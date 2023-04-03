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
  faBoxesStacked,
  faPenToSquare,
  faShield,
  faStoreSlash,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import type { ColumnsType } from "antd/es/table";
import { ProjectDataFaker } from "@/services/data";

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
  project: string;
  client: string;
  boxcode: string;
  date: string;
  status: string;
}

const colorsTags: any = {
  Pending: "cyan",
  Delivery: "green",
  Cancel: "red",
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
      title: "Project",
      dataIndex: "project",
      key: "project",
      render: (text) => <Paragraph copyable>{text.toString()}</Paragraph>,
    },
    {
      title: "Client",
      dataIndex: "client",
      key: "client",
      render: (text) => <Paragraph copyable>{text.toString()}</Paragraph>,
    },
    {
      title: "Box Code",
      dataIndex: "boxcode",
      key: "boxcode",
      render: (text) => <Paragraph copyable>{text.toString()}</Paragraph>,
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
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
        title="Projects"
        extra={
          <Space>
            <Button
              type="primary"
              icon={
                <FontAwesomeIcon
                  icon={faChartSimple}
                  style={{ marginRight: 5 }}
                />
              }
            >
              New Project
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
        <div style={{ textAlign: "center", marginBottom: "3%" }}>
          <Space size={100} align="center">
            {STATISTIC_ITEMS.map((ele) => (
              <Card bordered={false} key={ele.name}>
                <Statistic
                  title={ele.name}
                  value={ele.value}
                  precision={ele.precision}
                  valueStyle={{ color: ele.color }}
                  prefix={<FontAwesomeIcon icon={ele.prefix} />}
                  suffix={ele.suffix}
                />
              </Card>
            ))}
          </Space>
        </div>

        <Table
          rowKey="_id"
          loading={loading}
          columns={columns}
          dataSource={ProjectDataFaker()}
          expandable={{
            expandedRowRender: (record) => (
              <section>
                <Space size={100}>
                  <Card title="Record">
                    <Timeline
                      items={[
                        {
                          children: "Create a services site 2015-09-01",
                        },
                        {
                          children: "Solve initial network problems 2015-09-01",
                        },
                        {
                          children: "Technical testing 2015-09-01",
                        },
                        {
                          children: "Network problems being solved 2015-09-01",
                        },
                      ]}
                    />
                  </Card>
                  <Card title="Qr code of the box">
                    <QRCode
                      errorLevel="H"
                      value={record.boxcode}
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
                        alt="Text AdminBox"
                        src="https://www.latercera.com/resizer/SbYYoV02jTaqyeWEVBI0Fr9Ttwo=/900x600/smart/cloudfront-us-east-1.images.arcpublishing.com/copesa/NMBIFI2K2RAJTCEUWCW2HQVFIA.jpg"
                      />
                      <Image
                        width={200}
                        height={150}
                        alt="Text AdminBox"
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
