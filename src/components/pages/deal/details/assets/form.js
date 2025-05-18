"use client";

import { useState } from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Row,
  Col,
  Typography,
} from "antd";
// import AccordionSection from './AccordionSection';
import dayjs from "dayjs";
import AccordionSection from "@/components/resuable/accordion";
import AssetTable from "./table";

const { Option } = Select;
const { Text } = Typography;

const AssetsFields = [
  {
    name: "Owners",
    label: "Owners",
    mode: "multiple",
    type: "select",
    required: true,
    maxTagCount: "responsive",
    options: [
      "Survivor Benefit Pension",
      "Rental Income",
      "Investmesnt",
      "Survivsor Benefit Pension",
      "Rental Inscome",
      "Investment",
    ],
  },
  {
    name: "assetType",
    label: "Asset Type",
    type: "select",
    required: true,
    options: ["Weekly", "Monthly", "Annual"],
  },
  {
    name: "description",
    label: "Asset Description",
    type: "text",
    required: false,
  },

  {
    name: "assetValue",
    label: "Asset Value",
    type: "currency",
    required: true,
  },
  {
    name: "downpayment",
    label: "Down Payment",
    type: "currency",
    required: false,
  },
];

export default function AssetsAccordionForm() {
  const [form] = Form.useForm();
  const [editable, setEditable] = useState(false);
  const [show, setShow] = useState(false);

  const initialValues = {
    incomeType: "Survivor Benefit Pension",
    description: "",
    incomePeriod: "Annual",
    amount: "13000",
    currentSource: "No",
    startDate: dayjs("2020-10-30"),
    endDate: dayjs("2024-10-30"),
  };

  const handleFinish = (values) => {
    console.log("Additional income saved:", values);
    // setEditable(false);
    handleCalcelButton();
  };

  const handleAddButton = () => {
    setEditable(true);
    setShow(true);
  };

  const handleCalcelButton = () => {
    setShow(false);
    setEditable(false);
  };
  const footer = editable ? (
    <>
      {show && (
        <>
          <Button onClick={handleCalcelButton}>Cancel</Button>
          <Button
            type="primary"
            htmlType="submit"
            className="bg-orange-500 border-none hover:bg-orange-600"
          >
            Save
          </Button>
        </>
      )}
    </>
  ) : (
    <>
      {show && (
        <Button disabled={false} onClick={() => setEditable(true)}>
          Edit
        </Button>
      )}
    </>
  );

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={handleFinish}
      disabled={!editable}
    >
      <AccordionSection
        title="Linus’s additional income details"
        subtitle="Total Income: - | Total Amount: $ 0/annually"
        footer={footer}
      >
        <div className="mb-5">
          <AssetTable></AssetTable>

         
        </div>
         <div>
            {!show ? (
              <Button disabled={false} onClick={handleAddButton}>
                + Assets
              </Button>
            ) : (
              <Row gutter={16}>
                {AssetsFields.map((field) => (
                  <Col span={6} key={field.name}>
                    <Form.Item
                      name={field.name}
                      label={field.label}
                      rules={
                        field.required
                          ? [
                              {
                                required: true,
                                message: `${field.label} is required`,
                              },
                            ]
                          : []
                      }
                    >
                      {editable ? (
                        renderField(field)
                      ) : (
                        <Text>
                          {renderValue(field, form.getFieldValue(field.name))}
                        </Text>
                      )}
                    </Form.Item>
                  </Col>
                ))}
              </Row>
            )}
          </div>
      </AccordionSection>
    </Form>
  );
}

function renderField(field) {
  switch (field.type) {
    case "select":
      return (
        <Select
          mode={field.mode}
          maxTagCount={field.maxTagCount}
          placeholder={`Select ${field.label}`}
        >
          {field.options.map((opt) => (
            <Option key={opt} value={opt}>
              {opt}
            </Option>
          ))}
        </Select>
      );
    case "date":
      return <DatePicker className="w-full" />;
    case "currency":
      return <Input prefix="$" type="number" placeholder="Enter amount" />;
    default:
      return <Input placeholder={`Enter ${field.label}`} />;
  }
}

function renderValue(field, value) {
  if (field.type === "date" && value)
    return dayjs(value).format("MMMM D, YYYY");
  if (field.type === "currency") return `$ ${value}`;
  return value || "-";
}
