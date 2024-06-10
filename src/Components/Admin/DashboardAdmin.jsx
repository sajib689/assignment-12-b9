import React, { useState, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Loader from "../../Utilities/Loader";
import NodataFound from "../../Utilities/NodataFound";
import useAxiosSecure from './../../Hooks/useAxiosSecure';

const DashboardAdmin = () => {
  const axiosPublic = useAxiosSecure();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosPublic.get('/applications');
        const applications = res.data;

        
        const applicationCounts = countApplicationsByDate(applications);
        setData(applicationCounts);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [axiosPublic]);

  
  const countApplicationsByDate = (applications) => {
    
    const counts = applications.reduce((acc, application) => {
      const date = application.date; 
      if (acc[date]) {
        acc[date] += 1;
      } else {
        acc[date] = 1;
      }
      return acc;
    }, {});

    
    const data = Object.keys(counts).map((date) => ({
      date, 
      count: counts[date],
    }));

    return data;
  };

  if (isLoading) return <Loader />;
  if (data.length === 0) return <NodataFound />;

  return (
    <div>
      <h1 className="text-3xl font-bold mt-5 mb-5">Application</h1>
      <LineChart width={800} height={400} data={data}>
        <Line type="monotone" dataKey="count" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
      </LineChart>
    </div>
  );
};

export default DashboardAdmin;
