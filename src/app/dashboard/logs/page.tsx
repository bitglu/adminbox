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
import { LogsDatabase } from "@/services/supabase/schemas/logs.schema";
type UsersDatabaseType = LogsDatabase["public"]["Tables"]["logs"]["Row"];
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

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

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
    user_id: null,
    action: null,
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

    if (filters.user_id) {
      setParamsFilters({
        ...paramsFilters,
        user_id: filters.user_id[0],
      });
    }

    if (filters.action) {
      setParamsFilters({
        ...paramsFilters,
        action: filters.action[0],
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
      title: "User Id",
      dataIndex: "user_id",
      key: "user_id",
      ...getColumnSearchProps("user_id"),
      render: (text, record: any) => (
        <Paragraph copyable={{ text: record?.user_id?.name }}>
          {record?.user_id?.name}
        </Paragraph>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      ...getColumnSearchProps("action"),
      render: (text) => <Paragraph copyable>{text.toString()}</Paragraph>,
    },
    {
      title: "Created",
      key: "created_at",
      dataIndex: "created_at",
      render: (text) => (
        <Tag color="green">{dayjs(text).tz("America/Chicago").format("DD MMM hh:mm a")}</Tag>
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
  ];

  const getAllData = useCallback(async () => {
    setLoading(true);
    try {
      const query = supabase.from("logs").select("*, user_id:users(*)");

      if (paramsFilters.user_id) {
        query.eq("user_id", paramsFilters.user_id);
      }

      if (paramsFilters.action) {
        query.ilike("action", `%${paramsFilters.action}%`);
      }

      if (paramsFilters.from || paramsFilters.to) {
        query
          .gt(
            "created_at",
            dayjs(paramsFilters.from)
              .tz("America/Chicago")
              .format("YYYY-MM-DD 00:00:00")
          )
          .lt(
            "created_at",
            dayjs(paramsFilters.to)
              .tz("America/Chicago")
              .format("YYYY-MM-DD 23:59:59")
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

  useEffect(() => {
    getAllData();

    return () => {};
  }, [getAllData]);

  return (
    <main className={styles.main}>
      {contextHolder}

      <Card
        bordered={false}
        title="Logs"
        extra={
          <Space>
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
    </main>
  );
}
