import React from "react";
import Header from "../navigation/header";
import Sidebar from "../navigation/sidebar";

const AppLayout = ({ children }) => {
  return (
    <div className="p-5">
      <Header />

      <section className=" flex gap-2">
        <Sidebar></Sidebar>
        <main  style={{ height: 'calc(100vh - 124px)',width:'calc(100vw - 100px)' }} className=" bg-white    rounded-xl">{children}</main>
      </section>
    </div>
  );
};

export default AppLayout;
