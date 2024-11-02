import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import "../styles/analytics.css";

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "https://backend-todo-tan.vercel.app/api/v1/user/get-analytics",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (!response.ok) {
          console.log(data);
        }
        console.log(data);
        setAnalyticsData(data.analytics);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="analytics">
      <Sidebar />
      <div className="analytics-hero">
        <h3>Analytics</h3>
        <div className="analytics-card-container">
          <div className="analytics-card">
            <div className="analytic">
              <p>
                <span className="task-color">.</span> BackLog Tasks
              </p>
              <span className="value">{analyticsData?.backlogCount}</span>
            </div>
            <div className="analytic">
              <p>
                <span className="task-color">.</span> To-do Tasks
              </p>
              <span className="value">{analyticsData?.todoCount}</span>
            </div>
            <div className="analytic">
              <p>
                <span className="task-color">.</span> In-Progress Tasks
              </p>
              <span className="value">{analyticsData?.inProgressCount}</span>
            </div>
            <div className="analytic">
              <p>
                <span className="task-color">.</span> Completed Tasks
              </p>
              <span className="value">{analyticsData?.completedCount}</span>
            </div>
          </div>
          <div className="analytics-card">
            <div className="analytic">
              <p>
                <span className="task-color">.</span> Low Priority
              </p>
              <span className="value">{analyticsData?.lowPriorityCount}</span>
            </div>
            <div className="analytic">
              <p>
                <span className="task-color">.</span> Moderate Priority
              </p>
              <span className="value">
                {analyticsData?.moderatePriorityCount}
              </span>
            </div>
            <div className="analytic">
              <p>
                <span className="task-color">.</span> High Priority
              </p>
              <span className="value">{analyticsData?.highPriorityCount}</span>
            </div>
            <div className="analytic">
              <p>
                <span className="task-color">.</span> Due Date Tasks
              </p>
              <span className="value">{analyticsData?.dueDateCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
