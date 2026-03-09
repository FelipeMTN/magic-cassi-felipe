import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

// Types
export interface UserSettings {
  id: string;
  user_id: string;
  monthly_income: number;
  monthly_expenses: number;
  emergency_fund_months: number;
  risk_profile: 'conservador' | 'moderado' | 'agressivo';
  inflation_rate: number;
  created_at: Date;
  updated_at: Date;
}

export interface UserFinance {
  id: string;
  user_id: string;
  total_invested: number;
  total_assets: number;
  emergency_fund: number;
  monthly_contribution: number;
  created_at: Date;
  updated_at: Date;
}

export interface MonthlyContribution {
  id: string;
  user_id: string;
  month: Date;
  planned_amount: number;
  actual_amount: number;
  notes: string | null;
  created_at: Date;
}

export interface UserGoal {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  target_value: number;
  current_value: number;
  target_date: Date;
  priority: number;
  category: string;
  status: 'ativa' | 'pausada' | 'concluida' | 'cancelada';
  monthly_contribution: number;
  created_at: Date;
  updated_at: Date;
}

export interface UserAsset {
  id: string;
  user_id: string;
  name: string;
  type: string;
  value: number;
  purchase_date: Date | null;
  expected_return: number;
  dividend_yield: number;
  notes: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface DividendHistory {
  id: string;
  asset_id: string;
  user_id: string;
  amount: number;
  payment_date: Date;
  created_at: Date;
}

// User Settings
export async function getUserSettings(userId: string): Promise<UserSettings | null> {
  const result = await sql`
    SELECT * FROM user_settings WHERE user_id = ${userId} LIMIT 1
  `;
  return result[0] as UserSettings | null;
}

export async function upsertUserSettings(
  userId: string,
  settings: Partial<Omit<UserSettings, 'id' | 'user_id' | 'created_at' | 'updated_at'>>
): Promise<UserSettings> {
  const result = await sql`
    INSERT INTO user_settings (user_id, monthly_income, monthly_expenses, emergency_fund_months, risk_profile, inflation_rate)
    VALUES (
      ${userId},
      ${settings.monthly_income ?? 0},
      ${settings.monthly_expenses ?? 0},
      ${settings.emergency_fund_months ?? 6},
      ${settings.risk_profile ?? 'moderado'},
      ${settings.inflation_rate ?? 0.045}
    )
    ON CONFLICT (user_id) DO UPDATE SET
      monthly_income = COALESCE(${settings.monthly_income}, user_settings.monthly_income),
      monthly_expenses = COALESCE(${settings.monthly_expenses}, user_settings.monthly_expenses),
      emergency_fund_months = COALESCE(${settings.emergency_fund_months}, user_settings.emergency_fund_months),
      risk_profile = COALESCE(${settings.risk_profile}, user_settings.risk_profile),
      inflation_rate = COALESCE(${settings.inflation_rate}, user_settings.inflation_rate),
      updated_at = NOW()
    RETURNING *
  `;
  return result[0] as UserSettings;
}

// User Finances
export async function getUserFinances(userId: string): Promise<UserFinance | null> {
  const result = await sql`
    SELECT * FROM user_finances WHERE user_id = ${userId} LIMIT 1
  `;
  return result[0] as UserFinance | null;
}

export async function upsertUserFinances(
  userId: string,
  finances: Partial<Omit<UserFinance, 'id' | 'user_id' | 'created_at' | 'updated_at'>>
): Promise<UserFinance> {
  const result = await sql`
    INSERT INTO user_finances (user_id, total_invested, total_assets, emergency_fund, monthly_contribution)
    VALUES (
      ${userId},
      ${finances.total_invested ?? 0},
      ${finances.total_assets ?? 0},
      ${finances.emergency_fund ?? 0},
      ${finances.monthly_contribution ?? 0}
    )
    ON CONFLICT (user_id) DO UPDATE SET
      total_invested = COALESCE(${finances.total_invested}, user_finances.total_invested),
      total_assets = COALESCE(${finances.total_assets}, user_finances.total_assets),
      emergency_fund = COALESCE(${finances.emergency_fund}, user_finances.emergency_fund),
      monthly_contribution = COALESCE(${finances.monthly_contribution}, user_finances.monthly_contribution),
      updated_at = NOW()
    RETURNING *
  `;
  return result[0] as UserFinance;
}

// Goals
export async function getUserGoals(userId: string): Promise<UserGoal[]> {
  const result = await sql`
    SELECT * FROM user_goals WHERE user_id = ${userId} ORDER BY priority ASC, created_at DESC
  `;
  return result as UserGoal[];
}

export async function getGoalById(goalId: string): Promise<UserGoal | null> {
  const result = await sql`
    SELECT * FROM user_goals WHERE id = ${goalId} LIMIT 1
  `;
  return result[0] as UserGoal | null;
}

export async function createGoal(
  userId: string,
  goal: Omit<UserGoal, 'id' | 'user_id' | 'created_at' | 'updated_at'>
): Promise<UserGoal> {
  const result = await sql`
    INSERT INTO user_goals (user_id, name, description, target_value, current_value, target_date, priority, category, status, monthly_contribution)
    VALUES (
      ${userId},
      ${goal.name},
      ${goal.description},
      ${goal.target_value},
      ${goal.current_value},
      ${goal.target_date},
      ${goal.priority},
      ${goal.category},
      ${goal.status},
      ${goal.monthly_contribution}
    )
    RETURNING *
  `;
  return result[0] as UserGoal;
}

export async function updateGoal(
  goalId: string,
  updates: Partial<Omit<UserGoal, 'id' | 'user_id' | 'created_at' | 'updated_at'>>
): Promise<UserGoal | null> {
  const result = await sql`
    UPDATE user_goals SET
      name = COALESCE(${updates.name}, name),
      description = COALESCE(${updates.description}, description),
      target_value = COALESCE(${updates.target_value}, target_value),
      current_value = COALESCE(${updates.current_value}, current_value),
      target_date = COALESCE(${updates.target_date}, target_date),
      priority = COALESCE(${updates.priority}, priority),
      category = COALESCE(${updates.category}, category),
      status = COALESCE(${updates.status}, status),
      monthly_contribution = COALESCE(${updates.monthly_contribution}, monthly_contribution),
      updated_at = NOW()
    WHERE id = ${goalId}
    RETURNING *
  `;
  return result[0] as UserGoal | null;
}

export async function deleteGoal(goalId: string): Promise<boolean> {
  const result = await sql`
    DELETE FROM user_goals WHERE id = ${goalId} RETURNING id
  `;
  return result.length > 0;
}

// Monthly Contributions
export async function getMonthlyContributions(userId: string, limit: number = 12): Promise<MonthlyContribution[]> {
  const result = await sql`
    SELECT * FROM monthly_contributions 
    WHERE user_id = ${userId} 
    ORDER BY month DESC 
    LIMIT ${limit}
  `;
  return result as MonthlyContribution[];
}

export async function addMonthlyContribution(
  userId: string,
  contribution: Omit<MonthlyContribution, 'id' | 'user_id' | 'created_at'>
): Promise<MonthlyContribution> {
  const result = await sql`
    INSERT INTO monthly_contributions (user_id, month, planned_amount, actual_amount, notes)
    VALUES (
      ${userId},
      ${contribution.month},
      ${contribution.planned_amount},
      ${contribution.actual_amount},
      ${contribution.notes}
    )
    RETURNING *
  `;
  return result[0] as MonthlyContribution;
}

// Assets
export async function getUserAssets(userId: string): Promise<UserAsset[]> {
  const result = await sql`
    SELECT * FROM user_assets WHERE user_id = ${userId} ORDER BY value DESC
  `;
  return result as UserAsset[];
}

export async function createAsset(
  userId: string,
  asset: Omit<UserAsset, 'id' | 'user_id' | 'created_at' | 'updated_at'>
): Promise<UserAsset> {
  const result = await sql`
    INSERT INTO user_assets (user_id, name, type, value, purchase_date, expected_return, dividend_yield, notes)
    VALUES (
      ${userId},
      ${asset.name},
      ${asset.type},
      ${asset.value},
      ${asset.purchase_date},
      ${asset.expected_return},
      ${asset.dividend_yield},
      ${asset.notes}
    )
    RETURNING *
  `;
  return result[0] as UserAsset;
}

export async function updateAsset(
  assetId: string,
  updates: Partial<Omit<UserAsset, 'id' | 'user_id' | 'created_at' | 'updated_at'>>
): Promise<UserAsset | null> {
  const result = await sql`
    UPDATE user_assets SET
      name = COALESCE(${updates.name}, name),
      type = COALESCE(${updates.type}, type),
      value = COALESCE(${updates.value}, value),
      purchase_date = COALESCE(${updates.purchase_date}, purchase_date),
      expected_return = COALESCE(${updates.expected_return}, expected_return),
      dividend_yield = COALESCE(${updates.dividend_yield}, dividend_yield),
      notes = COALESCE(${updates.notes}, notes),
      updated_at = NOW()
    WHERE id = ${assetId}
    RETURNING *
  `;
  return result[0] as UserAsset | null;
}

export async function deleteAsset(assetId: string): Promise<boolean> {
  const result = await sql`
    DELETE FROM user_assets WHERE id = ${assetId} RETURNING id
  `;
  return result.length > 0;
}

// Dividend History
export async function getDividendHistory(userId: string, limit: number = 50): Promise<DividendHistory[]> {
  const result = await sql`
    SELECT * FROM dividend_history 
    WHERE user_id = ${userId} 
    ORDER BY payment_date DESC 
    LIMIT ${limit}
  `;
  return result as DividendHistory[];
}

export async function addDividend(
  userId: string,
  assetId: string,
  amount: number,
  paymentDate: Date
): Promise<DividendHistory> {
  const result = await sql`
    INSERT INTO dividend_history (asset_id, user_id, amount, payment_date)
    VALUES (${assetId}, ${userId}, ${amount}, ${paymentDate})
    RETURNING *
  `;
  return result[0] as DividendHistory;
}

// Dashboard Summary
export async function getDashboardSummary(userId: string) {
  const [settings, finances, goals, contributions] = await Promise.all([
    getUserSettings(userId),
    getUserFinances(userId),
    getUserGoals(userId),
    getMonthlyContributions(userId, 6),
  ]);

  return {
    settings,
    finances,
    goals,
    recentContributions: contributions,
  };
}
