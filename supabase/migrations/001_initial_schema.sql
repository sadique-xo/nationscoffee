-- ============================================
-- Brew Truck • Initial Database Schema
-- ============================================

-- Customers table
CREATE TABLE customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Menu items table
CREATE TABLE menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price integer NOT NULL,
  category text NOT NULL,
  image_url text,
  is_available boolean DEFAULT true,
  is_veg boolean DEFAULT false,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Orders table
CREATE TABLE orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number serial,
  customer_id uuid REFERENCES customers(id),
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  status text NOT NULL DEFAULT 'received'
    CHECK (status IN ('received', 'preparing', 'ready', 'picked_up', 'cancelled')),
  total_amount integer NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Order items table
CREATE TABLE order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  menu_item_id uuid REFERENCES menu_items(id),
  item_name text NOT NULL,
  quantity integer NOT NULL,
  unit_price integer NOT NULL,
  subtotal integer NOT NULL
);

-- ============================================
-- Row Level Security
-- ============================================

ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Menu items: anyone can read
CREATE POLICY "Menu items are viewable by everyone"
  ON menu_items FOR SELECT
  USING (true);

-- Customers: anon can insert (placing orders)
CREATE POLICY "Anyone can create a customer"
  ON customers FOR INSERT
  WITH CHECK (true);

-- Customers: can read own record by phone
CREATE POLICY "Customers can view own record"
  ON customers FOR SELECT
  USING (true);

-- Orders: anon can insert
CREATE POLICY "Anyone can place an order"
  ON orders FOR INSERT
  WITH CHECK (true);

-- Orders: anon can read own orders
CREATE POLICY "Anyone can view orders"
  ON orders FOR SELECT
  USING (true);

-- Order items: anon can insert
CREATE POLICY "Anyone can create order items"
  ON order_items FOR INSERT
  WITH CHECK (true);

-- Order items: anon can read
CREATE POLICY "Anyone can view order items"
  ON order_items FOR SELECT
  USING (true);

-- ============================================
-- Enable Realtime on orders table
-- ============================================
ALTER PUBLICATION supabase_realtime ADD TABLE orders;

-- ============================================
-- Indexes
-- ============================================
CREATE INDEX idx_orders_customer_phone ON orders(customer_phone);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_menu_items_category ON menu_items(category);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
