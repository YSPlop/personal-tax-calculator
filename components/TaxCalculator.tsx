'use client';

import { useState, useEffect } from 'react';
import { calculateTax } from '../utils/taxCalculator';
import styles from './TaxCalculator.module.css';
import { motion, AnimatePresence } from 'framer-motion';

interface TaxResult {
  yearly: number;
  monthly: number;
  fortnightly: number;
  breakdown?: {
    incomeTax: number;
    medicareLevy: number;
    hecsRepayment: number;
    totalDeductions: number;
  };
}

export default function TaxCalculator() {
  const [income, setIncome] = useState('');
  const [displayIncome, setDisplayIncome] = useState('');
  const [period, setPeriod] = useState<'yearly' | 'monthly'>('yearly');
  const [hasMedicare, setHasMedicare] = useState(true);
  const [hasHECS, setHasHECS] = useState(false);
  const [result, setResult] = useState<TaxResult | null>(null);

  // Format number with commas
  const formatNumberWithCommas = (value: string) => {
    // Remove any non-digit characters
    const numericValue = value.replace(/[^\d]/g, '');
    
    // Format with commas
    if (numericValue) {
      return new Intl.NumberFormat('en-US').format(parseInt(numericValue));
    }
    return '';
  };

  // Format currency values with full numbers
  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString(undefined, { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    })}`;
  };

  // Handle income input change
  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Remove any non-digit characters
    const numericValue = inputValue.replace(/[^\d]/g, '');
    
    // Limit to a maximum value (999,999,999)
    const limitedValue = numericValue.slice(0, 9);
    
    // Store the raw numeric value for calculations
    setIncome(limitedValue);
    
    // Format the display value with commas
    setDisplayIncome(formatNumberWithCommas(limitedValue));
  };

  useEffect(() => {
    const incomeNumber = Number(income);

    if (incomeNumber > 0) {
      const yearlyIncome = period === 'monthly' ? incomeNumber * 12 : incomeNumber;
      const taxResult = calculateTax(yearlyIncome, hasMedicare, hasHECS);

      setResult({
        yearly: taxResult.postTaxIncome,
        monthly: taxResult.monthlyIncome,
        fortnightly: taxResult.fortnightlyIncome,
        breakdown: taxResult.taxBreakdown
      });
    } else {
      setResult(null);
    }
  }, [income, period, hasMedicare, hasHECS]);

  const resetCalculator = () => {
    setIncome('');
    setDisplayIncome('');
    setPeriod('yearly');
    setHasMedicare(true);
    setHasHECS(false);
    setResult(null);
  };

  const inputsDisabled = false;

  return (
    <div className={styles.container}>
      <div className={styles.formGroup}>
        <div>
          <label className={styles.label}>Income</label>
          <div className={styles.inputGroup}>
            <input
              type="text"
              value={displayIncome}
              onChange={handleIncomeChange}
              disabled={inputsDisabled}
              className={styles.input}
              placeholder="Enter your income"
            />
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value as 'yearly' | 'monthly')}
              disabled={inputsDisabled}
              className={styles.select}
            >
              <option value="yearly">Yearly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        </div>

        <div>
          <label className={styles.label}>Tax Options</label>
          <div className={styles.optionsGrid}>
            <button
              onClick={() => setHasMedicare(!hasMedicare)}
              disabled={inputsDisabled}
              className={`${styles.optionButton} ${hasMedicare ? styles.active : ''}`}
            >
              <div className={styles.optionHeader}>
                <span>Medicare Levy</span>
                <div className={styles.checkbox}>
                  {hasMedicare && '✓'}
                </div>
              </div>
              <p className={styles.optionDescription}>2% of taxable income</p>
            </button>

            <button
              onClick={() => setHasHECS(!hasHECS)}
              disabled={inputsDisabled}
              className={`${styles.optionButton} ${hasHECS ? styles.active : ''}`}
            >
              <div className={styles.optionHeader}>
                <span>HECS-HELP Debt</span>
                <div className={styles.checkbox}>
                  {hasHECS && '✓'}
                </div>
              </div>
              <p className={styles.optionDescription}>Income-based repayment</p>
            </button>
          </div>
        </div>

        <div className={styles.buttonGroup}>
          {income && (
            <button
              onClick={resetCalculator}
              className={styles.resetButton}
            >
              Reset
            </button>
          )}
        </div>

        <AnimatePresence>
          {result && (
            <motion.div
              className={styles.resultContainer}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className={styles.heading}>Your Post-Tax Income</h2>
              <div className={styles.resultGrid}>
                <motion.div
                  className={styles.resultCard}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <h3>Yearly</h3>
                  <p>{formatCurrency(result.yearly)}</p>
                </motion.div>
                <motion.div
                  className={styles.resultCard}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.15 }}
                >
                  <h3>Monthly</h3>
                  <p>{formatCurrency(result.monthly)}</p>
                </motion.div>
                <motion.div
                  className={styles.resultCard}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3>Fortnightly</h3>
                  <p>{formatCurrency(result.fortnightly)}</p>
                </motion.div>
              </div>

              {result.breakdown && (
                <motion.div
                  className={styles.breakdown}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <h3 className={styles.heading}>Tax Breakdown</h3>
                  <div className={styles.breakdownGrid}>
                    <div className={styles.breakdownItem}>
                      <span>Income Tax</span>
                      <span>{formatCurrency(result.breakdown.incomeTax)}</span>
                    </div>
                    {hasMedicare && (
                      <div className={styles.breakdownItem}>
                        <span>Medicare Levy</span>
                        <span>{formatCurrency(result.breakdown.medicareLevy)}</span>
                      </div>
                    )}
                    {hasHECS && (
                      <div className={styles.breakdownItem}>
                        <span>HECS Repayment</span>
                        <span>{formatCurrency(result.breakdown.hecsRepayment)}</span>
                      </div>
                    )}
                    <div className={styles.breakdownTotal}>
                      <span>Total Deductions</span>
                      <span>{formatCurrency(result.breakdown.totalDeductions)}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 