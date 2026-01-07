import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const BookedChart = () => {
  const data = {
    labels: ['Jun', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    datasets: [
      {
        fill: true,
        label: 'Founds',
        // Example data matching the visual peaks and valleys in your image
        data: [54, 32, 58, 35, 25, 50, 15, 35, 68, 55, 78],
        borderColor: '#B088FF', // Purple/Blue gradient feel
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, 'rgba(176, 136, 255, 0.2)');
          gradient.addColorStop(1, 'rgba(176, 136, 255, 0)');
          return gradient;
        },
        tension: 0.4, // This creates the smooth curve (spline)
        pointRadius: (context) => {
           // Only show white circles for specific data points like in your image
           const indices = [2, 3, 5, 7, 8]; 
           return indices.includes(context.dataIndex) ? 6 : 0;
        },
        pointBackgroundColor: '#fff',
        pointBorderColor: '#B088FF',
        pointBorderWidth: 2,
        hoverPointRadius: 8,
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
  backgroundColor: '#030229', // Dark background matching the image
  titleColor: '#8E8EA1',      // Grayish title text
  titleAlign: 'center',       // Center the "Founds" text
  titleFont: {
    size: 12,
    weight: 'normal',
  },
  bodyColor: '#fff',          // White color for the number
  bodyAlign: 'center',        // Center the 2,678 number
  bodyFont: {
    size: 16,
    weight: 'bold',
  },
  padding: {
    top: 10,
    bottom: 10,
    left: 15,
    right: 15
  },
  cornerRadius: 10,           // Rounded corners for the box
  displayColors: false,       // Removes the colored square icon
  caretSize: 6,               // Size of the arrow at the bottom
  caretPadding: 5,            // Distance from the point
  
  callbacks: {
    // This ensures "Founds" is the top line
    title: () => 'Founds',
    // This formats the number on the second line
    label: (context) => context.raw.toLocaleString(),
  },
},
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: { stepSize: 20, color: '#A3AED0' },
        grid: { color: '#F4F7FE', drawBorder: false },
      },
      x: {
        grid: { display: false, drawBorder: false },
        ticks: { color: '#A3AED0' },
      },
    },
  };

  return (
    <div style={{ height: '300px' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default BookedChart;