import React from "react";
interface BatchDetailItemProps {
  label: string;
  value: string;
}

const BatchDetailItem: React.FC<BatchDetailItemProps> = ({ label, value }) => {
  return (
    <tr className="border-bottom">
      <td className="fw-semibold text-secondary" style={{ width: "40%" }}>
        {label}
      </td>
      <td>{value}</td>
    </tr>
  );
};

export default BatchDetailItem;
