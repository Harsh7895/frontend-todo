import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/task.css";
import { FiCodesandbox } from "react-icons/fi";
import { formatDate } from "../utils/required";

const Task = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(
          `https://backend-todo-tan.vercel.app/api/v1/task/${taskId}`,
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          return <div style={{ padding: "20px" }}>No task found</div>;
        }
        const data = await response.json();
        setTask(data.task);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  if (loading) {
    return <div style={{ padding: "20px" }}> Loading...</div>;
  }

  if (error) {
    return <div style={{ padding: "20px" }}>Error: {error}</div>;
  }

  if (!task) {
    return <div style={{ padding: "20px" }}>No task found</div>;
  }

  return (
    <div className="task-container">
      <div className="card">
        <div className="task-nav">
          <p>
            <span
              className={`priority-bg-${task.priority.toLowerCase()} task-color`}
            >
              .
            </span>{" "}
            {task.priority.toUpperCase()} PRIORITY{" "}
          </p>
        </div>
        <h1 className="title">{task.title || "Hero section"}</h1>
        <div className="checklist">
          <h2 className="checklist-title">
            Checklist (
            {task.checklist.filter((item) => item.isCompleted).length}/
            {task.checklist.length})
          </h2>
          <ul className="task-list">
            {task.checklist.map((item, index) => (
              <li
                key={index}
                className={`task-item ${item.isCompleted ? "done" : ""}`}
              >
                {/* Make checkbox read-only */}
                <input type="checkbox" checked={item.isCompleted} readOnly />
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
        {task.dueDate && (
          <div className="due-date">
            <span className="due-date-label">Due Date</span>
            <span className="due-date-value">{formatDate(task.dueDate)}</span>
          </div>
        )}
      </div>

      <h2 className="app-logo" onClick={() => navigate("/")}>
        <FiCodesandbox size={20} />
        Pro Manage
      </h2>
    </div>
  );
};

export default Task;
