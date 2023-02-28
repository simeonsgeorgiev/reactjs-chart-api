import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
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
    Legend
  );

const LineChart = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
            `https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${process.env.REACT_APP_API_KEY}`
        );

        const lists = response.data.results.lists;

        if (!lists || !Array.isArray(lists)) {
          throw new Error("Invalid API response");
        }

        // Flatten all books into a single array
        const books = lists.flatMap((list) => list.books); //console.log(books)

        // Sort books by weeks_on_list in descending order and take the top 10
        const top10Books = books.sort((a, b) => b.weeks_on_list - a.weeks_on_list).slice(0, 10); //console.log(top10Books)
        const labels = top10Books.map((book) => book.title); 

        setData({
          labels,
          datasets: [
            {
              label: 'Weeks on List',
              data: top10Books.map((book) => book.weeks_on_list),
              fill: false,
              borderColor: "#36A2EB",
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
          ],
        });
        
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Top 10 Books by Weeks on List</h2>
      {Object.keys(data).length > 0 ? <Line data={data} /> : <div>Loading...</div>}
    </div>
  );
};

export default LineChart;
