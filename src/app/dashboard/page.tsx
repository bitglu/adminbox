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
import Image from "next/image";

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
      <Image src="/logo.jpeg" alt="VM" width={700} height={600} />
    </main>
  );
}
