"use client";

import styles from "./page.module.css";
import {
  Button,
  Card,
  DatePicker,
  Drawer,
  Dropdown,
  Form,
  FormInstance,
  Input,
  InputRef,
  MenuProps,
  Popconfirm,
  QRCode,
  Space,
  Statistic,
  Table,
  Tag,
  Timeline,
  Typography,
  message,
} from "antd";
import {
  faChartSimple,
  faUsers,
  faBoxesStacked,
  faPenToSquare,
  faShield,
  faStoreSlash,
  faTrash,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useRef, useState } from "react";

import type { ColumnType, ColumnsType, TableProps } from "antd/es/table";
import { UsersDataFaker } from "@/services/data";

/* SUPABASE */
import { Session, useSupabaseClient } from "@supabase/auth-helpers-react";
import { UsersDatabase } from "@/services/supabase/schemas/users.schema";
type UsersDatabaseType = UsersDatabase["public"]["Tables"]["users"]["Row"];
import dayjs from "dayjs";
import { FilterConfirmProps } from "antd/es/table/interface";

const { Paragraph } = Typography;
const { RangePicker } = DatePicker;

interface DataType {
  _id: string;
  id: string;
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
  const [typeForm, setTypeForm] = useState<any>(null);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const [paramsFilters, setParamsFilters] = useState<any>({
    id: null,
    name: null,
    email: null,
    from: null,
    to: null,
  });

  const [messageApi, contextHolder] = message.useMessage();

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

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: string
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (
    clearFilters: () => void,
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: string
  ) => {
    clearFilters();
    setSearchText("");
    setParamsFilters({
      ...paramsFilters,
      [dataIndex]: null,
    });
    confirm();
  };

  const onChangeTable: TableProps<any>["onChange"] = (
    pagination,
    filters: any,
    sorter,
    extra
  ) => {
    if (filters.id) {
      setParamsFilters({
        ...paramsFilters,
        id: filters.id[0],
      });
    }

    if (filters.name) {
      setParamsFilters({
        ...paramsFilters,
        name: filters.name[0],
      });
    }

    if (filters.email) {
      setParamsFilters({
        ...paramsFilters,
        email: filters.email[0],
      });
    }
  };

  const getColumnSearchProps = (dataIndex: string): ColumnType<any> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }: any) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search`}
          value={selectedKeys[0]}
          onChange={(e: any) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() =>
              clearFilters && handleReset(clearFilters, confirm, dataIndex)
            }
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>

          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        style={{ color: filtered ? "#512A8A" : undefined }}
      />
    ),
    onFilterDropdownOpenChange: (visible: any) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns: ColumnsType<DataType> = [
    {
      title: "# Code",
      dataIndex: "id",
      key: "id",
      ...getColumnSearchProps("id"),
      render: (text) => <Paragraph copyable>{text.toString()}</Paragraph>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
      render: (text) => <Paragraph copyable>{text.toString()}</Paragraph>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
      render: (text) => <Paragraph copyable>{text.toString()}</Paragraph>,
    },
    {
      title: "Created",
      key: "created_at",
      dataIndex: "created_at",
      render: (text) => (
        <Tag color="green">{dayjs(text).format("DD MMM hh:mm a")}</Tag>
      ),
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
        close,
      }: any) => (
        <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
          <RangePicker
            onChange={(date, dateString) => {
              setParamsFilters({
                ...paramsFilters,
                from: dateString[0],
                to: dateString[1],
              });
            }}
          />
          <br />
        </div>
      ),
    },
    {
      title: "Options",
      key: "action",
      render: (_, record: DataType) => (
        <Space>
          <Button
            type="dashed"
            size="small"
            onClick={() => {
              form.setFieldsValue({
                name: record.name,
                email: record.email,
              });
              setTypeForm(record.id);
              setOpen(true);
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete?"
            description="Are you sure to delete this?"
            onConfirm={() => confirmDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger size="small">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const onFinish = async (values: any) => {
    try {
      setLoading(true);

      if (typeForm) {
        const { error } = await supabase
          .from("users")
          .update(values)
          .eq("id", typeForm);

        messageApi.open({
          type: "success",
          content: "Updated completed",
        });
        form.resetFields();
        registerLog({
          action: `update user ${typeForm}`,
        });
        setLoading(false);
        setTypeForm(null);
        setOpen(false);
        getAllData();
      } else {
        const { data: user, error } = await supabase
          .from("users")
          .insert(values)
          .select()
          .single();
        if (error) {
          setLoading(false);
        } else {
          registerLog({
            action: "create user",
          });
          form.resetFields();
          setOpen(false);
          setLoading(false);
          getAllData();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const confirmDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("users")
        .update({ status: "deleted" })
        .eq("id", id);

      registerLog({
        action: `delete user ${id}`,
      });

      messageApi.open({
        type: "success",
        content: "deletion completed",
      });

      getAllData();
    } catch (error) {
      console.log("🚀 ~ file: page.tsx:378 ~ confirmDelete ~ error:", error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const getAllData = useCallback(async () => {
    setLoading(true);
    try {
      const query = supabase.from("users").select("*").eq("status", "active");

      if (paramsFilters.email) {
        query.ilike("email", `%${paramsFilters.email}%`);
      }

      if (paramsFilters.name) {
        query.ilike("name", `%${paramsFilters.name}%`);
      }

      if (paramsFilters.from || paramsFilters.to) {
        query
          .gt(
            "created_at",
            dayjs(paramsFilters.from)
              .startOf("day")
              .format("YYYY-MM-DD hh:mm:ss")
          )
          .lt(
            "created_at",
            dayjs(paramsFilters.to).endOf("day").format("YYYY-MM-DD hh:mm:ss")
          );
      }

      if (paramsFilters.id) {
        query.eq("id", paramsFilters.id);
      }

      const { data: users, error } = await query.order("id", {
        ascending: false,
      });

      setLoading(false);
      if (error) console.log("error", error);
      else {
        setPayload(users);
      }
    } catch (error) {
      setLoading(false);
    }
  }, [paramsFilters]);

  const registerLog = async (values: { action: string }) => {
    try {
      const { data: user, error } = await supabase
        .from("logs")
        .insert({ user_id: 1, ...values })
        .select()
        .single();
    } catch (error) {
      console.log("🚀 ", error);
    }
  };

  useEffect(() => {
    getAllData();

    return () => {};
  }, [getAllData]);

  return (
    <main className={styles.main}>
      {contextHolder}

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
          onChange={onChangeTable}
        />
      </Card>

      <Drawer
        title={typeForm ? "Edit user" : "New user"}
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

          {!typeForm && (
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          )}
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
