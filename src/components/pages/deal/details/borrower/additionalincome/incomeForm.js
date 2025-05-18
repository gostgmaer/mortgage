'use client';

import { useState } from 'react';
import { Form, Input, Select, DatePicker, Button, Row, Col, Typography } from 'antd';
// import AccordionSection from './AccordionSection';
import dayjs from 'dayjs';
import AccordionSection from '@/components/resuable/accordion';
import AssetTable from '../../assets/table';

const { Option } = Select;
const { Text } = Typography;

const additionalIncomeFields = [
  { name: 'incomeType', label: 'Income Type', type: 'select', required: true, options: ['Survivor Benefit Pension', 'Rental Income', 'Investment'] },
  { name: 'description', label: 'Description', type: 'text', required: false },
  { name: 'incomePeriod', label: 'Income Period', type: 'select', required: true, options: ['Weekly', 'Monthly', 'Annual'] },
  { name: 'amount', label: 'Amount', type: 'currency', required: true },
  { name: 'currentSource', label: 'Is current source of income?', type: 'select', required: true, options: ['Yes', 'No'] },
  { name: 'startDate', label: 'Start Date', type: 'date', required: true },
  { name: 'endDate', label: 'End Date', type: 'date', required: true },
];

export default function AdditionalIncomeAccordionForm() {
  const [form] = Form.useForm();
  const [editable, setEditable] = useState(false);

  const initialValues = {
    incomeType: 'Survivor Benefit Pension',
    description: '',
    incomePeriod: 'Annual',
    amount: '13000',
    currentSource: 'No',
    startDate: dayjs('2020-10-30'),
    endDate: dayjs('2024-10-30'),
  };

  const handleFinish = (values) => {
    console.log('Additional income saved:', values);
    setEditable(false);
  };

  const footer = editable ? (
    <>
      <Button onClick={() => setEditable(false)}>Cancel</Button>
      <Button type="primary" htmlType="submit" className="bg-orange-500 border-none hover:bg-orange-600">
        Save
      </Button>
    </>
  ) : (
    <Button onClick={() => setEditable(true)}>Edit</Button>
  );

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={handleFinish}
      disabled={!editable}
    >
      <AccordionSection title="Linus’s additional income details" subtitle="Total Income: - | Total Amount: $ 0/annually" footer={footer}>

<div>
  <AssetTable></AssetTable>
</div>

        <Row gutter={16}>
          {additionalIncomeFields.map((field) => (
            <Col span={8} key={field.name}>
              <Form.Item
                name={field.name}
                label={field.label}
                rules={field.required ? [{ required: true, message: `${field.label} is required` }] : []}
              >
                {editable ? renderField(field) : (
                  <Text>{renderValue(field, form.getFieldValue(field.name))}</Text>
                )}
              </Form.Item>
            </Col>
          ))}
        </Row>
      </AccordionSection>
    </Form>
  );
}

function renderField(field) {
  switch (field.type) {
    case 'select':
      return (
        <Select placeholder={`Select ${field.label}`}>
          {field.options.map((opt) => (
            <Option key={opt} value={opt}>{opt}</Option>
          ))}
        </Select>
      );
    case 'date':
      return <DatePicker className="w-full" />;
    case 'currency':
      return <Input prefix="$" type="number" placeholder="Enter amount" />;
    default:
      return <Input placeholder={`Enter ${field.label}`} />;
  }
}

function renderValue(field, value) {
  if (field.type === 'date' && value) return dayjs(value).format('MMMM D, YYYY');
  if (field.type === 'currency') return `$ ${value}`;
  return value || '-';
}
