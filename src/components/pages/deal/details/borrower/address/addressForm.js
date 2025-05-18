'use client';

import { useState } from 'react';
import { Form, Input, Select, DatePicker, Button, Row, Col, Typography } from 'antd';
// import AccordionSection from './AccordionSection';
import dayjs from 'dayjs';
import AccordionSection from '@/components/resuable/accordion';

const { Option } = Select;
const { Text } = Typography;

const addressFields = [
  { name: 'country', label: 'Country', type: 'select', options: ['Canada'], required: true },
  { name: 'addressLookup', label: 'Address Lookup', type: 'search' },
  { name: 'unit', label: 'Unit', type: 'text' },
  { name: 'streetNumber', label: 'Street Number', type: 'text', required: true },
  { name: 'streetName', label: 'Street Name', type: 'text', required: true },
  { name: 'streetType', label: 'Street Type', type: 'select', options: ['Avenue', 'Street', 'Road'], required: true },
  { name: 'streetDirection', label: 'Street Direction', type: 'select', options: ['North', 'South', 'East', 'West'] },
  { name: 'city', label: 'City', type: 'text', required: true },
  { name: 'province', label: 'Province', type: 'select', options: ['On', 'BC', 'QC'], required: true },
  { name: 'postalCode', label: 'Postal Code', type: 'text', required: true },
  { name: 'moveInDate', label: 'Move In Date', type: 'date' },
  { name: 'moveOutDate', label: 'Move Out Date', type: 'date' },
  { name: 'timeAtResidenceYear', label: 'Time at Residence', type: 'custom' },
  { name: 'livingStatus', label: 'Living Status', type: 'select', options: ['Own', 'Rent', 'Other'] },
  { name: 'includeInTDS', label: 'Include in TDS calculations?', type: 'select', options: ['Yes', 'No'] },
];

export default function AddressAccordionForm() {
  const [form] = Form.useForm();
  const [editable, setEditable] = useState(false);

  const initialValues = {
    country: 'Canada',
    addressLookup: '',
    unit: '',
    streetNumber: '349',
    streetName: 'Lisgar Street',
    streetType: 'Avenue',
    streetDirection: '',
    city: 'Toronto',
    province: 'On',
    postalCode: 'M6J 3G3',
    moveInDate: dayjs('2024-10-30'),
    moveOutDate: null,
    timeAtResidenceYear: '0',
    timeAtResidenceMonth: '1',
    livingStatus: 'Other',
    includeInTDS: '',
  };

  const handleFinish = (values) => {
    console.log('Address saved:', values);
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
      <AccordionSection title="Address Information" subtitle="Lisgar Street, Toronto" footer={footer}>
        <Row gutter={16}>
          {addressFields.map((field) => (
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
    case 'custom':
      return (
        <Input.Group compact>
          <Form.Item name="timeAtResidenceYear" noStyle>
            <Input placeholder="Year" style={{ width: '50%' }} />
          </Form.Item>
          <Form.Item name="timeAtResidenceMonth" noStyle>
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
  if (field.name === 'timeAtResidenceYear') {
    return `${value || 0} Year ${field.form?.getFieldValue('timeAtResidenceMonth') || 0} Month`;
  }
  return value || '-';
}
