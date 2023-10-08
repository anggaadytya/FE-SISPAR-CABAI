import React, { useState, useEffect } from "react";
import { baseURl } from "../../../constan";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const BarChart = () => {
  const [getData, setGetData] = useState([]);

  useEffect(() => {
    ambilData();
  }, []);

  const ambilData = async () => {
    try {
      const response = await fetch(`${baseURl}/api/hasil-deteksi`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setGetData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const labels = [
    "FOLD 1",
    "FOLD 2",
    "FOLD 3",
    "FOlD 4",
    "FOLD 5",
    "FOLD 6",
    "FOLD 7",
    "FOLD 8",
    "FOLD 9",
    "FOLD 10",
  ];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "HASIL DETEKSI",
        backgroundColor: "#01924f",
        borderColor: "rgb(255, 99, 132)",
        data: getData.map((data) => data),
      },
    ],
  };
  return (
    <div>
      <Bar data={data} />
    </div>
  );
};

export default BarChart;
