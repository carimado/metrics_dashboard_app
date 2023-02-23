import './App.css';
import Sidebar from './Sidebar'
import MetricCard from './MetricCard';
import Header from './Header';



function App() {
  return (
    <div className="App">
      {/* <div style={{backgroundImage: `url(${banner})`}}></div> */}
      <Sidebar className="sidebar"/>
      <div className="dashboard-container">
        <Header className="header"/>
        <div className="card-container">
          <MetricCard  />
          <MetricCard  />
          <MetricCard  />
          <MetricCard  />
          <MetricCard  />
          <MetricCard  />
        </div>
      </div>
    </div>
  );
}

export default App;
