import { FaInfoCircle } from 'react-icons/fa';
import Link from 'next/link';
import TaxCalculator from '../components/TaxCalculator';
import styles from './page.module.css'; // Import the CSS module

export default function Home() {
  return (
    // Use the global 'container' class and the page-specific styles
    <main className={`container ${styles.pageContainer}`}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          Personal Tax Calculator
        </h1>
        <p className={styles.disclaimer}>
          For personal use only. Information may be incorrect. Use at your own risk.
        </p>
        <Link 
            href="/how-we-calculate" 
            className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            <FaInfoCircle className="mr-2" /> How Do We Calculate?
        </Link>
      </div>
      <TaxCalculator />
    </main>
  );
}
