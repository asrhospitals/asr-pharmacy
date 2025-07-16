export const mockData = {
  items: [
    {
      id: 1,
      name: "Paracetamol 500mg",
      category: "Medicines",
      price: 5.5,
      stock: 1000,
      status: "Active",
    },
    {
      id: 2,
      name: "Vitamin D3",
      category: "Supplements",
      price: 25.0,
      stock: 500,
      status: "Active",
    },
    {
      id: 3,
      name: "Hand Sanitizer",
      category: "Healthcare",
      price: 12.0,
      stock: 200,
      status: "Active",
    },
  ],
  store: [
    { id: 1, name: "Main Store", status: "active" },
    { id: 2, name: "Scrap Store", status: "active" },
  ],
  rack: [
    { id: 1001, name: "Surgical", store: "Main Store" },
    { id: 1002, name: "Medicine", store: "Main Store" },
  ],
  invoices: [
    {
      id: "INV-001",
      customer: "Acme Corp",
      amount: "₹1,25,000",
      status: "paid",
      dueDate: "2024-12-20",
    },
    {
      id: "INV-002",
      customer: "Tech Solutions",
      amount: "₹85,000",
      status: "pending",
      dueDate: "2024-12-18",
    },
    {
      id: "INV-003",
      customer: "Global Industries",
      amount: "₹65,000",
      status: "overdue",
      dueDate: "2024-12-10",
    },
  ],
};
