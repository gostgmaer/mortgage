"use client";
import { Button, Layout } from "antd";
import React, { useState } from "react";
import AppLayout from "../Layout";
import Leftnavigation from "./leftNavigation";

import { Breadcrumb, Menu, theme } from "antd";
import DealTopbar from "./topbar";
import { TriangleAlert } from "lucide-react";
const { Header, Content, Sider, Footer } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const DealDetailsSkeliton = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <AppLayout>
      <Layout>
        <section className=" bg-[#FAF3EC] flex items-center justify-between p-2.5 rounded mb-2">
          <div className="flex items-center gap-4">
            <TriangleAlert />{" "}
            <p>
              This deal is currently On Hold. Do you want to restore the deal?
            </p>
          </div>
          <div>
            <Button>Restore</Button>
          </div>
        </section>
        <Layout style={{ height: "calc(100vh - 182px)" }}>
          <Leftnavigation></Leftnavigation>
          <Layout>
            <Content style={{ margin: "0 16px" }} className="rounded">
              <DealTopbar></DealTopbar>
              <Layout
                style={{
                  padding: 24,
                  minHeight: 360,
                   height: "calc(100vh - 280px)" ,
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                }}
                // style={{ height: "calc(100vh - 240px)" }}
                className=" overflow-auto "
              >
             {children}
              </Layout>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </AppLayout>
  );
};

export default DealDetailsSkeliton;
