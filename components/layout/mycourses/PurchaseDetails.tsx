import CustomButton from '@/components/ui/custom-button/CustomButton';
import React from 'react';
import './style.css';

interface PurchaseDetailsProps {
  paidAmount?: number;
  purchaseDate?: string;
  paymentMethod?: string;
  onDownloadReceipt?: () => void;
}

const PurchaseDetails: React.FC<PurchaseDetailsProps> = ({
  paidAmount,
  purchaseDate,
  paymentMethod,
  onDownloadReceipt
}) => {
  const formattedDate = purchaseDate
    ? new Date(purchaseDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <div className="card border-0">
      <div className="card-body py-3">
        <h5 className="card-title fw-bold pb-4 text-dark">Purchase Details</h5>
        
        <div className="row g-4">
          <div className="col-12 border-top pt-4 border-bottom pb-2">
            <div className="row">
              <div className="col-md-6 col-sm-4">
                <span className="text-muted fw-normal">Date of Purchase</span>
              </div>
              <div className="col-md-6 col-sm-8">
                <span className="text-dark fw-semibold">{formattedDate}</span>
              </div>
            </div>
          </div>
          
          <div className="col-12 border-bottom pb-2">
            <div className="row">
              <div className="col-md-6 col-sm-4">
                <span className="text-muted fw-normal">Amount Paid</span>
              </div>
              <div className="col-md-6 col-sm-8">
                <span className="text-dark fw-semibold">₹ {paidAmount}</span>
              </div>
            </div>
          </div>
          
          {/* <div className="col-12">
            <div className="row">
              <div className="col-md-6 col-sm-4">
                <span className="text-muted fw-normal">Payment Method</span>
              </div>
              <div className="col-md-6 col-sm-8">
                <span className="text-dark fw-semibold">{ paymentMethod || "N/A" }</span>
              </div>
            </div>
          </div> */}
        </div>
        
      </div>
    </div>
  );
};

export default PurchaseDetails;