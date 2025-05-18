import React, { useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Menu, Switch, Layout } from "antd";
const { Header, Content, Sider, Footer } = Layout;
import { ArrowBigLeft, ChevronLeft } from "lucide-react";
const items = [
  {
    key: "sub1",
    label: "Deal Details",
    icon: <MailOutlined />,
    children: [
      { key: "1", label: "Option 1" },
      { key: "2", label: "Option 2" },
      { key: "3", label: "Option 3" },
      { key: "4", label: "Option 4" },
    ],
  },
  {
    key: "sub2",
    label: "Documents",
    icon: <AppstoreOutlined />,
  },
  {
    key: "sub3",
    label: "Particepents",
    icon: <AppstoreOutlined />,
  },
  {
    key: "sub4",
    label: "Finance",
    icon: <SettingOutlined />,
    children: [
      { key: "9", label: "Expenses" },
      { key: "10", label: "Revinue" },
      { key: "11", label: "Fees" },
    ],
  },
  {
    key: "sub5",
    label: "Submit",
    icon: <AppstoreOutlined />,
  },
  {
    key: "sub6",
    label: "Complaince",
    icon: <SettingOutlined />,
    children: [
      { key: "20", label: "Forms" },
      { key: "21", label: "E-sign" },
      { key: "22", label: "Complaince Review" },
    ],
  },
  {
    key: "sub-7",
    label: "Logs",
    icon: <SettingOutlined />,
    children: [
      { key: "30", label: "Activity Logs" },
      { key: "31", label: "Communication Logs" },
    ],
  },
];
const Leftnavigation = () => {
  const [theme, setTheme] = useState("dark");
  const [current, setCurrent] = useState("1");
  const [collapsed, setCollapsed] = useState(false);
  const changeTheme = (value) => {
    setTheme(value ? "dark" : "light");
  };
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="[~.ant-layout-sider-trigger]:relative sidebar-slider rounded-2xl"
        style={{ height: "calc(100vh - 182px)" }}
      >
        <div className=" text-white ">
          <Button type="text" className="!p-0 !text-white">
            <ChevronLeft /> Back
          </Button>
          <div className="ps-6">
            <p>Kishor Sarkar</p>
            <p>INFIN-85446</p>
          </div>
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
    </>
  );
};
export default Leftnavigation;
