// Product Entity
export interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    category: string;
    sku: string;
    expiryDate?: string;
    manufacturer?: string;
    description?: string;
    isRx?: boolean; // Рецептурный препарат
  }
  
  // Order Entity
  export interface CartItem extends Product {
    quantity: number;
  }
  
  export interface Order {
    id: number;
    items: CartItem[];
    total: number;
    date: string;
    employeeId: number;
    paymentMethod: 'cash' | 'card' | 'insurance';
    status: 'completed' | 'returned' | 'canceled';
  }
  
  // Supplier Entity
  export interface Supplier {
    id: number;
    name: string;
    contactPerson: string;
    phone: string;
    email: string;
    address: string;
  }
  
  // Supply Entity
  export interface SupplyItem {
    productId: number;
    productName: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }
  
  export interface Supply {
    id: string;
    supplier: Supplier;
    orderDate: string;
    expectedDate: string;
    status: 'pending' | 'received' | 'canceled';
    items: SupplyItem[];
    total: number;
  }
  
  // Stocktaking Entity
  export interface StocktakingItem {
    productId: number;
    productName: string;
    systemQuantity: number;
    actualQuantity: number;
    difference: number;
    status: 'matched' | 'discrepancy' | 'unchecked';
  }
  
  export interface Stocktaking {
    id: number;
    date: string;
    employeeId: number;
    status: 'draft' | 'in-progress' | 'completed';
    items: StocktakingItem[];
    totalItems: number;
    checkedItems: number;
    discrepancies: number;
  }
  
  // Report Entity
  export interface SalesReport {
    period: 'daily' | 'weekly' | 'monthly' | 'yearly';
    startDate: string;
    endDate: string;
    totalSales: number;
    orderCount: number;
    averageOrderValue: number;
    topProducts: Array<{
      productId: number;
      productName: string;
      quantity: number;
      revenue: number;
    }>;
  }
  
  export interface InventoryReport {
    date: string;
    totalProducts: number;
    lowStockProducts: Array<{
      productId: number;
      productName: string;
      currentStock: number;
      reorderLevel: number;
    }>;
    expiringProducts: Array<{
      productId: number;
      productName: string;
      expiryDate: string;
      currentStock: number;
    }>;
  }