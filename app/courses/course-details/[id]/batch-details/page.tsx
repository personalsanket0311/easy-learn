"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import BatchWithImageCard from "@/components/layout/batchDetails/BatchWithImageCard";
import { readAllCourseBatchesByCourseId } from "@/services/course-service";
import BackButton from "@/components/ui/backButton/BackButton";

type CourseBatchType = {
  _id: string;
  batchType: string;
  batchStartTime: string;
  batchEndTime: string;
  batchStartDate: string;
  course: {
    courseName: string;
  };
  trainer: {
    firstName: string;
    lastName: string;
  };
};

const SelectBatchesPage: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const [batches, setBatches] = useState<CourseBatchType[]>([]);

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await readAllCourseBatchesByCourseId(id as string);
        if (Array.isArray(response)) {
          setBatches(response);
        } else {
          console.error("Unexpected batch data format:", response);
        }
      } catch (error) {
        console.error("Error fetching batches:", error);
      }
    };

    if (id) {
      fetchBatches();
    }
  }, [id]);

  const groupedBatches: Record<string, CourseBatchType[]> = batches.reduce(
    (acc, batch) => {
      if (!acc[batch.batchType]) {
        acc[batch.batchType] = [];
      }
      acc[batch.batchType].push(batch);
      return acc;
    },
    {} as Record<string, CourseBatchType[]>
  );

  return (
    <div className="container mt-4 pt-5">
      <BackButton />

      <h2 className="mb-4">Select a Batch</h2>
      {Object.keys(groupedBatches).length > 0 ? (
        Object.entries(groupedBatches).map(([type, batchList]) =>
          batchList.map((batch, index) => (
            <BatchWithImageCard
              key={batch._id}
              title={`${type} Batch ${index + 1}`}
              startDate={batch.batchStartDate}
              description={batch.course.courseName}
              trainerName={`${batch.trainer.firstName} ${batch.trainer.lastName}`}
              imageUrl={`/images/image${Math.floor(Math.random() * 4 + 6)}.svg`}
              onSelect={() =>
                router.push(
                  `/courses/course-details/${id}/batch-details/confirm-batch/${batch._id}`
                )
              }
            />
          ))
        )
      ) : (
        <p>No batches available for this course.</p>
      )}
    </div>
  );
};
   
export default SelectBatchesPage;
