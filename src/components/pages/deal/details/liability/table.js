import DynamicEditableTable from "@/components/basiclayout/BasicTable";

const assetColumns = [
  { title: "Owners", dataIndex: "owner", inputType: "text", required: true },
  {
    title: "Liability Type",
    dataIndex: "type",
    inputType: "select",
    required: true,
    options: ["Savings", "Real Estate", "Vehicle"],
  },
  { title: "Limit", dataIndex: "limit", inputType: "number", required: true },
  {
    title: "Balance",
    dataIndex: "balance",
    inputType: "number",
    required: true,
  },
  {
    title: "Payment",
    dataIndex: "payment",
    inputType: "number",
    required: true,
  },

  {
    title: "Liability Payoff",
    dataIndex: "liability_payoff",
    inputType: "text",
  },

  {
    title: "Liability Description",
    dataIndex: "liability_description",
    inputType: "text",
  },
];

export default function AssetTable() {
  return (
    <DynamicEditableTable
      title="Assets"
      addLabel="Asset"
      columnsConfig={assetColumns}
      dataKey="id"
      initialData={[
        {
          owner: ["John Doe", "Jane Doe"],
          type: "Savings",
          limit: 10000,
          balance: 7500,
          payment: 200,
          liability_payoff: "2026-12-31",
          liability_description: "Emergency savings account",
        },
        {
          owner: ["Jane Smith"],
          type: "Real Estate",
          limit: 250000,
          balance: 180000,
          payment: 1500,
          liability_payoff: "2035-06-15",
          liability_description: "Mortgage on primary residence",
        },
        {
          owner: ["Acme Corp", "John Doe"],
          type: "Vehicle",
          limit: 30000,
          balance: 10000,
          payment: 400,
          liability_payoff: "2027-03-01",
          liability_description: "Lease on company vehicle",
        },
        {
          owner: ["Emily Johnson", "Michael Brown"],
          type: "Savings",
          limit: 15000,
          balance: 12000,
          payment: 300,
          liability_payoff: "2025-08-20",
          liability_description: "Retirement savings",
        },
        {
          owner: ["Michael Brown"],
          type: "Real Estate",
          limit: 500000,
          balance: 350000,
          payment: 2200,
          liability_payoff: "2040-11-30",
          liability_description: "Vacation home mortgage",
        },
        {
          owner: ["Global Logistics", "Sarah Lee"],
          type: "Vehicle",
          limit: 45000,
          balance: 20000,
          payment: 500,
          liability_payoff: "2028-05-15",
          liability_description: "Fleet truck lease",
        },
        {
          owner: ["Sarah Lee"],
          type: "Savings",
          limit: 8000,
          balance: 4000,
          payment: 100,
          liability_payoff: "2024-12-01",
          liability_description: "College fund",
        },
        {
          owner: ["David Kim", "Anna Martinez"],
          type: "Real Estate",
          limit: 300000,
          balance: 270000,
          payment: 1800,
          liability_payoff: "2032-09-10",
          liability_description: "Investment property loan",
        },
        {
          owner: ["XYZ Inc."],
          type: "Vehicle",
          limit: 60000,
          balance: 35000,
          payment: 700,
          liability_payoff: "2029-07-25",
          liability_description: "Company car lease",
        },
        {
          owner: ["Anna Martinez"],
          type: "Savings",
          limit: 12000,
          balance: 9000,
          payment: 250,
          liability_payoff: "2025-04-18",
          liability_description: "Emergency fund",
        },
      ]}
    />
  );
}
