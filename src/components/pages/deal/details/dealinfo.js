'use client';

import { useState } from 'react';
import { Form, Input, Select, DatePicker, Button, Row, Col, Typography } from 'antd';

import dayjs from 'dayjs';
import AccordionSection from '@/components/resuable/accordion';

const { Option } = Select;
const { Text } = Typography;

const formConfig = [
  { name: 'dealOwner', label: 'Deal Owner', type: 'select', options: ['Krishnaveni Shanmugapandi'], required: true },
  { name: 'transactionType', label: 'Transaction Type', type: 'select', options: ['Purchase'], required: true },
  { name: 'applicationType', label: 'Application Type', type: 'select', options: ['Approval'], required: true },
  { name: 'closingDate', label: 'Closing Date', type: 'date', required: true },
  { name: 'loanAmount', label: 'Loan Amount', type: 'text',is_disable:true },
  { name: 'channelSource', label: 'Channel Source', type: 'select', options: ['Online', 'Referral'] },
  { name: 'channelCampaign', label: 'Channel Campaign', type: 'text' },
  { name: 'campaignTracker', label: 'Campaign Tracker', type: 'text' },
  { name: 'referral', label: 'Referral', type: 'text' },
  { name: 'commitmentNumber', label: 'Commitment Number', type: 'text' },
  { name: 'fimmoId', label: 'Fimmo ID', type: 'text' },
];

export default function DealAccordionForm() {
  const [form] = Form.useForm();
  const [editable, setEditable] = useState(true);

  const initialValues = {
    dealOwner: 'Krishnaveni Shanmugapandi',
    transactionType: 'Purchase',
    applicationType: 'Approval',
    closingDate: dayjs('2039-10-29'),
    loanAmount: '800000',
    channelSource: 'Online',
    channelCampaign: 'Summer2025',
    campaignTracker: 'CTR-1234',
    referral: 'John Doe',
    commitmentNumber: 'CMT-4567',
    fimmoId: 'FIM-8901',
  };

  const handleFinish = (values) => {
    console.log('Saved values:', values);
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
    <Button type="default" disabled={false} onClick={() => setEditable(true)}>
      Edit
    </Button>
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
        title="Krishnaveni Shanmugapandi"
        subtitle="October 29th, 2039 | $800,000 | Purchase"
        defaultActive={true}
        footer={footer}
      >
        <Row gutter={16}>
          {formConfig.map((field) => (
            <Col span={6} key={field.name}>
              <Form.Item
                name={field.name}
                label={field.label}
                rules={field.required ? [{ required: true, message: `${field.label} is required` }] : []}
              >
                {editable ? (
                  field.type === 'select' ? (
                    <Select placeholder={`Select ${field.label}`}>
                      {field.options.map((opt) => (
                        <Option value={opt} key={opt}>
                          {opt}
                        </Option>
                      ))}
                    </Select>
                  ) : field.type === 'date' ? (
                    <DatePicker className="w-full" format="YYYY-MM-DD" />
                  ) : (
                    <Input placeholder={`Enter ${field.label}`} disabled={field.is_disable} />
                  )
                ) : (
                  <Text>{renderDisplayValue(field, form.getFieldValue(field.name))}</Text>
                )}
              </Form.Item>
            </Col>
          ))}
        </Row>
      </AccordionSection>
    </Form>
  );
}

function renderDisplayValue(field, value) {
  if (field.type === 'date' && value) {
    return dayjs(value).format('MMM D, YYYY');
  }
  return value || '-';
}
