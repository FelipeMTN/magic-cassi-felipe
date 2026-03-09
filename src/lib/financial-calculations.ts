/**
 * Biblioteca de cálculos financeiros para o Organizador de Metas
 */

export interface FinancialProjection {
  months: number;
  finalValue: number;
  totalInvested: number;
  totalInterest: number;
  monthlyData: MonthlyProjectionData[];
}

export interface MonthlyProjectionData {
  month: number;
  contribution: number;
  interest: number;
  balance: number;
  cumulativeInvested: number;
  cumulativeInterest: number;
}

export interface GoalProjection {
  targetValue: number;
  currentValue: number;
  monthlyContribution: number;
  monthsToGoal: number;
  expectedDate: Date;
  onTrack: boolean;
  projectedFinalValue: number;
  shortfall: number;
}

export interface DividendProjection {
  monthlyDividends: number;
  yearlyDividends: number;
  dividendYield: number;
  projectedGrowth: number[];
}

export interface EmergencyFundStatus {
  targetMonths: number;
  monthlyExpenses: number;
  targetValue: number;
  currentValue: number;
  percentComplete: number;
  monthsToComplete: number;
  isSufficient: boolean;
}

export interface ScenarioComparison {
  conservative: FinancialProjection;
  moderate: FinancialProjection;
  aggressive: FinancialProjection;
}

// Taxa de inflação anual padrão do Brasil (IPCA)
const DEFAULT_INFLATION_RATE = 0.045; // 4.5% ao ano

/**
 * Calcula juros compostos
 * @param principal - Valor inicial
 * @param monthlyContribution - Aporte mensal
 * @param annualRate - Taxa de juros anual (ex: 0.12 para 12%)
 * @param months - Número de meses
 * @returns Projeção financeira completa
 */
export function calculateCompoundInterest(
  principal: number,
  monthlyContribution: number,
  annualRate: number,
  months: number
): FinancialProjection {
  const monthlyRate = annualRate / 12;
  const monthlyData: MonthlyProjectionData[] = [];
  
  let balance = principal;
  let totalInvested = principal;
  let totalInterest = 0;

  for (let month = 1; month <= months; month++) {
    const interest = balance * monthlyRate;
    balance += interest + monthlyContribution;
    totalInvested += monthlyContribution;
    totalInterest += interest;

    monthlyData.push({
      month,
      contribution: monthlyContribution,
      interest,
      balance,
      cumulativeInvested: totalInvested,
      cumulativeInterest: totalInterest,
    });
  }

  return {
    months,
    finalValue: balance,
    totalInvested,
    totalInterest,
    monthlyData,
  };
}

/**
 * Calcula quanto tempo falta para atingir uma meta
 * @param targetValue - Valor da meta
 * @param currentValue - Valor atual
 * @param monthlyContribution - Aporte mensal
 * @param annualRate - Taxa de juros anual
 * @returns Projeção da meta
 */
export function calculateGoalProjection(
  targetValue: number,
  currentValue: number,
  monthlyContribution: number,
  annualRate: number
): GoalProjection {
  const monthlyRate = annualRate / 12;
  let balance = currentValue;
  let months = 0;
  const maxMonths = 600; // 50 anos máximo

  while (balance < targetValue && months < maxMonths) {
    const interest = balance * monthlyRate;
    balance += interest + monthlyContribution;
    months++;
  }

  const expectedDate = new Date();
  expectedDate.setMonth(expectedDate.getMonth() + months);

  const onTrack = months < maxMonths;
  const shortfall = onTrack ? 0 : targetValue - balance;

  return {
    targetValue,
    currentValue,
    monthlyContribution,
    monthsToGoal: months,
    expectedDate,
    onTrack,
    projectedFinalValue: balance,
    shortfall,
  };
}

/**
 * Calcula o aporte mensal necessário para atingir uma meta
 * @param targetValue - Valor da meta
 * @param currentValue - Valor atual
 * @param annualRate - Taxa de juros anual
 * @param months - Prazo em meses
 * @returns Aporte mensal necessário
 */
export function calculateRequiredContribution(
  targetValue: number,
  currentValue: number,
  annualRate: number,
  months: number
): number {
  const monthlyRate = annualRate / 12;
  
  // Valor futuro do principal
  const futureValueOfPrincipal = currentValue * Math.pow(1 + monthlyRate, months);
  
  // Valor que falta acumular
  const remainingValue = targetValue - futureValueOfPrincipal;
  
  // PMT = FV * r / ((1 + r)^n - 1)
  if (monthlyRate === 0) {
    return remainingValue / months;
  }
  
  const contribution = remainingValue * monthlyRate / (Math.pow(1 + monthlyRate, months) - 1);
  
  return Math.max(0, contribution);
}

/**
 * Ajusta um valor pela inflação
 * @param value - Valor nominal
 * @param years - Anos no futuro
 * @param inflationRate - Taxa de inflação anual
 * @returns Valor real (ajustado pela inflação)
 */
export function adjustForInflation(
  value: number,
  years: number,
  inflationRate: number = DEFAULT_INFLATION_RATE
): number {
  return value / Math.pow(1 + inflationRate, years);
}

/**
 * Calcula o valor futuro necessário considerando inflação
 * @param presentValue - Valor em termos de hoje
 * @param years - Anos no futuro
 * @param inflationRate - Taxa de inflação anual
 * @returns Valor nominal futuro necessário
 */
export function calculateInflationAdjustedTarget(
  presentValue: number,
  years: number,
  inflationRate: number = DEFAULT_INFLATION_RATE
): number {
  return presentValue * Math.pow(1 + inflationRate, years);
}

/**
 * Calcula projeção de dividendos
 * @param portfolioValue - Valor do portfólio
 * @param dividendYield - Yield anual (ex: 0.06 para 6%)
 * @param growthRate - Taxa de crescimento dos dividendos
 * @param years - Anos para projetar
 * @returns Projeção de dividendos
 */
export function calculateDividendProjection(
  portfolioValue: number,
  dividendYield: number,
  growthRate: number = 0.05,
  years: number = 10
): DividendProjection {
  const yearlyDividends = portfolioValue * dividendYield;
  const monthlyDividends = yearlyDividends / 12;

  const projectedGrowth: number[] = [];
  let currentDividends = yearlyDividends;

  for (let year = 0; year < years; year++) {
    projectedGrowth.push(currentDividends);
    currentDividends *= (1 + growthRate);
  }

  return {
    monthlyDividends,
    yearlyDividends,
    dividendYield,
    projectedGrowth,
  };
}

/**
 * Calcula status da reserva de emergência
 * @param currentValue - Valor atual da reserva
 * @param monthlyExpenses - Despesas mensais
 * @param targetMonths - Meses de reserva desejados (padrão: 6)
 * @param monthlyContribution - Aporte mensal na reserva
 * @returns Status da reserva de emergência
 */
export function calculateEmergencyFundStatus(
  currentValue: number,
  monthlyExpenses: number,
  targetMonths: number = 6,
  monthlyContribution: number = 0
): EmergencyFundStatus {
  const targetValue = monthlyExpenses * targetMonths;
  const percentComplete = Math.min((currentValue / targetValue) * 100, 100);
  const isSufficient = currentValue >= targetValue;

  let monthsToComplete = 0;
  if (!isSufficient && monthlyContribution > 0) {
    monthsToComplete = Math.ceil((targetValue - currentValue) / monthlyContribution);
  } else if (!isSufficient) {
    monthsToComplete = -1; // Indica que não há aporte definido
  }

  return {
    targetMonths,
    monthlyExpenses,
    targetValue,
    currentValue,
    percentComplete,
    monthsToComplete,
    isSufficient,
  };
}

/**
 * Compara diferentes cenários de investimento
 * @param principal - Valor inicial
 * @param monthlyContribution - Aporte mensal
 * @param months - Prazo em meses
 * @returns Comparação de cenários
 */
export function compareScenarios(
  principal: number,
  monthlyContribution: number,
  months: number
): ScenarioComparison {
  return {
    conservative: calculateCompoundInterest(principal, monthlyContribution, 0.06, months), // 6% a.a.
    moderate: calculateCompoundInterest(principal, monthlyContribution, 0.10, months), // 10% a.a.
    aggressive: calculateCompoundInterest(principal, monthlyContribution, 0.15, months), // 15% a.a.
  };
}

/**
 * Calcula a contagem regressiva para uma meta
 * @param targetDate - Data alvo
 * @returns Objeto com anos, meses e dias restantes
 */
export function calculateCountdown(targetDate: Date): {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  isOverdue: boolean;
} {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();
  
  if (diff <= 0) {
    return { years: 0, months: 0, days: 0, totalDays: 0, isOverdue: true };
  }

  const totalDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
  const years = Math.floor(totalDays / 365);
  const remainingDaysAfterYears = totalDays % 365;
  const months = Math.floor(remainingDaysAfterYears / 30);
  const days = remainingDaysAfterYears % 30;

  return { years, months, days, totalDays, isOverdue: false };
}

/**
 * Verifica se o usuário está no caminho certo para a meta
 * @param currentValue - Valor atual
 * @param targetValue - Valor da meta
 * @param monthsElapsed - Meses desde o início
 * @param totalMonths - Total de meses planejados
 * @returns Status do progresso
 */
export function checkProgress(
  currentValue: number,
  targetValue: number,
  monthsElapsed: number,
  totalMonths: number
): {
  status: 'ahead' | 'on-track' | 'behind' | 'critical';
  expectedValue: number;
  deviation: number;
  deviationPercent: number;
  message: string;
} {
  const progress = monthsElapsed / totalMonths;
  const expectedValue = targetValue * progress;
  const deviation = currentValue - expectedValue;
  const deviationPercent = expectedValue > 0 ? (deviation / expectedValue) * 100 : 0;

  let status: 'ahead' | 'on-track' | 'behind' | 'critical';
  let message: string;

  if (deviationPercent >= 10) {
    status = 'ahead';
    message = 'Parabéns! Você está acima da meta planejada!';
  } else if (deviationPercent >= -5) {
    status = 'on-track';
    message = 'Você está no caminho certo. Continue assim!';
  } else if (deviationPercent >= -20) {
    status = 'behind';
    message = 'Atenção: você está um pouco atrasado. Considere aumentar seus aportes.';
  } else {
    status = 'critical';
    message = 'Alerta: você está significativamente atrasado. Revise sua estratégia.';
  }

  return {
    status,
    expectedValue,
    deviation,
    deviationPercent,
    message,
  };
}

/**
 * Formata valor em Real brasileiro
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

/**
 * Formata percentual
 */
export function formatPercent(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Calcula a taxa de retorno necessária para atingir meta
 * @param currentValue - Valor atual
 * @param targetValue - Valor da meta
 * @param monthlyContribution - Aporte mensal
 * @param months - Prazo em meses
 * @returns Taxa anual necessária
 */
export function calculateRequiredRate(
  currentValue: number,
  targetValue: number,
  monthlyContribution: number,
  months: number
): number {
  // Usa método de Newton-Raphson para encontrar a taxa
  let rate = 0.10; // Chute inicial de 10% a.a.
  const tolerance = 0.0001;
  const maxIterations = 100;

  for (let i = 0; i < maxIterations; i++) {
    const projection = calculateCompoundInterest(currentValue, monthlyContribution, rate, months);
    const diff = projection.finalValue - targetValue;
    
    if (Math.abs(diff) < tolerance) {
      break;
    }

    // Ajusta a taxa baseado no erro
    if (diff > 0) {
      rate -= rate * 0.1;
    } else {
      rate += rate * 0.1;
    }
  }

  return rate;
}
