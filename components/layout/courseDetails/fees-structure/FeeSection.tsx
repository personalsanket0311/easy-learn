import React from 'react';
import InstallmentDetails from './InstallmentDetails';
import './style.css';

interface InstallmentOption {
  number: number;
  amount: number;
}

interface FeeOption {
  type: string;
  totalFee: number;
  installments?: InstallmentOption[]; // optional
}

interface FeeSectionProps {
  title: string;
  fullPaymentFee: number;
  installmentOptions: FeeOption[];
  onSelectFullPayment: () => void;
  onSelectInstallment: (option: FeeOption) => void;
  isExpanded: boolean;
  onToggle: () => void;
}

const FeeSection: React.FC<FeeSectionProps> = ({
  title,
  fullPaymentFee,
  installmentOptions,
  onSelectFullPayment,
  onSelectInstallment,
  isExpanded,
  onToggle,
}) => {
  return (
    <div className="mb-4">
      <div
        className="d-flex justify-content-between align-items-center p-3 bg-light cursor-pointer"
        onClick={onToggle}
        style={{ cursor: 'pointer' }}
      >
        <span className="fw-medium">{title}</span>
        <i className={`pi ${isExpanded ? 'pi-chevron-up' : 'pi-chevron-down'}`}></i>
      </div>

      {isExpanded && (
        <div className="border border-top-0 p-3">
          {installmentOptions.map((option, index) => (
            <InstallmentDetails
              key={index}
              option={{
                ...option,
                installments: option.installments || [],
              }}
              onSelect={() => onSelectInstallment(option)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeeSection;
