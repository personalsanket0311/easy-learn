'use client';

import React from 'react';
import PurchaseCourse from '@/components/layout/purchaseSuccessfully/Purchase-course';

const PurchaseSuccess = () => {
    return (
        <div className="container py-5 text-center">
            
            <div className="mb-4 d-flex justify-content-center">
                <img
                    src="./images/purchaseSuccess.svg"
                    alt="Success"
                    className="img-fluid rounded" />
            </div>


            <h2 className="fw-bold">Purchase Successful!</h2>
            <p className="text-muted mb-5">
                You’ve successfully enrolled in the course. Get ready to learn and grow!
            </p>
            <PurchaseCourse />
        </div>
    );
};

export default PurchaseSuccess;
