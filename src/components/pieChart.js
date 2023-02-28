import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
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

        // Flatten the book data and group by author
        const booksByAuthor = lists.flatMap((list) => list.books)
          .reduce((groupedBooks, book) => {
            const author = book.author;
            if (!groupedBooks[author]) {
              groupedBooks[author] = 0;
            }
            groupedBooks[author]++;
            return groupedBooks;
          }, {});

        // Convert the grouped data to label and dataset format
        const labels = Object.keys(booksByAuthor);
        const bookCounts = Object.values(booksByAuthor);

        // Get random colors
        const colors = labels.map(() => {
          return '#' + Math.floor(Math.random()*16777215).toString(16);
        });

        setData({
          labels: labels,
          datasets: [
            {
              label: '# of Books',
              data: bookCounts,
              backgroundColor: colors,
              borderColor: colors,
              borderWidth: 1,
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
      <h2>Number of Books by Author</h2>
      {Object.keys(data).length > 0 ? <Pie data={data} /> : <div>Loading...</div>}
    </div>
  );
};

export default PieChart;
