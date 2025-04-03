// Types
interface TaxBracket {
  lower: number;
  upper: number;
  rate: number;
  base: number;
}

interface HecsThreshold {
  lower: number;
  upper: number;
  rate: number;
}

interface TaxResult {
  postTaxIncome: number;
  monthlyIncome: number;
  fortnightlyIncome: number;
  taxBreakdown: {
    incomeTax: number;
    medicareLevy: number;
    hecsRepayment: number;
    totalDeductions: number;
  };
}

// Constants
const TAX_BRACKETS: TaxBracket[] = [
  { lower: 0, upper: 18200, rate: 0, base: 0 },
  { lower: 18201, upper: 45000, rate: 0.16, base: 0 },
  { lower: 45001, upper: 120000, rate: 0.30, base: 5096 },
  { lower: 120001, upper: 180000, rate: 0.37, base: 26096 },
  { lower: 180001, upper: Infinity, rate: 0.45, base: 48296 }
];

const MEDICARE_LEVY_RATE = 0.02;

const HECS_THRESHOLDS: HecsThreshold[] = [
  { lower: 0, upper: 51850, rate: 0.00 },
  { lower: 51851, upper: 59737, rate: 0.01 },
  { lower: 59738, upper: 68489, rate: 0.02 },
  { lower: 68490, upper: 82338, rate: 0.04 },
  { lower: 82339, upper: 91091, rate: 0.05 },
  { lower: 91092, upper: 100240, rate: 0.06 }
];

// Helper functions
const calculateIncomeTax = (income: number): number => {
  let tax = 0;
  
  // Calculate tax for each bracket progressively
  for (let i = 1; i < TAX_BRACKETS.length; i++) {
    const prevBracket = TAX_BRACKETS[i - 1];
    const currentBracket = TAX_BRACKETS[i];
    
    if (income > prevBracket.upper) {
      const taxableAmount = Math.min(income, currentBracket.upper) - prevBracket.upper;
      tax += taxableAmount * currentBracket.rate;
    }
  }
  
  return tax;
};

const calculateHecs = (income: number): number => {
  for (const threshold of HECS_THRESHOLDS) {
    if (income >= threshold.lower && income <= threshold.upper) {
      return income * threshold.rate;
    }
  }
  // If income is above the highest threshold, use the highest rate
  if (income > HECS_THRESHOLDS[HECS_THRESHOLDS.length - 1].upper) {
    return income * HECS_THRESHOLDS[HECS_THRESHOLDS.length - 1].rate;
  }
  return 0;
};

// Main calculation function
export const calculateTax = (
  preTaxIncome: number,
  includeMedicare: boolean = true,
  includeHecs: boolean = false
): TaxResult => {
  // First calculate income tax
  const incomeTax = calculateIncomeTax(preTaxIncome);
  let remainingIncome = preTaxIncome - incomeTax;
  
  // Then Medicare levy
  const medicareLevy = includeMedicare ? preTaxIncome * MEDICARE_LEVY_RATE : 0;
  remainingIncome -= medicareLevy;
  
  // Finally HECS repayment
  const hecsRepayment = includeHecs ? calculateHecs(preTaxIncome) : 0;
  remainingIncome -= hecsRepayment;
  
  // Calculate different payment periods
  const monthlyIncome = remainingIncome / 12;
  const fortnightlyIncome = remainingIncome / 26;

  return {
    postTaxIncome: remainingIncome,
    monthlyIncome,
    fortnightlyIncome,
    taxBreakdown: {
      incomeTax,
      medicareLevy,
      hecsRepayment,
      totalDeductions: incomeTax + medicareLevy + hecsRepayment
    }
  };
}; 