-- Settings table for app-level configuration
CREATE TABLE settings (
  key text PRIMARY KEY,
  value text NOT NULL,
  updated_at timestamptz DEFAULT now()
);

-- RLS
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Anyone can read settings (needed for customer app to check if orders are enabled)
CREATE POLICY "Anyone can read settings"
  ON settings FOR SELECT
  USING (true);

-- Insert default setting
INSERT INTO settings (key, value) VALUES ('orders_enabled', 'true');
