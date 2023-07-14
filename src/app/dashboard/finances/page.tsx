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
  faMoneyBill,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useRef, useState } from "react";

import type { ColumnType, ColumnsType, TableProps } from "antd/es/table";
import { ProjectDataFaker } from "@/services/data";
import { useRouter } from "next/navigation";

const { Paragraph } = Typography;

/* SUPABASE */
import { Session, useSupabaseClient } from "@supabase/auth-helpers-react";
import { ProvidersDatabase } from "@/services/supabase/schemas/providers.schema";
import { FilterConfirmProps } from "antd/es/table/interface";
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
  const [typeForm, setTypeForm] = useState<any>(null);
  const [messageApi, contextHolder] = message.useMessage();

  const supabase = useSupabaseClient<ProvidersDatabaseType>();

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const [paramsFilters, setParamsFilters] = useState<any>({
    id: null,
    name: null,
    description: null,
  });

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

    if (filters.description) {
      setParamsFilters({
        ...paramsFilters,
        description: filters.description[0],
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

  const columns: ColumnsType<ProvidersDatabaseType> = [
    {
      title: "# Code",
      dataIndex: "id",
      key: "id",
      ...getColumnSearchProps("id"),
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
      ...getColumnSearchProps("name"),
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
      ...getColumnSearchProps("description"),
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
        <Space>
          <Button
            type="dashed"
            size="small"
            onClick={() => {
              form.setFieldsValue({
                name: record.name,
                description: record.description,
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

  const confirmDelete = async (id: number) => {
    try {
      const { error } = await supabase
        .from("providers")
        .update({ status: "deleted" })
        .eq("id", id);

      registerLog({
        action: `delete finance ${id}`,
      });

      messageApi.open({
        type: "success",
        content: `deletion completed ${id}`,
      });

      getAllData();
    } catch (error) {
      console.log("🚀 ~ file: page.tsx:378 ~ confirmDelete ~ error:", error);
    }
  };

  const onFinish = async (values: any) => {
    try {
      setLoading(true);

      if (typeForm) {
        const { error } = await supabase
          .from("providers")
          .update(values)
          .eq("id", typeForm);

        messageApi.open({
          type: "success",
          content: "Updated completed",
        });

        registerLog({
          action: `update finance ${typeForm}`,
        });
        form.resetFields();
        setLoading(false);
        setTypeForm(null);
        setOpen(false);
        getAllData();
      } else {
        const { data: provider, error } = await supabase
          .from("providers")
          .insert({ ...values, type: "finances" })
          .select()
          .single();

        if (error) {
          setLoading(false);
        } else {
          registerLog({
            action: "create finance",
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

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const getAllData = useCallback(async () => {
    setLoading(true);
    try {
      const query = supabase
        .from("providers")
        .select("*")
        .eq("type", "finances")
        .eq("status", "active");

      if (paramsFilters.description) {
        query.ilike("description", `%${paramsFilters.description}%`);
      }

      if (paramsFilters.name) {
        query.ilike("name", `%${paramsFilters.name}%`);
      }

      if (paramsFilters.id) {
        query.eq("id", paramsFilters.id);
      }

      const { data: providers, error } = await query.order("id", {
        ascending: false,
      });

      setLoading(false);
      if (error) console.log("error", error);
      else {
        setPayload(providers);
      }
    } catch (error) {
      setLoading(false);
    }
  }, [paramsFilters]);

  useEffect(() => {
    getAllData();

    return () => {};
  }, [getAllData]);

  return (
    <main className={styles.main}>
      {contextHolder}

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
          onChange={onChangeTable}
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
