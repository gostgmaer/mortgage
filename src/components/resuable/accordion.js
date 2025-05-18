'use client';

import { Collapse, Typography } from 'antd';
import { useState } from 'react';

const { Panel } = Collapse;
const { Title, Text } = Typography;

export default function AccordionSection({
  title,
  subtitle,
  children,
  defaultActive = true,
  extraRightLabel = true,
  footer = null, // footer inside panel
}) {
  const [activeKey, setActiveKey] = useState(defaultActive ? ['1'] : []);

  return (
    <div className="w-full border rounded-md shadow-sm">
      <Collapse
        activeKey={activeKey}
        onChange={(key) => setActiveKey(key)}
         expandIcon={({ isActive }) => <span> {isActive?'- Collapse' : '+ Expand'}</span>}
        expandIconPosition="end"
        bordered={false}
        className="bg-white"
      >
        <Panel
          key="1"
          header={
            <div className="flex justify-between items-center pr-4 w-full">
              <div>
                <Title level={5} className="m-0">{title} | {subtitle}</Title>
                {/* <Text type="secondary">{subtitle}</Text> */}
              </div>
             
            </div>
          }
        >
          <div className="px-4">
            {children}

            {/* Footer inside panel */}
            {footer && (
              <div className="flex justify-end gap-3 pt-6 border-t mt-6">
                {footer}
              </div>
            )}
          </div>
        </Panel>
      </Collapse>
    </div>
  );
}
