// components/RepeatableBlock.js
import React, { useState } from 'react';
import { Button, Row, Col, Space, message } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const generateId = () => Date.now() + Math.random();

const RepeatableBlock = ({
  children,                 // (data, index, onChange) => JSX
  onChange,                 // Callback on value change
  onAdd,                    // Optional callback on add
  onDelete,                 // Optional callback on delete
  initialData = [{}],       // Array of initial row values
  min = 1,
  max = Infinity,
  addButtonText = "Add Block",
}) => {
  const [blocks, setBlocks] = useState(
    initialData.map((item) => ({ id: generateId(), data: item }))
  );

  const handleAdd = () => {
    if (blocks.length >= max) {
      message.warning(`Maximum of ${max} blocks reached`);
      return;
    }
    const newBlock = { id: generateId(), data: {} };
    const updated = [...blocks, newBlock];
    setBlocks(updated);
    onChange?.(updated.map((b) => b.data));
    onAdd?.(newBlock.data, updated.length - 1);
  };

  const handleDelete = (id, index) => {
    if (blocks.length <= min) {
      message.warning(`At least ${min} block(s) required`);
      return;
    }
    const updated = blocks.filter((b) => b.id !== id);
    setBlocks(updated);
    onChange?.(updated.map((b) => b.data));
    onDelete?.(index, id);
  };

  const handleFieldChange = (index, field, value) => {
    const updatedBlocks = [...blocks];
    updatedBlocks[index].data = {
      ...updatedBlocks[index].data,
      [field]: value,
    };
    setBlocks(updatedBlocks);
    onChange?.(updatedBlocks.map((b) => b.data));
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      {blocks.map((block, index) => (
        <div
          key={block.id}
          style={{
            border: '1px solid #f0f0f0',
            borderRadius: 8,
            padding: 16,
          }}
        >
          <Row justify="space-between" align="middle">
            <Col flex="auto">
              {children(block.data, index, (field, value) =>
                handleFieldChange(index, field, value)
              )}
            </Col>
            <Col>
              <Button
                icon={<DeleteOutlined />}
                danger
                type="text"
                onClick={() => handleDelete(block.id, index)}
              />
            </Col>
          </Row>
        </div>
      ))}
      <Button
        type="dashed"
        icon={<PlusOutlined />}
        onClick={handleAdd}
        block
      >
        {addButtonText}
      </Button>
    </Space>
  );
};

export default RepeatableBlock;
