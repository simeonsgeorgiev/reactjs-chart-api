import PieChart from "./components/pieChart";
import LineChart from "./components/lineChart";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1 className="title">Sample Charts</h1>
      <div className="chart-container">
        <div className="chart-column">
          <PieChart />
        </div>
        <div className="chart-column">
          <LineChart />
        </div>
      </div>
    </div>
  );
}

export default App;
