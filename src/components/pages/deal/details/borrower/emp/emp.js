'use client';

import { useState } from 'react';
import { Form, Input, Select, DatePicker, Button, Row, Col, Typography } from 'antd';

import dayjs from 'dayjs';
import AccordionSection from '@/components/resuable/accordion';

const { Option } = Select;
const { Text } = Typography;

const employmentFields = [
  { name: 'incomeSource', label: 'Income Source', type: 'select', required: true, options: ['Employed', 'Self-Employed'] },
  { name: 'employerName', label: 'Employer Name', type: 'text', required: true },
  { name: 'country', label: 'Country', type: 'select', required: true, options: ['Canada'] },
  { name: 'addressLookup', label: 'Address Lookup', type: 'search' },
  { name: 'addressLine1', label: 'Address Line 1', type: 'text' },
  { name: 'addressLine2', label: 'Address Line 2', type: 'text' },
  { name: 'city', label: 'City', type: 'text' },
  { name: 'province', label: 'Province', type: 'text' },
  { name: 'postalCode', label: 'Postal Code', type: 'text' },
  { name: 'businessNumber', label: 'Business Number', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'employmentType', label: 'Employment Type', type: 'select', options: ['Full time', 'Part time', 'Contract'] },
  { name: 'jobTitle', label: 'Job Title', type: 'text' },
  { name: 'occupation', label: 'Occupation', type: 'select', options: ['Management', 'IT', 'Sales'] },
  { name: 'industryType', label: 'Industry Type', type: 'select', options: ['Construction', 'Finance', 'Retail'] },
  { name: 'earnedIncomeType', label: 'Earned Income Type', type: 'select', options: ['Salary', 'Hourly'] },
  { name: 'bonusOvertime', label: 'Bonus/Overtime/Commissions', type: 'select', options: ['Yes', 'No'] },
  { name: 'paymentFrequency', label: 'Payment Frequency', type: 'select', required: true, options: ['Weekly', 'Bi-Weekly', 'Monthly'] },
  { name: 'incomeAmount', label: 'Income Amount', type: 'currency' },
  { name: 'startDate', label: 'Start Date', type: 'date', required: true },
  { name: 'endDate', label: 'End Date', type: 'date' },
  { name: 'timeAtJob', label: 'Time at Job', type: 'custom' },
];

export default function EmploymentAccordionForm() {
  const [form] = Form.useForm();
  const [editable, setEditable] = useState(false);

  const initialValues = {
    incomeSource: 'Employed',
    employerName: 'KGZ Construction',
    country: 'Canada',
    addressLookup: '481 University Ave #300',
    addressLine1: 'University Ave #300',
    addressLine2: '',
    city: 'Toronto',
    province: 'On',
    postalCode: 'M6J 3G3',
    businessNumber: '416-727-2593',
    email: 'info.kgz@email.com',
    employmentType: 'Full time',
    jobTitle: '',
    occupation: 'Management',
    industryType: 'Construction',
    earnedIncomeType: 'Salary',
    bonusOvertime: '',
    paymentFrequency: 'Monthly',
    incomeAmount: '7481',
    startDate: dayjs('2004-10-30'),
    endDate: null,
    timeAtJobYear: '20',
    timeAtJobMonth: '1',
  };

  const handleFinish = (values) => {
    console.log('Employment saved:', values);
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
      <AccordionSection title="Linus's employment details" subtitle="Annual Income: $0/annually" footer={footer}>
        <Row gutter={16}>
          {employmentFields.map((field) => (
            <Col span={6} key={field.name}>
              <Form.Item
                name={field.name}
                label={field.label}
                rules={field.required ? [{ required: true, message: `${field.label} is required` }] : []}
              >
                {editable ? renderFormInput(field, form) : (
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

function renderFormInput(field, form) {
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
    case 'search':
      return <Input.Search placeholder="Enter address" />;
    case 'email':
      return <Input type="email" placeholder="Enter email" />;
    case 'currency':
      return <Input prefix="$" type="number" placeholder="Enter amount" />;
    case 'custom':
      return (
        <Input.Group compact>
          <Form.Item name="timeAtJobYear" noStyle>
            <Input placeholder="Year" style={{ width: '50%' }} />
          </Form.Item>
          <Form.Item name="timeAtJobMonth" noStyle>
            <Input placeholder="Month" style={{ width: '50%' }} />
          </Form.Item>
        </Input.Group>
      );
    default:
      return <Input placeholder={`Enter ${field.label}`} />;
  }
}

function renderValue(field, value) {
  if (field.type === 'date' && value) return dayjs(value).format('MMMM D, YYYY');
  if (field.name === 'incomeAmount') return `$ ${value}`;
  if (field.name === 'timeAtJob') {
    return `${field.getFieldValue('timeAtJobYear')} Year ${field.getFieldValue('timeAtJobMonth')} Month`;
  }
  return value || '-';
}
