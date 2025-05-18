'use client';

import { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, InputNumber, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

export default function DynamicEditableTable({ title, columnsConfig, dataKey = 'id', initialData = [], addLabel = 'Add' }) {
  const [data, setData] = useState(initialData);
  const [editingRecord, setEditingRecord] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();

  const openModal = (record = null) => {
    setEditingRecord(record);
    setModalOpen(true);
    form.setFieldsValue(record || {});
  };

  const handleDelete = (key) => {
    setData(data.filter(item => item[dataKey] !== key));
  };

  const handleSave = () => {
    form.validateFields().then(values => {
      if (editingRecord) {
        // Edit
        setData(data.map(item => item[dataKey] === editingRecord[dataKey] ? { ...item, ...values } : item));
      } else {
        // Add
        const newItem = { ...values, [dataKey]: Date.now().toString() };
        setData([...data, newItem]);
      }
      setModalOpen(false);
      setEditingRecord(null);
      form.resetFields();
    });
  };

  const tableColumns = [
    ...columnsConfig.map(col => ({
      ...col,
      sorter: col.sorter ?? ((a, b) => (a[col.dataIndex] || '').localeCompare(b[col.dataIndex] || '')),
    })),
    {
      title: '',
      render: (_, record) => (
        <>
          <EditOutlined onClick={() => openModal(record)} style={{ marginRight: 16, color: '#1677ff' }} />
          <Popconfirm title="Delete this record?" onConfirm={() => handleDelete(record[dataKey])}>
            <DeleteOutlined style={{ color: 'red' }} />
          </Popconfirm>
        </>
      ),
      width: 80,
    }
  ];

  return (
    <>
      <Table
        columns={tableColumns}
        dataSource={data}
        rowKey={dataKey}
        pagination={false}
        // title={() => (
        //   <div className="flex justify-between items-center">
        //     <span className="font-semibold">{title}</span>
        //     <Button type="link" icon={<PlusOutlined />} onClick={() => openModal()}>{`+ ${addLabel}`}</Button>
        //   </div>
        // )}
      />

      <Modal
        title={editingRecord ? 'Edit Record' : `Add ${addLabel}`}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={handleSave}
        okText="Save"
      >
        <Form form={form} layout="vertical">
          {columnsConfig.map(field => (
            <Form.Item
              key={field.dataIndex}
              name={field.dataIndex}
              label={field.title}
              rules={field.required ? [{ required: true, message: `${field.title} is required` }] : []}
            >
              {field.inputType === 'select' ? (
                <Select placeholder={`Select ${field.title}`}>
                  {field.options?.map(opt => <Select.Option key={opt} value={opt}>{opt}</Select.Option>)}
                </Select>
              ) : field.inputType === 'number' ? (
                <InputNumber style={{ width: '100%' }} />
              ) : (
                <Input />
              )}
            </Form.Item>
          ))}
        </Form>
      </Modal>
    </>
  );
}
