import { useEffect, useState } from 'react';

import './HistoryPeriod.scss';
interface HistoryPeriodProps {
  activeId: number; 
  historyDate: {
    page: number;
    years: {
      [year: number]: string;
    };
  }[]; 
}

function HistoryPeriod({ activeId, historyDate }: HistoryPeriodProps) {
  const [firstYear, setFirstYear] = useState<number | null>(null);
  const [lastYear, setLastYear] = useState<number | null>(null);

  
  useEffect(() => {
    const activePage = historyDate.find((page) => page.page === activeId);

    if (activePage) {
      const years = Object.keys(activePage.years).map(Number);
      setFirstYear(Math.min(...years));
      setLastYear(Math.max(...years));
    }
  }, [activeId, historyDate]);

  return (
    <>
      <div className="history-period">
        <span className="year-begin">{firstYear ? firstYear : ''}</span>
        <span className="year-end">{lastYear ? lastYear : ''}</span>
      </div>
    </>
  );
}

export default HistoryPeriod;