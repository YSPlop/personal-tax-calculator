'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaArrowLeft, FaCalculator } from 'react-icons/fa';
import styles from './howWeCalculate.module.css';

const HowWeCalculate = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backLink}>
        <FaArrowLeft className="mr-2" /> Back to Calculator
      </Link>
      
      <motion.div 
        className={styles.contentContainer}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className={styles.header}>
          <h1 className={styles.title}>
            <span className={styles.iconWrapper}>
              <FaCalculator className={styles.titleIcon} />
            </span>
            <span>How We Calculate Australian Taxes</span>
          </h1>
          <p className={styles.subtitle}>
            A simple explanation of how Australian tax calculations work
          </p>
        </motion.div>

        <motion.section variants={itemVariants} className={styles.section}>
          <h2 className={styles.sectionTitle}>Income Tax</h2>
          <p className={styles.paragraph}>
            In Australia, income tax works on a progressive system. This means the more you earn, 
            the higher percentage you pay on portions of your income.
          </p>
          
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr className={styles.tableHeader}>
                  <th className={styles.tableCell}>Income Range</th>
                  <th className={styles.tableCell}>Tax Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.tableCell}>$0 - $18,200</td>
                  <td className={styles.tableCell}>0%</td>
                </tr>
                <tr>
                  <td className={styles.tableCell}>$18,201 - $45,000</td>
                  <td className={styles.tableCell}>19¢ for each $1 over $18,200</td>
                </tr>
                <tr>
                  <td className={styles.tableCell}>$45,001 - $120,000</td>
                  <td className={styles.tableCell}>$5,092 plus 32.5¢ for each $1 over $45,000</td>
                </tr>
                <tr>
                  <td className={styles.tableCell}>$120,001 - $180,000</td>
                  <td className={styles.tableCell}>$29,467 plus 37¢ for each $1 over $120,000</td>
                </tr>
                <tr>
                  <td className={styles.tableCell}>$180,001 and over</td>
                  <td className={styles.tableCell}>$51,667 plus 45¢ for each $1 over $180,000</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className={styles.exampleBox}>
            <h3 className={styles.exampleTitle}>Example:</h3>
            <div>
              If you earn $60,000 per year:
            </div>
            <ul className={styles.exampleList}>
              <li>First $18,200: No tax (tax-free threshold)</li>
              <li>$18,201 to $45,000 ($26,800): 19% = $5,092</li>
              <li>$45,001 to $60,000 ($15,000): 32.5% = $4,875</li>
              <li>Total tax: $9,967</li>
            </ul>
          </div>
        </motion.section>

        <motion.section variants={itemVariants} className={styles.section}>
          <h2 className={styles.sectionTitle}>Medicare Levy</h2>
          <p className={styles.paragraph}>
            The Medicare Levy is an additional 2% tax on your total taxable income that helps fund Australia&apos;s public health system.
          </p>
          <div className={styles.exampleBox}>
            <h3 className={styles.exampleTitle}>Example:</h3>
            <p>
              If your taxable income is $60,000, your Medicare Levy would be:
              <br />
              $60,000 × 2% = $1,200
            </p>
          </div>
        </motion.section>

        <motion.section variants={itemVariants} className={styles.section}>
          <h2 className={styles.sectionTitle}>HECS/HELP Repayments</h2>
          <p className={styles.paragraph}>
            If you have a student loan through the Higher Education Contribution Scheme (HECS) or Higher Education Loan Program (HELP), 
            you&apos;ll need to make repayments once your income reaches a certain threshold.
          </p>
          
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr className={styles.tableHeader}>
                  <th className={styles.tableCell}>Income Range</th>
                  <th className={styles.tableCell}>Repayment Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.tableCell}>Below $51,850</td>
                  <td className={styles.tableCell}>0%</td>
                </tr>
                <tr>
                  <td className={styles.tableCell}>$51,851 - $59,737</td>
                  <td className={styles.tableCell}>1%</td>
                </tr>
                <tr>
                  <td className={styles.tableCell}>$59,738 - $68,489</td>
                  <td className={styles.tableCell}>2%</td>
                </tr>
                <tr>
                  <td className={styles.tableCell}>$68,490 - $82,338</td>
                  <td className={styles.tableCell}>4%</td>
                </tr>
                <tr>
                  <td className={styles.tableCell}>$82,339 - $91,091</td>
                  <td className={styles.tableCell}>5%</td>
                </tr>
                <tr>
                  <td className={styles.tableCell}>$91,092 - $100,240</td>
                  <td className={styles.tableCell}>6%</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className={styles.exampleBox}>
            <h3 className={styles.exampleTitle}>Example:</h3>
            <p>
              If your income is $65,000 and you have a HECS/HELP debt:
              <br />
              Your repayment rate would be 2%
              <br />
              $65,000 × 2% = $1,300 per year in HECS/HELP repayments
            </p>
          </div>
        </motion.section>

        <motion.section variants={itemVariants} className={styles.section}>
          <h2 className={styles.sectionTitle}>Putting It All Together</h2>
          <p className={styles.paragraph}>
            To calculate your take-home pay:
          </p>
          <ol className={styles.stepsList}>
            <li>Start with your gross (pre-tax) income</li>
            <li>Subtract your income tax</li>
            <li>Subtract the Medicare Levy (if applicable)</li>
            <li>Subtract HECS/HELP repayments (if applicable)</li>
            <li>The result is your annual take-home pay</li>
          </ol>
          <div className={styles.exampleBox}>
            <h3 className={styles.exampleTitle}>Full Example:</h3>
            <div>
              For someone earning $65,000 with HECS/HELP debt:
            </div>
            <ul className={styles.exampleList}>
              <li>Income Tax: ~$12,967</li>
              <li>Medicare Levy: $1,300</li>
              <li>HECS/HELP: $1,300</li>
              <li>Total Deductions: $15,567</li>
              <li>Take-home pay: $49,433 per year</li>
              <li>Monthly: $4,119</li>
              <li>Fortnightly: $1,901</li>
            </ul>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default HowWeCalculate; 