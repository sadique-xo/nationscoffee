-- Allow anon to update customers (needed for upsert by phone)
CREATE POLICY "Anyone can update a customer"
  ON customers FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Allow anon/admin to update orders (needed for status changes)
CREATE POLICY "Anyone can update orders"
  ON orders FOR UPDATE
  USING (true)
  WITH CHECK (true);
