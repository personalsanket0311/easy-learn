'use client';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import Structure from './Structure';
import "./style.css";

interface InstallmentOption {
  number: number;
  amount: number;
}

interface FeeOption {
  type: string;
  totalFee: number;
  installments: InstallmentOption[];
}

interface FeeStructureProps {
  withPlacement: FeeOption[];
  withoutPlacement: FeeOption[];
}

const FeesStructure: React.FC<FeeStructureProps> = ({ withPlacement, withoutPlacement }) => {
  return (
    <div className="bg-light">
      <Structure withPlacement={withPlacement} withoutPlacement={withoutPlacement} />
    </div>
  );
};

export default FeesStructure;
