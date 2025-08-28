import React from 'react';
import FeeCard from './FeeCard';
import "./style.css";
import { useRouter, useParams } from 'next/navigation';

interface InstallmentOption {
  number: number;
  amount: number;
}

interface FeeOption {
  type: string;
  totalFee: number;
  installments?: InstallmentOption[]; // ✅ made optional
}

interface FullPaymentContentProps {
  withPlacement: FeeOption[];
  withoutPlacement: FeeOption[];
  onSelectOption: (option: FeeOption) => void;
}

const FullPaymentContent: React.FC<FullPaymentContentProps> = ({
  withPlacement,
  withoutPlacement,
  onSelectOption
}) => {
  const router = useRouter();
  const { id: courseId } = useParams();

  const handleSelect = (type: string, amount: number) => {
    const selected: FeeOption = { type, totalFee: amount, installments: [] };
    localStorage.setItem("selectedFeeOption", JSON.stringify(selected));
    onSelectOption(selected);
    router.push(`/courses/course-details/${courseId}/batch-details`);
  };

  const withPlacementFee = withPlacement[0]?.totalFee || 0;
  const withoutPlacementFee = withoutPlacement[0]?.totalFee || 0;

  return (
    <div>
      <FeeCard
        title="Fees with Placement"
        fee={withPlacementFee}
        onSelect={() => handleSelect('withPlacement', withPlacementFee)}
        isFullPayment
         disabled={withPlacementFee === 0}
      />
      <FeeCard
        title="Fees without Placement"
        fee={withoutPlacementFee}
        onSelect={() => handleSelect('withoutPlacement', withoutPlacementFee)}
      />
    </div>
  );
};

export default FullPaymentContent;
