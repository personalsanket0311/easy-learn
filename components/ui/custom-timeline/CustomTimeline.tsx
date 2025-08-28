import React from 'react';
import { Timeline } from 'primereact/timeline';
import './style.css';

interface Installment {
  id?: string;
  title: string;
  status?: 'Paid' | 'Due' | 'Pending';
  date?: string;
  amount?: string;
  icon?: string;
}

interface CustomTimelineProps {
  installments: Installment[];
  icon?: string
}


const CustomTimeline: React.FC<CustomTimelineProps> = ({ installments, icon }) => {

  return (
    <Timeline
      value={installments}
      marker={(installment: Installment) => (
        <span className={installment.icon}></span>
      )}
      content={(installment: Installment) => (
        <div className='flex-column'>
          <h6 className='text-dark'>
            {installment.title}
            {installment.id && <small className='ms-2 text-muted'>#{installment.id}</small>}
          </h6>
          <div>
            {installment.status === 'Paid' ? (
              <span>
                Paid: {installment.date} - ₹ {installment.amount}
              </span>
            ) : (
              <span>
                {installment.status}: {installment.date} - ₹ {installment.amount}
              </span>
            )}
          </div>
        </div>
      )}
    />
  );
};

export default CustomTimeline;