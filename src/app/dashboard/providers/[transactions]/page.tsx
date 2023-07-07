"use client";

import styles from "./page.module.css";
import {
  Button,
  Card,
  Drawer,
  Dropdown,
  Form,
  FormInstance,
  Image,
  Input,
  MenuProps,
  QRCode,
  Select,
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
import React, { useCallback, useEffect, useState } from "react";

import type { ColumnsType } from "antd/es/table";
import { ProjectZonesDataFaker } from "@/services/data";
import { useRouter } from "next/navigation";

const { Paragraph } = Typography;

/* SUPABASE */
import { Session, useSupabaseClient } from "@supabase/auth-helpers-react";
import { TransactionsDatabase } from "@/services/supabase/schemas/transactions.schema";
import dayjs from "dayjs";
type TransactionsDatabaseType =
  TransactionsDatabase["public"]["Tables"]["transactions"]["Row"];

const colorsTags: any = {
  Pending: "cyan",
  Delivery: "green",
  Cancel: "red",
};

const SubmitButton = ({ form }: { form: FormInstance }) => {
  const [submittable, setSubmittable] = React.useState(false);

  // Watch all values
  const values = Form.useWatch([], form);

  React.useEffect(() => {
    form.validateFields().then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      }
    );
  }, [values]);

  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      Submit
    </Button>
  );
};

export default function Home({ params }: { params: { transactions: string } }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState<any>([]);
  const [open, setOpen] = useState(false);

  const [form] = Form.useForm();

  const supabase = useSupabaseClient<TransactionsDatabase>();

  const handleMenuClick = (e: any, record: TransactionsDatabaseType) => {
    const status: any = {
      "1": "sdsd",
      "2": "StatusEnum.ACTIVE",
      "3": "StatusEnum.SUSPENDED",
      "4": "StatusEnum.BLOCKED",
    };
    //updateStatus(status[e?.key], record);
  };

  const menuProps: any = (record: TransactionsDatabaseType) => ({
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

  const columns: ColumnsType<TransactionsDatabaseType> = [
    {
      title: "# Code",
      dataIndex: "id",
      key: "id",
      render: (text) => (
        <Paragraph copyable style={{ cursor: "pointer" }}>
          {text?.toString()}
        </Paragraph>
      ),
    },
    {
      title: "Provider ID",
      dataIndex: "provider_id",
      key: "provider_id",
      render: (text) => (
        <Paragraph copyable style={{ cursor: "pointer" }}>
          {text?.toString()}
        </Paragraph>
      ),
    },
    {
      title: "type",
      dataIndex: "type",
      key: "type",
      render: (text) => (
        <Tag color={text === "Credit" ? "blue" : "purple"}>
          {text?.toString()}
        </Tag>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text) => <Tag color="green">{text?.toString()}</Tag>,
    },
    {
      title: "Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => (
        <Paragraph copyable>{dayjs(text).format("DD MMM hh:mm a")}</Paragraph>
      ),
    },
    {
      title: "Options",
      key: "action",
      render: (_, record: TransactionsDatabaseType) => (
        <Dropdown.Button menu={menuProps(record)}>Options</Dropdown.Button>
      ),
    },
  ];

  const onFinish = async (values: any) => {
    try {
      setLoading(true);

      const { data: transaction, error } = await supabase
        .from("transactions")
        .insert({ ...values, provider_id: params.transactions })
        .select()
        .single();

      if (error) {
        console.log("🚀 ~ file: page.tsx:201 ~ onFinish ~ error:", error);
        setLoading(false);
      } else {
        form.resetFields();
        setOpen(false);
        setLoading(false);
        getAllData();
      }
    } catch (error) {
      console.log("🚀 ~ file: page.tsx:209 ~ onFinish ~ error:", error);
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const getAllData = useCallback(async () => {
    setLoading(true);
    try {
      const { data: users, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("provider_id", params.transactions)
        .order("id", { ascending: false });

      setLoading(false);
      if (error) console.log("error", error);
      else {
        setPayload(users);
      }
    } catch (error) {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getAllData();

    return () => {};
  }, [getAllData]);

  return (
    <main className={styles.main}>
      <Card
        bordered={false}
        title={`Provider ${params.transactions}`}
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
              onClick={() => router.push("/dashboard/providers")}
            >
              Back to providers
            </Button>
            <Button
              type="primary"
              icon={
                <FontAwesomeIcon icon={faRuler} style={{ marginRight: 5 }} />
              }
              onClick={() => setOpen(true)}
            >
              New transaction
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
          rowKey="id"
          loading={loading}
          columns={columns}
          dataSource={payload}
        />
      </Card>

      <Drawer
        title="New transaction"
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
      >
        <Form
          form={form}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item name="type" label="Type" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="Credit">Credit</Select.Option>
              <Select.Option value="Cash">Cash</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="amount" label="Amount" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item>
            <Space>
              <SubmitButton form={form} />
              <Button htmlType="reset">Reset</Button>
            </Space>
          </Form.Item>
        </Form>
      </Drawer>
    </main>
  );
}
