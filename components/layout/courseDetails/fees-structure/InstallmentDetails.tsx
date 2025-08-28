"use client";

import React from 'react';
import { Button } from 'primereact/button';
import "./style.css";
import { useRouter, useParams } from 'next/navigation';
import CustomButton from '@/components/ui/custom-button/CustomButton';

interface InstallmentOption {
  number: number;
  amount: number;
}

interface FeeOption {
  type: string;
  totalFee: number;
  installments: InstallmentOption[];
}

const InstallmentDetails: React.FC<{
  option: FeeOption;
  onSelect: () => void;
}> = ({ option, onSelect }) => {
  const router = useRouter();
  const { id: courseId } = useParams();

  const handleSelect = () => {
    localStorage.setItem("selectedFeeOption", JSON.stringify(option));
    onSelect();

    // navigate to select-batches page
    router.push(`/courses/course-details/${courseId}/batch-details`);
  };

  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="mb-0 fw-bold">{option.installments.length} Installments</h6>
        <CustomButton 
          label="Select" 
          onClick={handleSelect}
           className="rounded-pill" 
          outlined
        />
      </div>
      <div className="text-muted mb-2">
        Total Fee: <span className="fw-bold text-dark">₹ {option.totalFee.toLocaleString()}</span>
      </div>
      <ul className="list-unstyled">
        {option.installments.map((installment, index) => (
          <li key={index} className="mb-1">
            • Installment {installment.number}: <span className="fw-bold">₹ {installment.amount.toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InstallmentDetails;
