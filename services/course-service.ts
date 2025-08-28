import axios from "axios";

const apiBaseUrl: string = process.env.NEXT_PUBLIC_SERVER || "";

// Read upcomiing course batches
const readUpcomingCourseBatches = async() =>{
  let url = `${apiBaseUrl}/website/find-all-course-batches-for-web`;
  try {
    const response = await axios.get(url);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Read all courses (page 1)
const readAllCourses = async() =>{
  let url = `${apiBaseUrl}/website/find-all-courses-for-web`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Read course by course id (page 2)
const readCourseByCourseId = async (courseId:any) => {
  
  let url = `${apiBaseUrl}/website/find-course-by-course-id-for-web/${courseId}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Read all Course batches by Course ID (page 3)
export const readAllCourseBatchesByCourseId = async (courseId: string) => {
  const url = `${apiBaseUrl}/website/find-all-course-batches-by-course-id-for-web/${courseId}`;
  try {
    const response = await axios.get(url);

   
    if (Array.isArray(response.data?.data?.courseBatches)) {
      return response.data.data.courseBatches;
    } else {
      console.error("Unexpected API response:", response.data);
      return [];
    }
  } catch (error) {
    console.error("API Error fetching batches:", error);
    return [];
  }
};


// Read Course batch by batch ID (page 4)
export const readCourseBatcheByBatchId = async (batchId: string)  => {

  let url = `${apiBaseUrl}/website/find-course-batch-by-id-for-web/${batchId}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};



const CourseService = {
  readUpcomingCourseBatches,
  readAllCourses,
  readCourseByCourseId,
  readAllCourseBatchesByCourseId,
  readCourseBatcheByBatchId,
};

export default CourseService;
