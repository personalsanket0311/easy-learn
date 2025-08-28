'use client'
import React from 'react'
import CustomButton from '@/components/ui/custom-button/CustomButton'
import CustomTimeline from '@/components/ui/custom-timeline/CustomTimeline'
import Image from 'next/image'
import payImg from '../../../../../public/payImg.png'

const installmentsData = [
  {
    title: "Installment 1",
    date: "July 15, 2025",
    amount: "16000",
    status: "Paid" as const,
    icon: 'pi pi-circle-fill'
  },
  {
    title: "Installment 2",
    date: "August 15, 2025",
    amount: "16000",
    status: "Due" as const,
    icon: 'pi pi-circle'
  },
  {
    title: "Installment 3",
    date: "September 15, 2025",
    amount: "16000",
    status: "Due" as const,
    icon: 'pi pi-circle'
  }
];

const MyPayments = () => {
  return (
    <div className='card border-1 rounded-4 shadow-sm'>
      <div className='card-body py-3'>
        <h5 className="card-title fw-bold pb-2 text-dark">Data Science Course</h5>
        <div className='w-100 d-flex justify-content-center'>
          <Image className='rounded-4 object-fit-cover' src={payImg} alt='payImg' width={1000} height={300} />
        </div>

        <div className='d-flex justify-content-between align-items-center flex-wrap gap-3'>
          <div className='pt-4'>
            <CustomTimeline installments={installmentsData} />
          </div>
          <div className='d-flex justify-content-end pr-4'>
            <CustomButton label='Pay Now' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyPayments