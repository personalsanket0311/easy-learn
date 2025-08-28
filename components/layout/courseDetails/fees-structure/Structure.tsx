import React, { useState } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import InstallmentsContent from './InstallmentContent';
import FullPaymentContent from './FullPaymentContent';
import { useFeeSelection } from '@/context/FeeSelectionContext';
import "./style.css";

interface InstallmentOption {
  number: number;
  amount: number;
}

interface FeeOption {
  type: string;
  totalFee: number;
  installments?: InstallmentOption[]; // ✅ made optional
}

interface FeeStructureProps {
  withPlacement: FeeOption[];
  withoutPlacement: FeeOption[];
}

const Structure: React.FC<FeeStructureProps> = ({ withPlacement, withoutPlacement }) => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const { setSelectedFee } = useFeeSelection();

  const handleSectionToggle = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleSelectOption = (option: FeeOption) => {
    setSelectedFee({
      ...option,
      installments: option.installments ?? [],
    });
  };

  return (
    <div className="container p-0">
      <div className="card border fee-structure-wrapper">
        <div className="card-header bg-white border-bottom-0 pt-4 px-4">
          <h5 className="mb-0 fw-bold">Fee Structure</h5>
        </div>
        <div className="card-body px-4">
          <TabView activeIndex={activeTabIndex} onTabChange={(e) => setActiveTabIndex(e.index)} className="custom-tabview">
            <TabPanel header="Full Payment" className="fees-structure-tab">
              <FullPaymentContent
                onSelectOption={handleSelectOption}
                withPlacement={withPlacement}
                withoutPlacement={withoutPlacement}
              />
            </TabPanel>
            <TabPanel header="Installments" className="fees-structure-tab">
              <InstallmentsContent
                withPlacement={withPlacement}
                withoutPlacement={withoutPlacement}
                onSelectOption={handleSelectOption}
                expandedSection={expandedSection}
                onSectionToggle={handleSectionToggle}
              />
            </TabPanel>
          </TabView>
        </div>
      </div>
    </div>
  );
};

export default Structure;
