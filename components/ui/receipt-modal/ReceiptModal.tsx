import React from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import "./style.css";

interface ReceiptData {
  receiptNumber: string;
  paymentId: string;
  orderId: string;
  studentName: string;
  studentEmail: string;
  courseName: string;
  batchType: string;
  paymentType: string;
  amount: number;
  paymentDate: string;
  feeType: string;
}

interface ReceiptModalProps {
  visible: boolean;
  onHide: () => void;
  receiptData: ReceiptData;
}

const ReceiptModal: React.FC<ReceiptModalProps> = ({
  visible,
  onHide,
  receiptData,
}) => {
  const handlePrint = () => {
    const printContent = document.getElementById("receipt-content");
    if (printContent) {
      const printWindow = window.open("", "", "height=600,width=800");
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Payment Receipt</title>
              <style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  body {
    font-family: 'Inter', sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #f4f6f8;
    color: #333;
  }

  .receipt-container {
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
    max-width: 700px;
    margin: 0 auto;
    padding: 30px 40px;
    border: 1px solid #dbe2ea;
  }

  .header {
    text-align: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #007bff;
    margin-bottom: 25px;
  }

  .company-name {
    font-size: 26px;
    font-weight: 700;
    color: #007bff;
    margin-bottom: 6px;
  }

  .company-details {
    font-size: 13px;
    color: #6c757d;
    line-height: 1.6;
  }

  .receipt-title {
    font-size: 22px;
    font-weight: 600;
    color: #343a40;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .receipt-details {
    margin-bottom: 30px;
  }

  .detail-row {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px dashed #dee2e6;
  }

  .detail-label {
    font-weight: 600;
    color: #495057;
  }

  .detail-value {
    color: #212529;
  }

  .amount-section {
    background-color: #f1f3f5;
    border-radius: 8px;
    padding: 20px;
    margin: 30px 0;
  }

  .total-amount {
    font-size: 18px;
    font-weight: 700;
    color: #007bff;
    border-top: 1px solid #ced4da;
    padding-top: 15px;
    margin-top: 15px;
  }

  .footer {
    text-align: center;
    margin-top: 40px;
    padding-top: 20px;
    border-top: 2px solid #007bff;
    font-size: 14px;
    color: #6c757d;
  }

  .thank-you {
    font-size: 18px;
    font-weight: 600;
    color: #007bff;
    margin-bottom: 8px;
  }

  .support-info {
    margin-top: 6px;
    line-height: 1.5;
  }

  @media print {
    .no-print {
      display: none !important;
    }

    body {
      margin: 0;
      background: white;
    }
  }
</style>
            </head>
            <body>
              ${printContent.innerHTML}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  const handleDownload = () => {
    // Create a blob with HTML content for download
    const receiptContent = document.getElementById("receipt-content");
    if (receiptContent) {
      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Payment Receipt - ${receiptData.receiptNumber}</title>
              <style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  body {
    font-family: 'Inter', sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #f4f6f8;
    color: #333;
  }

  .receipt-container {
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
    max-width: 700px;
    margin: 0 auto;
    padding: 30px 40px;
    border: 1px solid #dbe2ea;
  }

  .header {
    text-align: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #007bff;
    margin-bottom: 25px;
  }

  .company-name {
    font-size: 26px;
    font-weight: 700;
    color: #007bff;
    margin-bottom: 6px;
  }

  .company-details {
    font-size: 13px;
    color: #6c757d;
    line-height: 1.6;
  }

  .receipt-title {
    font-size: 22px;
    font-weight: 600;
    color: #343a40;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .receipt-details {
    margin-bottom: 30px;
  }

  .detail-row {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px dashed #dee2e6;
  }

  .detail-label {
    font-weight: 600;
    color: #495057;
  }

  .detail-value {
    color: #212529;
  }

  .amount-section {
    background-color: #f1f3f5;
    border-radius: 8px;
    padding: 20px;
    margin: 30px 0;
  }

  .total-amount {
    font-size: 18px;
    font-weight: 700;
    color: #007bff;
    border-top: 1px solid #ced4da;
    padding-top: 15px;
    margin-top: 15px;
  }

  .footer {
    text-align: center;
    margin-top: 40px;
    padding-top: 20px;
    border-top: 2px solid #007bff;
    font-size: 14px;
    color: #6c757d;
  }

  .thank-you {
    font-size: 18px;
    font-weight: 600;
    color: #007bff;
    margin-bottom: 8px;
  }

  .support-info {
    margin-top: 6px;
    line-height: 1.5;
  }

  @media print {
    .no-print {
      display: none !important;
    }

    body {
      margin: 0;
      background: white;
    }
  }
</style>
          </head>
          <body>
            ${receiptContent.innerHTML}
          </body>
        </html>
      `;

      const blob = new Blob([htmlContent], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `receipt-${receiptData.receiptNumber}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const gstAmount = receiptData.amount * 0.18; // 18% GST
  const baseAmount = receiptData.amount - gstAmount;

  return (
    <Dialog
      header="Payment Receipt"
      visible={visible}
      onHide={onHide}
      style={{ width: "700px" }}
      footer={
        <div className="d-flex justify-content-center gap-2">
          <Button
            label="Print"
            icon="pi pi-print"
            onClick={handlePrint}
            className="p-button-outlined"
            style={{ margin: "8px", borderRadius: "25px" }}
          />
          <Button
            label="Download"
            icon="pi pi-download"
            onClick={handleDownload}
            className="p-button-outlined"
            style={{ margin: "8px", borderRadius: "25px" }}

          />
          <Button
            label="Close"
            icon="pi pi-times"
            onClick={onHide}
            className="p-button-secondary"
            style={{ margin: "8px", borderRadius: "25px" }}
          />
        </div>
      }
    >
      <div id="receipt-content">
        <div className="receipt-container">
          {/* Header */}
          <div className="header text-center">
            <div className="company-name fw-500 fs-3 text-primary">
              Skramby Technology Solutions Pvt Ltd
            </div>
            <div className="company-details mb-4">
              <div>Office No. 101, Shreyas Creast, Pashan-Sus Road, Baner, Pune - 411045</div>
              <div>Phone: +91 80 4567 8900 | Email:info@skramby.com</div>
              <div>GST No: 29ABCDE1234F1Z5 | PAN:ABCDE1234F</div>
            </div>
          </div>

          {/* Receipt Title */}
          <div className="receipt-title text-center mb-3 fw-bold text-dark">PAYMENT RECEIPT</div>

          {/* Receipt Details */}
          <div className="receipt-details">
            <div className="detail-row" style={{ borderBottom: "1px dotted #000000" }}>
              <span className="detail-label">Receipt No:</span>
              <span className="detail-value">{receiptData.receiptNumber}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Payment ID:</span>
              <span className="detail-value">{receiptData.paymentId}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Order ID:</span>
              <span className="detail-value">{receiptData.orderId}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Date:</span>
              <span className="detail-value">{receiptData.paymentDate}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Student Name:</span>
              <span className="detail-value">{receiptData.studentName}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Email:</span>
              <span className="detail-value">{receiptData.studentEmail}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Course:</span>
              <span className="detail-value">{receiptData.courseName}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Batch Type:</span>
              <span className="detail-value">{receiptData.batchType}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Fee Type:</span>
              <span className="detail-value">{receiptData.feeType}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Payment Type:</span>
              <span className="detail-value">{receiptData.paymentType}</span>
            </div>
          </div>

          {/* Amount Section */}
          <div className="amount-section">
            <div className="detail-row">
              <span className="detail-label">Base Amount:</span>
              <span className="detail-value">{formatAmount(baseAmount)}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">GST (18%):</span>
              <span className="detail-value">{formatAmount(gstAmount)}</span>
            </div>
            <div className="detail-row total-amount">
              <span className="detail-label">Total Amount:</span>
              <span className="detail-value fw-bold">
                {formatAmount(receiptData.amount)}
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="footer text-center">
            <div className="thank-you fw-500 fs-5 text-primary mb-1">Thank you for your payment!</div>
            <div className="support-info">
              For any queries, please contact us at support@skramby.com or +91
              80 4567 8900
            </div>
            <div className="support-info mt-1">
              This is a computer-generated receipt and does not require a
              signature.
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ReceiptModal;
