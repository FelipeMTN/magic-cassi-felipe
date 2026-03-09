-- Tabela de configurações do usuário
CREATE TABLE IF NOT EXISTS user_settings (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL DEFAULT 'Usuário',
  target_date DATE NOT NULL,
  target_patrimony DECIMAL(15,2) NOT NULL,
  monthly_income DECIMAL(15,2) NOT NULL DEFAULT 0,
  current_patrimony DECIMAL(15,2) NOT NULL DEFAULT 0,
  expected_return_rate DECIMAL(5,4) NOT NULL DEFAULT 0.10,
  inflation_rate DECIMAL(5,4) NOT NULL DEFAULT 0.045,
  emergency_fund_months INTEGER NOT NULL DEFAULT 6,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de finanças mensais do usuário
CREATE TABLE IF NOT EXISTS user_finances (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  month DATE NOT NULL,
  income DECIMAL(15,2) NOT NULL DEFAULT 0,
  fixed_expenses DECIMAL(15,2) NOT NULL DEFAULT 0,
  variable_expenses DECIMAL(15,2) NOT NULL DEFAULT 0,
  investments DECIMAL(15,2) NOT NULL DEFAULT 0,
  patrimony_snapshot DECIMAL(15,2) NOT NULL DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, month)
);

-- Tabela de aportes mensais
CREATE TABLE IF NOT EXISTS monthly_contributions (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  month DATE NOT NULL,
  planned_amount DECIMAL(15,2) NOT NULL DEFAULT 0,
  actual_amount DECIMAL(15,2) NOT NULL DEFAULT 0,
  asset_type TEXT NOT NULL DEFAULT 'geral',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, month, asset_type)
);

-- Tabela de metas do usuário
CREATE TABLE IF NOT EXISTS user_goals (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  target_amount DECIMAL(15,2) NOT NULL,
  current_amount DECIMAL(15,2) NOT NULL DEFAULT 0,
  target_date DATE,
  priority INTEGER NOT NULL DEFAULT 1,
  category TEXT NOT NULL DEFAULT 'geral',
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de ativos/investimentos
CREATE TABLE IF NOT EXISTS user_assets (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  ticker TEXT,
  asset_type TEXT NOT NULL,
  quantity DECIMAL(15,6) NOT NULL DEFAULT 0,
  average_price DECIMAL(15,2) NOT NULL DEFAULT 0,
  current_price DECIMAL(15,2) NOT NULL DEFAULT 0,
  dividend_yield DECIMAL(5,4) DEFAULT 0,
  last_dividend DECIMAL(15,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de histórico de dividendos
CREATE TABLE IF NOT EXISTS dividend_history (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  asset_id INTEGER REFERENCES user_assets(id) ON DELETE CASCADE,
  amount DECIMAL(15,2) NOT NULL,
  payment_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_user_finances_user_month ON user_finances(user_id, month);
CREATE INDEX IF NOT EXISTS idx_monthly_contributions_user_month ON monthly_contributions(user_id, month);
CREATE INDEX IF NOT EXISTS idx_user_goals_user_status ON user_goals(user_id, status);
CREATE INDEX IF NOT EXISTS idx_user_assets_user ON user_assets(user_id);
CREATE INDEX IF NOT EXISTS idx_dividend_history_user ON dividend_history(user_id);
