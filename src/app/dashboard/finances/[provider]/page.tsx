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
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import type { ColumnType, ColumnsType, TableProps } from "antd/es/table";
import { ProjectDataFaker } from "@/services/data";
import { useRouter } from "next/navigation";

const { Paragraph } = Typography;

const invoiceData = {
  id: "5df3180a09ea16dc4b95f910",
  invoice_no: "201906-28",
  balance: "$2,283.74",
  company: "MANTRIX",
  email: "susanafuentes@mantrix.com",
  phone: "+1 (872) 588-3809",
  address: "922 Campus Road, Drytown, Wisconsin, 1986",
  trans_date: "2019-09-12",
  due_date: "2019-10-12",
  items: [
    {
      sno: 1,
      desc: "ad sunt culpa occaecat qui",
      qty: 5,
      rate: 405.89,
    },
    {
      sno: 2,
      desc: "cillum quis sunt qui aute",
      qty: 5,
      rate: 373.11,
    },
    {
      sno: 3,
      desc: "ea commodo labore culpa irure",
      qty: 5,
      rate: 458.61,
    },
    {
      sno: 4,
      desc: "nisi consequat et adipisicing dolor",
      qty: 10,
      rate: 725.24,
    },
    {
      sno: 5,
      desc: "proident cillum anim elit esse",
      qty: 4,
      rate: 141.02,
    },
  ],
};

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

/* SUPABASE */
import { Session, useSupabaseClient } from "@supabase/auth-helpers-react";
import { ProvidersDatabase } from "@/services/supabase/schemas/providers.schema";
import { FilterConfirmProps, TableRowSelection } from "antd/es/table/interface";
type ProvidersDatabaseType =
  ProvidersDatabase["public"]["Tables"]["providers"]["Row"];

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { PDFViewer } from "@react-pdf/renderer";
import Invoice from "@/components/pdf/table/invoice";
const ExportToExcel = ({ apiData, fileName }: any) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (apiData: any, fileName: any) => {
    const ws = XLSX.utils.json_to_sheet(apiData());
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <Button onClick={(e) => exportToCSV(apiData(), fileName)}>Export</Button>
  );
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

export default function Home({ params }: { params: { provider: string } }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState<any>([]);
  const [open, setOpen] = useState(false);

  const [form] = Form.useForm();
  const [typeForm, setTypeForm] = useState<any>(null);
  const [messageApi, contextHolder] = message.useMessage();

  const [singleData, setsingleData] = useState({
    name: "",
  });

  const [dataExportPdf, setdataExportPdf] = useState([]);
  const [showReportPdf, setshowReportPdf] = useState(false);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  const supabase = useSupabaseClient<ProvidersDatabaseType>();

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const [paramsFilters, setParamsFilters] = useState<any>({
    id: null,
    name: null,
    description: null,
    from: null,
    to: null,
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
          type="text"
          onClick={() =>
            router.push(`/dashboard/finances/${params.provider}/${text}`)
          }
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
          onClick={() =>
            router.push(`/dashboard/finances/${params.provider}/${record.id}`)
          }
          style={{ cursor: "pointer" }}
        >
          <Button type="text">{text.toString()}</Button>
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
          onClick={() =>
            router.push(`/dashboard/finances/${params.provider}/${record.id}`)
          }
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
          action: `update sub provider finance ${typeForm}`,
        });
        form.resetFields();
        setLoading(false);
        setTypeForm(null);
        setOpen(false);
        getAllData();
      } else {
        const { data: provider, error } = await supabase
          .from("providers")
          .insert({
            ...values,
            type: "sub_finances",
            provider_id: params.provider,
            created_at: new Date()
            
          })
          .select()
          .single();

        if (error) {
          setLoading(false);
        } else {
          registerLog({
            action: "create sub provider finance",
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
        .insert({ user_id: 1, ...values, created_at: new Date() })
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
      console.log("paramsFilters", paramsFilters);
      const query = supabase
        .from("providers")
        .select("*")
        .eq("type", "sub_finances")
        .eq("status", "active");

      if (params.provider) {
        query.eq("provider_id", params.provider);
        let { data: provider } = await supabase
          .from("providers")
          .select("*")
          .eq("id", params.provider)
          .single();

        setsingleData(provider);
      }

      if (paramsFilters.description) {
        query.ilike("description", `%${paramsFilters.description}%`);
      }

      if (paramsFilters.name) {
        query.ilike("name", `%${paramsFilters.name}%`);
      }

      if (paramsFilters.id) {
        query.eq("id", paramsFilters.id);
      }

    /*   if (paramsFilters.from || paramsFilters.to) {
        query
          .gt(
            "created_at",
            dayjs(paramsFilters.from)
              .tz("America/Chicago")
              .startOf("day")
              .format("YYYY-MM-DD 00:00:00")
          )
          .lt(
            "created_at",
            dayjs(paramsFilters.to)
              .tz("America/Chicago")
              .endOf("day")
              .format("YYYY-MM-DD 23:59:59")
          );
      } */

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

  const getAllReportByExcel = useCallback(async () => {
    let providersFilter: any;

    if (selectedRowKeys.length <= 0) {
      providersFilter = payload.map((ele: any) => {
        return {
          id: ele.id,
          name: ele.name,
        };
      });
    } else {
      providersFilter = selectedRowKeys.map((ele) => {
        if (payload.filter((e: any) => e.id === ele)[0]) {
          return {
            id: payload.filter((e: any) => e.id === ele)[0].id,
            name: payload.filter((e: any) => e.id === ele)[0].name,
          };
        }
      });
    }

    let query = supabase
      .from("transactions")
      .select("*")
      .in(
        "provider_id",
        providersFilter.map((ele: any) => ele.id)
      );

    if (paramsFilters.from || paramsFilters.to) {
      query
        .gte(
          "created_at",
          dayjs(paramsFilters.from)
            .tz("America/Chicago")
            .format("YYYY-MM-DD 00:00:00")
        )
        .lte(
          "created_at",
          dayjs(paramsFilters.to)
            .tz("America/Chicago")
            .format("YYYY-MM-DD 23:59:59")
        );
    }

    let { data: data, error } = await query.order("id", {
      ascending: false,
    });

    const dataToExcel: any = [];

    data?.forEach((element) => {
      const date = dayjs(element.created_at).format("MMM");

      if (dataToExcel.length <= 0) {
        dataToExcel.push({
          provider: providersFilter.filter(
            (ele: any) => ele.id === element.provider_id
          )[0].name,
          [date]: element.amount,
          month: date,
          amount: element.amount,
        });
      } else {
        const existTypeInArray = dataToExcel.findIndex(
          (ele: any) =>
            ele.provider ===
            providersFilter.filter(
              (ele: any) => ele.id === element.provider_id
            )[0].name
        );

        if (dataToExcel[existTypeInArray]) {
          if (dataToExcel[existTypeInArray].month === date) {
            dataToExcel[existTypeInArray].amount += element.amount;
          } else {
            dataToExcel.push({
              provider: providersFilter.filter(
                (ele: any) => ele.id === element.provider_id
              )[0].name,
              [date]: element.amount,
              month: date,
              amount: element.amount,
            });
            //dataToExcel[existTypeInArray][date] = element.amount;
          }
        } else {
          dataToExcel.push({
            provider: providersFilter.filter(
              (ele: any) => ele.id === element.provider_id
            )[0].name,
            [date]: element.amount,
            month: date,
            amount: element.amount,
          });
        }
      }
    });

    setdataExportPdf(dataToExcel);
    setshowReportPdf(true);
    return;
    /* 
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const ws = XLSX.utils.json_to_sheet(dataToExcel);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const dataExcelSend = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(dataExcelSend, "ExportAll" + fileExtension);
     */
  }, [payload, selectedRowKeys, paramsFilters]);

  useEffect(() => {
    getAllData();

    return () => {};
  }, [getAllData]);

  return (
    <main className={styles.main}>
      {contextHolder}
      <Card
        bordered={false}
        title={singleData?.name}
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
                <FontAwesomeIcon
                  icon={faMoneyBill}
                  style={{ marginRight: 5 }}
                />
              }
              onClick={() => setOpen(true)}
            >
              New sub provider
            </Button>
            <Button
              type="ghost"
              loading={loading}
              disabled={loading}
              onClick={getAllData}
            >
              Refresh
            </Button>
            <Button
              type="ghost"
              loading={loading}
              disabled={loading}
              onClick={() => {
                !showReportPdf
                  ? getAllReportByExcel()
                  : setshowReportPdf(false);
              }}
            >
              {showReportPdf ? "Hide report" : "Show report"}
            </Button>
            <DatePicker.RangePicker
              onChange={(date: any, dateString: any) => {
                console.log(date[0].toString(), date[1].toString());
                setParamsFilters({
                  ...paramsFilters,
                  from: date[0],
                  to: date[1],
                });
              }}
            />
          </Space>
        }
      >
        {!showReportPdf && (
          <Table
            rowKey="id"
            rowSelection={rowSelection}
            loading={loading}
            columns={columns}
            dataSource={payload}
            onChange={onChangeTable}
          />
        )}
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

      {showReportPdf && (
        <Fragment>
          <PDFViewer width="1000" height="600" className="app">
            <Invoice invoice={dataExportPdf} title={singleData?.name} />
          </PDFViewer>
        </Fragment>
      )}
    </main>
  );
}
