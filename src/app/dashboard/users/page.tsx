"use client";

import styles from "./page.module.css";
import {
  Button,
  Card,
  Drawer,
  Dropdown,
  Form,
  FormInstance,
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
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useState } from "react";

import type { ColumnsType } from "antd/es/table";
import { UsersDataFaker } from "@/services/data";

/* SUPABASE */
import { Session, useSupabaseClient } from "@supabase/auth-helpers-react";
import { UsersDatabase } from "@/services/supabase/schemas/users.schema";
type UsersDatabaseType = UsersDatabase["public"]["Tables"]["users"]["Row"];

const { Paragraph } = Typography;

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
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState<any>([]);
  const [open, setOpen] = useState(false);

  const [form] = Form.useForm();

  const supabase = useSupabaseClient<UsersDatabaseType>();

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
      dataIndex: "id",
      key: "id",
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
      title: "Created",
      key: "created_at",
      dataIndex: "created_at",
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

  const onFinish = async (values: any) => {
    try {
      setLoading(true);

      const { data: user, error } = await supabase
        .from("users")
        .insert(values)
        .select()
        .single();

      if (error) {
        setLoading(false);
      } else {
        form.resetFields();
        setOpen(false);
        setLoading(false);
        getAllData();
      }
    } catch (error) {
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
        .from("users")
        .select("*")
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
        title="Users"
        extra={
          <Space>
            <Button
              type="primary"
              loading={loading}
              disabled={loading}
              icon={
                <FontAwesomeIcon icon={faUsers} style={{ marginRight: 5 }} />
              }
              onClick={() => setOpen(true)}
            >
              New User
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
        title="New User"
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
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
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
