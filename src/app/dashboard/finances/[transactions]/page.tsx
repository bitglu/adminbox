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
  Image,
  Input,
  InputRef,
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
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useRef, useState } from "react";

import type { ColumnType, ColumnsType, TableProps } from "antd/es/table";
import { ProjectZonesDataFaker } from "@/services/data";
import { useRouter } from "next/navigation";

const { Paragraph } = Typography;

/* SUPABASE */
import { Session, useSupabaseClient } from "@supabase/auth-helpers-react";
import { TransactionsDatabase } from "@/services/supabase/schemas/transactions.schema";
import dayjs from "dayjs";
import { FilterConfirmProps } from "antd/es/table/interface";
type TransactionsDatabaseType =
  TransactionsDatabase["public"]["Tables"]["transactions"]["Row"];

const { RangePicker } = DatePicker;

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

  const [cashAmount, setCashAmount] = useState(0);

  const [form] = Form.useForm();

  const supabase = useSupabaseClient<TransactionsDatabase>();

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const [paramsFilters, setParamsFilters] = useState<any>({
    id: null,
    type: null,
    date: null,
    code: null,
    from: null,
    to: null,
  });

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

    if (filters.type) {
      setParamsFilters({
        ...paramsFilters,
        type: filters.type[0],
      });
    }

    if (paramsFilters.type && !filters.type) {
      setParamsFilters({
        ...paramsFilters,
        type: null,
      });
    }
  };

  const columns: ColumnsType<TransactionsDatabaseType> = [
    {
      title: "# Code",
      dataIndex: "id",
      key: "id",
      ...getColumnSearchProps("id"),
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
        setLoading(false);
      } else {
        registerLog({
          action: "create transaction finance",
        });
        form.resetFields();
        setOpen(false);
        setLoading(false);
        getAllData();
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
      const query = supabase.from("transactions").select("*");

      if (params.transactions) {
        query.eq("provider_id", params.transactions);
      }

      if (paramsFilters.type) {
        query.eq("type", paramsFilters.type);
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
        setCashAmount(
          users
            .map((ele) => {
              if (ele.type === "Cash") {
                return ele.amount;
              }
            })
            .filter((ele) => ele)
            .reduce((ele, a: any) => ele + a, 0)
        );

        setPayload(users);
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
      <Card
        bordered={false}
        title={`Finance ${params.transactions}`}
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
              onClick={() => router.push("/dashboard/finances")}
            >
              Back to finances
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
        actions={[
          <Space key={1}>
            <Statistic
              title="Total"
              value={cashAmount}
              style={{ marginLeft: 10, marginRight: 10 }}
              valueStyle={{ color: "#7B56BE" }}
              prefix="$"
            />
          </Space>,
        ]}
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
              {/* <Select.Option value="Credit">Credit</Select.Option> */}
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
