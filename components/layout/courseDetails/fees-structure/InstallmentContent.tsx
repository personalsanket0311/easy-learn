import React from 'react';
import FeeSection from './FeeSection';
import './style.css';

interface InstallmentOption {
  number: number;
  amount: number;
}

interface FeeOption {
  type: string;
  totalFee: number;
  installments?: InstallmentOption[]; // ✅ made optional
}

interface InstallmentsContentProps {
  withPlacement: FeeOption[];
  withoutPlacement: FeeOption[];
  onSelectOption: (option: FeeOption) => void;
  expandedSection: string | null;
  onSectionToggle: (section: string) => void;
}

const InstallmentsContent: React.FC<InstallmentsContentProps> = ({
  withPlacement,
  withoutPlacement,
  onSelectOption,
  expandedSection,
  onSectionToggle,
}) => {
  const fullPaymentWithPlacement =
    withPlacement.find(opt => opt.installments?.length === 1)?.totalFee || 0;

  const fullPaymentWithoutPlacement =
    withoutPlacement.find(opt => opt.installments?.length === 1)?.totalFee || 0;

  return (
    <div>
      <FeeSection
        title="Fees With Placement"
        fullPaymentFee={fullPaymentWithPlacement}
        installmentOptions={withPlacement}
        onSelectFullPayment={() =>
          onSelectOption({ type: 'withPlacement', totalFee: fullPaymentWithPlacement, installments: [] })
        }
        onSelectInstallment={onSelectOption}
        isExpanded={expandedSection === 'withPlacement'}
        onToggle={() => onSectionToggle('withPlacement')}
      />

      <FeeSection
        title="Fees Without Placement"
        fullPaymentFee={fullPaymentWithoutPlacement}
        installmentOptions={withoutPlacement}
        onSelectFullPayment={() =>
          onSelectOption({ type: 'withoutPlacement', totalFee: fullPaymentWithoutPlacement, installments: [] })
        }
        onSelectInstallment={onSelectOption}
        isExpanded={expandedSection === 'withoutPlacement'}
        onToggle={() => onSectionToggle('withoutPlacement')}
      />
    </div>
  );
};

export default InstallmentsContent;
