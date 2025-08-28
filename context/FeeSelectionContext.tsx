"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface InstallmentOption {
  number: number;
  amount: number;
}

interface FeeOption {
  type: string;
  totalFee: number;
  installments?: InstallmentOption[];
}

interface FeeSelectionContextType {
  selectedFee: FeeOption | null;
  setSelectedFee: (fee: FeeOption) => void;
}

const FeeSelectionContext = createContext<FeeSelectionContextType | undefined>(undefined);

export const FeeSelectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedFee, setSelectedFeeState] = useState<FeeOption | null>(null);

  // ✅ Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("selectedFeeOption");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setSelectedFeeState(parsed);
      } catch (error) {
        console.error("Failed to parse stored fee option:", error);
      }
    }
  }, []);

  const setSelectedFee = (fee: FeeOption) => {
    setSelectedFeeState(fee);
    localStorage.setItem("selectedFeeOption", JSON.stringify(fee));
  };

  return (
    <FeeSelectionContext.Provider value={{ selectedFee, setSelectedFee }}>
      {children}
    </FeeSelectionContext.Provider>
  );
};

export const useFeeSelection = () => {
  const context = useContext(FeeSelectionContext);
  if (!context) throw new Error("useFeeSelection must be used within FeeSelectionProvider");
  return context;
};
