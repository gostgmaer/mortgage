import { Button, Flex, Layout, Popover, Progress, Space } from "antd";
import React, { useState } from "react";
import AppLayout from "../Layout";
import Leftnavigation from "./leftNavigation";
import { DownOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Breadcrumb, Menu, theme } from "antd";
import { CircleCheck, EllipsisVertical, TriangleAlert } from "lucide-react";
const { Header, Content, Sider, Footer } = Layout;
import { Steps } from "antd";
import {
  CheckCircleFilled,
  LoadingOutlined,
  CloseCircleFilled,
  ClockCircleOutlined,
} from "@ant-design/icons";

const { Step } = Steps;

const steps = [
  { title: "New Lead", status: "finish" },
  { title: "In Progress", status: "finish" },
  { title: "Credit Consent Pending", status: "finish" },
  { title: "Underwriting in Progress", status: "finish" },
  { title: "Submitted to Lender", status: "finish" },
  { title: "Approved Conditions Outstanding", status: "finish" },
  { title: "Broker Complete", status: "process" },
  { title: "Funded", status: "wait" },
  { title: "Compliance", status: "wait" },
  { title: "Payment Pending", status: "wait" },
  { title: "File Paid", status: "wait" },
  { title: "On Hold", status: "hold" },
  { title: "Cancelled", status: "cancel" },
];
const statusIcons = {
  finish: <CheckCircleFilled style={{ color: "#00BFA5" }} />,
  process: <LoadingOutlined style={{ color: "#3B82F6" }} />,
  wait: <ClockCircleOutlined style={{ color: "#d1d5db" }} />,
  hold: <ClockCircleOutlined style={{ color: "#FFA500" }} />,
  cancel: <CloseCircleFilled style={{ color: "#F87171" }} />,
};
const DealTopbar = ({data}) => {
  // const [percent, setPercent] = useState(0);
 

  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  const currentIndex = steps.findIndex(step => step.title === data.application_state);
  // const percent = ((currentIndex + 1) / 11) * 100;

  return (
    <div className="bg-[#ECF1FC] p-4 flex justify-between">
      <div className=" flex gap-2">
        <button className="rounded-[4px] py-2 px-3  h-auto w-auto !bg-[#D8E4FF] flex flex-col items-start gap-1">
          <span className=" font-bold">GDS</span>
          <span className=" text-[#4B74E3] font-semibold">0%</span>
        </button>
        <button className="rounded-[4px] py-2 px-3  h-auto w-auto !bg-[#D8E4FF] flex flex-col items-start gap-1">
          <span className=" font-bold">TDS</span>
          <span className=" text-[#4B74E3] font-semibold">0% </span>
        </button>
        <button className="rounded-[4px] py-2 px-3  h-auto w-auto !bg-[#D8E4FF] flex flex-col items-start gap-1">
          <span className=" font-bold">LTV</span>
          <span className=" text-[#4B74E3] font-semibold">0%</span>
        </button>
        <button className="rounded-[4px] py-2 px-3  h-auto w-auto !bg-[#D8E4FF] flex flex-col items-start gap-1">
          <span className=" font-bold">Credit Score</span>
          <span className=" text-[#4B74E3] font-semibold">654</span>
        </button>
      </div>
      <div className="flex gap-4">
        <div className="flex items-center gap-2">
          <span className=" wrap-break-word w-min font-bold">
            Documents Completed
          </span>
          <button className="rounded-[4px] p-2 h-auto w-auto !bg-[#D8E4FF] ">
            <span className=" font-semibold">3</span> <span>/</span>
            <span className=" text-[#4B74E3] font-semibold">55</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className=" wrap-break-word w-min font-bold ">
            Tasks Completed
          </span>
          <button className="rounded-[4px] p-2 h-auto w-auto !bg-[#D8E4FF] ">
            <span className=" font-semibold">3</span> <span>/</span>
            <span className=" text-[#4B74E3] font-semibold">10</span>
          </button>
        </div>
        <button className="rounded-[4px]   ">
          <span className=" text-[#4B74E3] font-semibold p-2 !bg-[#D8E4FF] ">
            Notes
          </span>
        </button>
        <button className="rounded-[4px] p-2 ">
          <span className=" text-[#4B74E3] font-semibold">
            <CircleCheck />
          </span>
        </button>
        <Flex gap="small" className=" items-center">
          <Progress
            type="circle"
            percent={((currentIndex + 1) / 11) * 100}
            size={50}
            format={() =>`${currentIndex + 1}/${11}`}
            strokeColor="#00BFA5"
            strokeWidth={8}
          />

          <Popover
            content={<PopOverContent currentTitle={data.application_state} steps={steps}></PopOverContent>}
            trigger="click"
            placement="bottomRight"
            className=" flex flex-col"
            open={open}
            onOpenChange={handleOpenChange}
          >
            <span className="text-gray-700 font-medium">Stage Overview</span>
            <div className=" cursor-pointer">
              <span className="text-gray-500 text-xs pr-2">In Progress</span>
              <DownOutlined className="text-gray-500 ml-auto text-xs" />
            </div>
          </Popover>
        </Flex>
         <button className="rounded-[4px] p-2 cursor-pointer ">
          <span className=" text-[#4B74E3] font-semibold">
           <EllipsisVertical />
          </span>
        </button>
      </div>
    </div>
  );
};

export default DealTopbar;
const PopOverContent = ({ currentTitle, steps }) => {
  const currentIndex = steps.findIndex((step) => step.title === currentTitle);

  const stepsWithStatus = steps.map((step, index) => {
    let status = "wait";
    if (index < currentIndex) status = "finish";
    else if (index === currentIndex) status = "process";

    return {
      ...step,
      status,
    };
  });

  return (
    <div className="w-[300px] overflow-y-auto">
      <Steps direction="vertical" current={currentIndex} >
        {stepsWithStatus.map((step, index) => (
          <Step
            key={index}
            title={
              <span
                className={`text-sm w-max cursor-pointer ${
                  step.status === "finish"
                    ? "text-green-600 font-medium"
                    : step.status === "process"
                    ? "text-blue-600 font-medium"
                    : "text-gray-400"
                }`}
              >
                {step.title}
              </span>
            }
            icon={statusIcons[step.status]} // You can define icons based on status if needed
          />
        ))}
      </Steps>
    </div>
  );
};
