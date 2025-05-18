import DynamicEditableTable from "@/components/basiclayout/BasicTable";


const assetColumns = [
  { title: 'Owners', dataIndex: 'owner', inputType: 'text', required: true },
  { title: 'Asset Type', dataIndex: 'type', inputType: 'select', required: true, options: ['Savings', 'Real Estate', 'Vehicle'] },
  { title: 'Asset Description', dataIndex: 'description', inputType: 'text' },
  { title: 'Asset Value', dataIndex: 'value', inputType: 'number', required: true },
  { title: 'Down Payment', dataIndex: 'downPayment', inputType: 'number' },
];

export default function AssetTable() {
  return (
    <DynamicEditableTable
      title="Assets"
      addLabel="Asset"
      columnsConfig={assetColumns}
      dataKey="id"
      initialData={[
        { id: '1', owner: 'Linus Sebastian', type: 'Savings', value: 13000 },
           { id: '2', owner: 'Linus', type: 'Savings', value: 5455 },
           { id: '3', owner: 'Sebastian', type: 'Sebastian', value: 540055 }
      ]}
    />
  );
}
