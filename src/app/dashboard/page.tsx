"use client";

import styles from "./page.module.css";
import {
  Button,
  Card,
  Col,
  Dropdown,
  MenuProps,
  QRCode,
  Row,
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

import MyResponsivePie from "@/components/charts/piechart/PieChartComponent";
import MyResponsiveBar from "@/components/charts/barchart/BarChartComponent";
import { supabase } from "@/services/supabase/supabase";

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

export default function Home() {
  const [loading, setLoading] = useState(false);

  return (
    <main className={styles.main}>
      {/*  <div style={{ textAlign: "center", marginBottom: "3%" }}>
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
      </div> */}

      {/*   <Row gutter={16} style={{ marginTop: "1%" }}>
        <Col span={12}>
          <Card bordered={false} title="Projects growth">
            <div style={{ height: 400, width: "100%" }}>
              <MyResponsivePie />
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={false} title="Growth Graph">
            <div style={{ height: 400, width: "100%" }}>
              <MyResponsiveBar />
            </div>
          </Card>
        </Col>
      </Row> */}
    </main>
  );
}
