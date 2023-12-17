// Import necessary dependencies
import React from "react";
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';  

// Your existing chart data
const exampleChartData = {
  labels: ["2016", "2017", "2018", "2019", "2020"],
  datasets: [
    {
      label: "Users Gained",
      data: [150, 300, 500, 700, 900],
      fill: false,
      borderColor: "rgb(75, 192, 100)",
      tension: 0.1
    }
  ]
};

// Your Branches component
const Branches = () => (
    <div className="container-lg">
      <div className="branches">
        <h2 className="display-7 text-light fw-bold mx-3 mt-3">View All Branches</h2>
        <p className="text-light ms-3">List of branches available in JoSAA counselling. </p>
      </div>
      {/* Render the Line Chart component directly */}
      <div className="chart-container">
        <Line
          data={exampleChartData}
          options={{
            scales: {
              x: {
                type: 'linear',
                position: 'bottom',
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)' // Customize the color of the x-axis grid lines
                },
                ticks: {
                  color: 'white' // Customize the color of the x-axis ticks
                }
              },
              y: {
                type: 'linear',
                position: 'left',
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)' // Customize the color of the y-axis grid lines
                },
                ticks: {
                  color: 'white' // Customize the color of the y-axis ticks
                }
              }
            },
            maintainAspectRatio: true,
            responsive: true,
            plugins: {
              legend: {
                labels: {
                  color: 'white' // Customize the color of the legend labels
                }
              }
            }
          }}
        />
      </div>
    </div>
  );
  

export default Branches;
