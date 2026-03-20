export interface Database {
  public: {
    Tables: {
      customers: {
        Row: Customer;
        Insert: CustomerInsert;
        Update: Partial<CustomerInsert>;
      };
      menu_items: {
        Row: DbMenuItem;
        Insert: DbMenuItemInsert;
        Update: Partial<DbMenuItemInsert>;
      };
      orders: {
        Row: Order;
        Insert: OrderInsert;
        Update: Partial<OrderInsert>;
      };
      order_items: {
        Row: OrderItem;
        Insert: OrderItemInsert;
        Update: Partial<OrderItemInsert>;
      };
    };
  };
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  created_at: string;
}

export interface CustomerInsert {
  id?: string;
  name: string;
  phone: string;
  created_at?: string;
}

export interface DbMenuItem {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  image_url: string | null;
  is_available: boolean;
  is_veg: boolean;
  sort_order: number;
  created_at: string;
}

export interface DbMenuItemInsert {
  id?: string;
  name: string;
  description?: string | null;
  price: number;
  category: string;
  image_url?: string | null;
  is_available?: boolean;
  is_veg?: boolean;
  sort_order?: number;
  created_at?: string;
}

export type OrderStatus =
  | "received"
  | "preparing"
  | "ready"
  | "picked_up"
  | "cancelled";

export interface Order {
  id: string;
  order_number: number;
  customer_id: string;
  customer_name: string;
  customer_phone: string;
  status: OrderStatus;
  total_amount: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderInsert {
  id?: string;
  customer_id: string;
  customer_name: string;
  customer_phone: string;
  status?: OrderStatus;
  total_amount: number;
  notes?: string | null;
}

export interface OrderItem {
  id: string;
  order_id: string;
  menu_item_id: string;
  item_name: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

export interface OrderItemInsert {
  id?: string;
  order_id: string;
  menu_item_id: string;
  item_name: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

export interface OrderWithItems extends Order {
  order_items: OrderItem[];
}

export interface CustomerWithStats extends Customer {
  total_orders: number;
  total_spent: number;
  last_order_date: string | null;
}
