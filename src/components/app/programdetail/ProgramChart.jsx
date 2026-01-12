import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './ProgramChart.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const FundraisingChart = () => {
  // Data based on the visual bars in your image
  const staticData = [
    { day: 'Sun', value: 480 },
    { day: 'Mon', value: 1000 },
    { day: 'Tue', value: 850 },
    { day: 'Wed', value: 350 },
    { day: 'Thu', value: 550 },
    { day: 'Fri', value: 150 },
    { day: 'Sat', value: 1000 },
    { day: 'Sun', value: 380 },
    { day: 'Mon', value: 550 },
  ];

  const chartLabels = staticData.map((d) => d.day);
  const chartData = staticData.map((d) => d.value);

  const data = {
    labels: chartLabels,
    datasets: [
      {
        data: chartData,
        // Alternating colors: Black for even, Light Lavender for odd
        backgroundColor: (context) => {
          const index = context.dataIndex;
          return index % 2 === 0 ? '#000000' : '#E2D4E7';
        },
        borderWidth: 0,
        borderRadius: 0, // Set to 0 for the sharp rectangular look in the image
        barThickness: 25,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => `$${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: '#9ca3af',
          font: { size: 12 },
        },
      },
      y: {
        beginAtZero: true,
        max: 1000,
        ticks: {
          stepSize: 250,
          color: '#9ca3af',
          // Adds the $ sign to the Y axis
          callback: (value) => `$${value}`,
        },
        grid: {
          drawBorder: false,
          color: '#f3f4f6', // Light grid lines
        },
      },
    },
  };

  return (
    <div className="w-full bg-white rounded-[15px] p-4 flex flex-col gap-2">
  <h2 className="font-semibold text-base md:text-lg ">
Donation Trends
      </h2>
     <div className='overflow-x-auto w-full  maintable'>
       <div className='  block sm:hidden'>
            <div className="min-w-[400px] h-[350px]">
        <Bar data={data} options={options} />
      </div>
      </div>
       <div className=' hidden sm:block'>
          <div className="min-w-[531px] h-[350px] "> 
             <Bar data={data} options={options} />
          </div>

       </div>

     </div> 
   
    </div>
  );
};

export default FundraisingChart;