"use client";
import React, { useState } from "react";
import { Button, Dropdown, Flex, Select, Space, Splitter, Table } from "antd";
import { BarcodeIcon, FilterIcon } from "lucide-react";
import { Input } from "antd";
import Link from "next/link";
import { dealList } from "@/assets/json/deallist";
const { Search } = Input;
const columns = [
  {
    title: "Deal Id",
    dataIndex: "loan_application_id",
    key: "loan_application_id",
    render: (_, record) => (
      <Link
        href={`/deals/details/information/${record.loan_application_id}/${record.application_id}`}
      >
        {record.loan_application_id}
      </Link>
    ),
  },
  { title: "Deal Owner", dataIndex: "deal_owner" },
  { title: "Loan Amount", dataIndex: "loan_amount" },
];
const options = [];
for (let i = 10; i < 36; i++) {
  options.push({
    value: i.toString(36) + i,
    label: i.toString(36) + i,
  });
}

const items = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        2nd menu item
      </a>
    ),
  },
  {
    key: "3",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        3rd menu item
      </a>
    ),
  },
];
const dataSource = dealList.data
const TableLayout = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  const onSearch = (value, _e, info) =>
    console.log(info === null || info === void 0 ? void 0 : info.source, value);

  const [size, setSize] = useState("middle");
  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const handleChange = (value) => {
    console.log(`Selected: ${value}`);
  };
  return (
    <div>
      <section className=" flex justify-between items-center mb-4">
        <p>Deals</p>
        <Button>+Deal</Button>
      </section>
      <section className="flex justify-between items-center mb-4">
        <div className=" flex items-center gap-5">
          <div>
            <Button>
              <FilterIcon></FilterIcon>
            </Button>{" "}
            <Button>
              <BarcodeIcon></BarcodeIcon>
            </Button>
          </div>
          <div>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Select
                //   size={"size"}
                defaultValue="a1"
                onChange={handleChange}
                style={{ width: 200 }}
                options={options}
              />
            </Space>
          </div>
        </div>
        <div className="flex justify-between items-center gap-5">
          <Space direction="vertical">
            <Space wrap>
              <Dropdown menu={{ items }} placement="bottomRight">
                <Button>bottomRight</Button>
              </Dropdown>
            </Space>
          </Space>
          <Space direction="vertical">
            <Search
              placeholder="input search text"
              onSearch={onSearch}
              style={{ width: 200 }}
            />
          </Space>
        </div>
      </section>
      <section className=" overflow-auto">
        <Splitter
          className=""
          style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
        >
          <Splitter.Panel defaultSize="0%" min="20%" max="70%">
            <div></div>
          </Splitter.Panel>
          <Splitter.Panel>
            <div>
              <Flex gap="middle" vertical>
                <Table
                  rowSelection={rowSelection}
                  columns={columns}
                  dataSource={dataSource}
                />
              </Flex>
            </div>
          </Splitter.Panel>
        </Splitter>
      </section>
    </div>
  );
};

export default TableLayout;
