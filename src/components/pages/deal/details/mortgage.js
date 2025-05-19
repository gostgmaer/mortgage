'use client';

import { useState } from 'react';
import { Form, Input, Select, DatePicker, Button, Row, Col, Typography, Tooltip } from 'antd';
import dayjs from 'dayjs';
import AccordionSection from '@/components/resuable/accordion';
import { InfoCircleOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Text, Title } = Typography;

const formConfig =[
  { name: 'propertyValue', label: 'Property Value', type: 'text', required: true },
  { name: 'downPayment', label: 'Down Payment', type: 'text', required: true },
  { name: 'downPaymentPercent', label: 'Down Payment %', type: 'text', required: true },
  { name: 'mortgageAmount', label: 'Mortgage Amount', type: 'text', required: true },
  { name: 'mortgageType', label: 'Mortgage Type', type: 'select', options: ['First'], required: true },
  { name: 'premiumRateOverride', label: 'Premium Rate Override', type: 'select', options: ['Yes', 'No'] },
  { name: 'premiumRate', label: 'Premium Rate', type: 'text' },
  { name: 'mtgInsPremium', label: 'Mtg Ins Premium', type: 'text' },
  { name: 'includeInMortgage', label: 'Include in Mortgage', type: 'select', options: ['Yes', 'No'] },
  { name: 'lineOfBusiness', label: 'Line of Business', type: 'select', options: ['Private'] },
  { name: 'interestRate', label: 'Interest Rate', type: 'text' },
  { name: 'rateType', label: 'Rate Type', type: 'select', options: ['Variable'] },
  { name: 'paymentSchedule', label: 'Payment Schedule', type: 'select', options: ['Interest Only'] },
  { name: 'termYear', label: 'Term (Year)', type: 'text' },
  { name: 'termMonth', label: 'Term (Month)', type: 'text' },
  { name: 'amortizationYear', label: 'Amortization (Year)', type: 'text' },
  { name: 'amortizationMonth', label: 'Amortization (Month)', type: 'text' },
  { name: 'frequency', label: 'Frequency', type: 'select', options: ['Accelerated weekly'] },
  { name: 'compoundedPeriod', label: 'Compounded Period', type: 'select', options: ['Monthly'] },
  { name: 'termType', label: 'Term Type', type: 'select', options: ['Convertible'] },

  // Qualifying Details
  { name: 'qualInterestRate', label: 'Interest Rate (Qual)', type: 'text' },
  { name: 'qualPaymentSchedule', label: 'Payment Schedule (Qual)', type: 'select', options: ['Interest Only'] },
  { name: 'qualAmortizationYear', label: 'Amortization (Year) Qual', type: 'text' },
  { name: 'qualAmortizationMonth', label: 'Amortization (Month) Qual', type: 'text' },
  { name: 'qualCompoundedPeriod', label: 'Compounded Period (Qual)', type: 'select', options: ['Monthly'] },
  { name: 'conditionOfFinancing', label: 'Condition of Financing', type: 'date' },
  { name: 'interestAdjDate', label: 'Interest Adj. Date', type: 'date' },
  { name: 'interestAdjAmount', label: 'Interest Adj. Amount', type: 'text' },
  { name: 'firstPaymentDate', label: 'First Payment Date', type: 'date' },
  { name: 'maturityDate', label: 'Maturity Date', type: 'date' },
  { name: 'lender', label: 'Lender', type: 'text' },
];

export default function MortgageAccordionForm() {
  const [form] = Form.useForm();
  const [editable, setEditable] = useState(true);

  const handleFinish = (values) => {
    console.log('Mortgage Form Values:', values);
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

  const summaryData = {
    totalLoanAmount: '$800,000',
    qualifyingMonthlyPayment: '$0',
    frequencyPayment: '$0',
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish} disabled={!editable}>
      {/* 🟢 Summary Section */}
      <div className="p-4 mb-6 border rounded bg-gray-50">
     
      </div>

      {/* 🟡 Accordion Form Section */}
      <AccordionSection
        title="Mortgage Information"
        subtitle="Mortgage form with full details"
        defaultActive={true}
        footer={footer}
      >
         <Row gutter={24} justify="space-between">
          {[
            { label: 'Total Loan Amount', value: summaryData.totalLoanAmount },
            { label: 'Qualifying Monthly Payment', value: summaryData.qualifyingMonthlyPayment },
            { label: 'Frequency Payment', value: summaryData.frequencyPayment },
          ].map((item) => (
            <Col span={8} key={item.label}>
              <div>
                <Text strong>
                  {item.label}{' '}
                  <Tooltip title={item.label}>
                    <InfoCircleOutlined />
                  </Tooltip>
                </Text>
                <Title level={3} style={{ color: '#A94442', marginBottom: 0 }}>
                  {item.value}
                </Title>
              </div>
            </Col>
          ))}
        </Row>
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
                    <DatePicker className="w-full" format="MM/DD/YYYY" />
                  ) : (
                    <Input placeholder={`Enter ${field.label}`} />
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
