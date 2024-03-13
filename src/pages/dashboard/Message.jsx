
import React from 'react';
import { Typography } from '@mui/material';
import { useQuery } from 'react-query';
import { httpInterceptedService } from '../../core/http-service';
import PeopleTable from './PeopleTable';


const fetchCourses = async () => {
  const response = await  httpInterceptedService.get(`${BASE_URL}/course`);
  return response.data;
};

const useCourses = () => {
  return useQuery('courses', fetchCourses);
};

const Message = () => {
  const { data: courses, isLoading, isError } = useCourses();

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error fetching data</Typography>;

  const titles = ['Title', 'Category', 'Instructor']; // Example titles

  // Assuming your API returns data in the format of [{ title: '', category: '', instructor: '' }, ...]
  const people = courses.map(course => ({
    name: course.title,
    age: course.category,
    country: course.instructor
  }));

  return (
    <div>
      <PeopleTable titles={titles} people={people} />
    </div>
  );
};

export default Message;

