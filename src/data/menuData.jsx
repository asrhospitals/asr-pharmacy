import { 
  Home, 
  Book, 
  Package, 
  TrendingUp,
  ShoppingCart,
  BookMinus,

} from "lucide-react";

// Menu Configuration
export const menuConfig = {
  admin: [
    { 
      title: "Dashboard", 
      icon: Home, 
      path: "/dashboard" 
    },
    {
      title: "Master",
      icon: Book,
      children: [
        { 
          title: "Account Master", 
          path: "/master/Account",
          icon: BookMinus,
          children: [
            { title: "Ledger", path: "/master/accounts/ledger" },
            { title: "Group", path: "/master/accounts/group" },
            { title: "Sale", path: "/master/accounts/sale" },
            { title: "Purchase", path: "/master/accounts/purchase" },
           
          ]
        },
        { 
          title: "Inventory Master", 
          path: "/master/inventory",
          icon: Package,
          children: [
            { title: "Item", path: "/master/inventory/items" },
            { title: "Store", path: "/master/inventory/stores" },
            { title: "Rack", path: "/master/inventory/racks" },
            { title: "Company", path: "/master/inventory/companys" },
            { title: "Salt", path: "/master/inventory/salts" },
            { title: "HSN/SAC", path: "/master/inventory/sacs" },
            { title: "Unit", path: "/master/inventory/units" },
            { title: "Manufacturer", path: "/master/inventory/manufacturers" },
          ]
        },
        // { 
        //   title: "Rate Master", 
        //   path: "/master/rates",
        //   icon: Calculator,
        //   children: [
        //     { title: "Price List", path: "/master/rates/price-list" },
        //     { title: "Tax Rates", path: "/master/rates/tax-rates" },
        //     { title: "Currency Rates", path: "/master/rates/currency" },
        //     { title: "Discount Rates", path: "/master/rates/discount" },
        //   ]
        // }
      ]
    },
    {
      title: "Sale",
      icon: TrendingUp,
      children: [
        { title: "Bill", path: "/sales/bill" },
        { title: "Quotations", path: "/sales/quotations" },
        { title: "Counter Sale", path: "/sales/countersale" },
        { title: "Stock Issue", path: "/sales/stockissue" },
        { title: "Order", path: "/sales/orders" },
       
      ],
    },
    {
      title: "Purchase",
      icon: ShoppingCart,
      children: [

        { title: "Bill", path: "/purchase/bill" },
        { title: "Stock Receive", path: "/purchase/stockreceive" },
        { title: "Order", path: "/purchase/order" },
        { title: "Return", path: "/purchase/return" },
        { title: "Brk/Exp Issue", path: "/purchase/brkexp" },

      ],
    },
  ],
  
  user: [
    { title: "Dashboard", icon: Home, path: "/dashboard" },
    {
      title: "Sale",
      icon: TrendingUp,
      children: [
        { title: "Bill", path: "/sales/bill" },
        { title: "Quotations", path: "/sales/quotations" },
        { title: "Counter Sale", path: "/sales/countersale" },
        { title: "Stock Issue", path: "/sales/stockissue" },
        { title: "Order", path: "/sales/orders" },
       
      ],
    },

  ],
  
  manager: [
    { title: "Dashboard", icon: Home, path: "/dashboard" },

    {
      title: "Master",
      icon: Book,
      children: [
        { 
          title: "Inventory Master", 
          path: "/master/inventory",
          icon: Package,
          children: [
            { title: "Item", path: "/master/inventory/items" },
            { title: "Store", path: "/master/inventory/stores" },
            { title: "Rack", path: "/master/inventory/racks" },
            { title: "Company", path: "/master/inventory/companys" },
            { title: "Salt", path: "/master/inventory/salts" },
            { title: "HSN/SAC", path: "/master/inventory/sacs" },
            { title: "Unit", path: "/master/inventory/units" },
            { title: "Manufacturer", path: "/master/inventory/manufacturers" },
          ]
        },
      ]
    },
   
    {
      title: "Sale",
      icon: TrendingUp,
      children: [
        { title: "Bill", path: "/sales/bill" },
        { title: "Quotations", path: "/sales/quotations" },
        { title: "Counter Sale", path: "/sales/countersale" },
        { title: "Stock Issue", path: "/sales/stockissue" },
        { title: "Order", path: "/sales/orders" },
       
      ],
    },
    {
      title: "Purchase",
      icon: ShoppingCart,
      children: [

        { title: "Bill", path: "/purchase/bill" },
        { title: "Stock Receive", path: "/purchase/stockreceive" },
        { title: "Oder", path: "/purchase/order" },
        { title: "Return", path: "/purchase/return" },
        { title: "Brk/Exp Issue", path: "/purchase/brkexp" },

      ],
    },
  ],
};
