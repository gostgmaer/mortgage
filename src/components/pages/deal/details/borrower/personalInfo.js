'use client';

import { useState } from 'react';
import { Form, Input, Select, DatePicker, Button, Row, Col, Typography } from 'antd';

import dayjs from 'dayjs';
import AccordionSection from '@/components/resuable/accordion';

const { Option } = Select;
const { Text } = Typography;

const formFields = [
  { name: 'firstName', label: 'First Name', type: 'text', required: true },
  { name: 'preferredName', label: 'Preferred Name', type: 'text' },
  { name: 'middleName', label: 'Middle Name', type: 'text' },
  { name: 'lastName', label: 'Last Name', type: 'text', required: true },
  { name: 'loginEmail', label: 'Login Email', type: 'text', required: true, disable:true },
  { name: 'communicationEmail', label: 'Communication Email', type: 'text' },
  { name: 'phone', label: 'Phone', type: 'text', required: true },
  { name: 'workPhone', label: 'Work Phone', type: 'text' },
  { name: 'dob', label: 'Date of Birth', type: 'date' },
  { name: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Other'] },
  { name: 'maritalStatus', label: 'Marital Status', type: 'select', options: ['Single', 'Married', 'Divorced'] },
  { name: 'dependents', label: 'Dependents', type: 'text' },
  { name: 'sin', label: 'SIN', type: 'text' },
  { name: 'language', label: 'Language Preference', type: 'select', options: ['English', 'French'], required: true },
  { name: 'firstTimeBuyer', label: 'First Time Buyer', type: 'select', options: ['Yes', 'No'] },
];

export default function PersonalInfoAccordionForm() {
  const [form] = Form.useForm();
  const [editable, setEditable] = useState(false);

  const initialValues = {
    firstName: 'Linus',
    preferredName: '',
    middleName: '',
    lastName: 'Sebastian',
    loginEmail: 'lin.seb@email.com',
    communicationEmail: '',
    phone: '450-210-9067',
    workPhone: '',
    dob: null,
    gender: '',
    maritalStatus: 'Married',
    dependents: 'lin.seb@email.com',
    sin: '',
    language: 'English',
    firstTimeBuyer: 'Yes',
  };

  const handleFinish = (values) => {
    console.log('Saved:', values);
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
      <AccordionSection
        title="Linus Sebastian"
        subtitle="lin.seb@email.com | 450-210-9067"
        footer={footer}
      >
        <Row gutter={16}>
          {formFields.map((field) => (
            <Col span={6} key={field.name}>
              <Form.Item
                name={field.name}
                label={field.label}
                rules={field.required ? [{ required: true, message: `${field.label} is required` }] : []}
              >
                {editable ? renderFormInput(field) : <Text>{renderValue(field, form.getFieldValue(field.name))}</Text>}
              </Form.Item>
            </Col>
          ))}
        </Row>
      </AccordionSection>
    </Form>
  );
}

function renderFormInput(field) {
  switch (field.type) {
    case 'select':
      return (
        <Select placeholder={`Select ${field.label}`}>
          {field.options.map((opt) => (
            <Option key={opt} value={opt}>
              {opt}
            </Option>
          ))}
        </Select>
      );
    case 'date':
      return <DatePicker className="w-full" />;
    default:
      return <Input placeholder={`Enter ${field.label}`} />;
  }
}

function renderValue(field, value) {
  if (field.type === 'date' && value) return dayjs(value).format('MMM D, YYYY');
  return value || '-';
}
