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
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useState } from "react";

import type { ColumnsType } from "antd/es/table";
import { ProjectDataFaker } from "@/services/data";
import { useRouter } from "next/navigation";

const { Paragraph } = Typography;

/* SUPABASE */
import { Session, useSupabaseClient } from "@supabase/auth-helpers-react";
import { ProvidersDatabase } from "@/services/supabase/schemas/providers.schema";
type ProvidersDatabaseType =
  ProvidersDatabase["public"]["Tables"]["providers"]["Row"];

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

export default function Home() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState<any>([]);
  const [open, setOpen] = useState(false);

  const [form] = Form.useForm();

  const supabase = useSupabaseClient<ProvidersDatabaseType>();

  const handleMenuClick = (e: any, record: ProvidersDatabaseType) => {
    const status: any = {
      "1": "sdsd",
      "2": "StatusEnum.ACTIVE",
      "3": "StatusEnum.SUSPENDED",
      "4": "StatusEnum.BLOCKED",
    };
    //updateStatus(status[e?.key], record);
  };

  const menuProps: any = (record: ProvidersDatabaseType) => ({
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

  const columns: ColumnsType<ProvidersDatabaseType> = [
    {
      title: "# Code",
      dataIndex: "id",
      key: "id",
      render: (text) => (
        <Button
          type="link"
          onClick={() => router.push(`/dashboard/finances/${text}`)}
          style={{ cursor: "pointer" }}
        >
          {text.toString()}
        </Button>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Paragraph
          copyable
          onClick={() => router.push(`/dashboard/finances/${record.id}`)}
          style={{ cursor: "pointer" }}
        >
          <Button type="link">{text.toString()}</Button>
        </Paragraph>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text, record) => (
        <Paragraph
          copyable
          onClick={() => router.push(`/dashboard/finances/${record.id}`)}
          style={{ cursor: "pointer" }}
        >
          {text.toString()}
        </Paragraph>
      ),
    },
    {
      title: "Options",
      key: "action",
      render: (_, record: ProvidersDatabaseType) => (
        <Dropdown.Button menu={menuProps(record)}>Options</Dropdown.Button>
      ),
    },
  ];

  const onFinish = async (values: any) => {
    try {
      setLoading(true);

      const { data: provider, error } = await supabase
        .from("providers")
        .insert({ ...values, type: "finances" })
        .select()
        .single();

      if (error) {
        console.log("🚀 ~ file: page.tsx:189 ~ onFinish ~ error:", error);
        setLoading(false);
      } else {
        form.resetFields();
        setOpen(false);
        setLoading(false);
        getAllData();
      }
    } catch (error) {
      console.log("🚀 ~ file: page.tsx:197 ~ onFinish ~ error:", error);
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const getAllData = useCallback(async () => {
    setLoading(true);
    try {
      const { data: providers, error } = await supabase
        .from("providers")
        .select("*")
        .eq("type", "finances")
        .order("id", { ascending: false });

      setLoading(false);
      if (error) console.log("error", error);
      else {
        setPayload(providers);
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
        title="Providers"
        extra={
          <Space>
            <Button
              type="primary"
              icon={
                <FontAwesomeIcon
                  icon={faMoneyBill}
                  style={{ marginRight: 5 }}
                />
              }
              onClick={() => setOpen(true)}
            >
              New finance
            </Button>
            <Button
              type="ghost"
              loading={loading}
              disabled={loading}
              onClick={getAllData}
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
        title="New provider"
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
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
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
