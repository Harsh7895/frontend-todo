import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { GoPeople } from "react-icons/go";
import { VscCollapseAll } from "react-icons/vsc";
import { IoMdAdd } from "react-icons/io";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import toast from "react-hot-toast";

import "../styles/home.css";
import AddToBoard from "../components/AddToBoard";

const columns = ["Backlog", "To do", "In progress", "Done"];

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [addToBoardPopUp, setAddToBoardPopUp] = useState(false);
  const [userName, setUserName] = useState("");
  const [collapseAll, setCollapseAll] = useState(
    columns.reduce((acc, column) => ({ ...acc, [column]: true }), {})
  );

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Login first to access tasks");

    try {
      const response = await fetch(
        "https://todo-backend-henna-ten.vercel.app/api/v1/task/user-tasks",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        setTasks(result.tasks);
      } else {
        console.error("Failed to fetch tasks:", await response.json());
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserName = async () => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Login first to access tasks");

    try {
      const response = await fetch(
        "https://todo-backend-henna-ten.vercel.app/api/v1/user/username",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        setUserName(result.userName);
      } else {
        console.error("Failed to fetch user:", await response.json());
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchUserName();
  }, []);

  return (
    <div className="home">
      <Sidebar />
      <div className="home-hero">
        <h2>Welcome! {userName}</h2>

        <div className="home-nav">
          <div>
            <h2>Board</h2>
            <p onClick={() => setAddToBoardPopUp(true)}>
              <GoPeople /> Add People
            </p>
          </div>

          <select name="" id="">
            <option value="this-week">This week</option>
            <option value="this-week">This month</option>
            <option value="this-week">This year</option>
          </select>
        </div>

        <div className="board">
          {loading ? (
            <p>Loading tasks...</p>
          ) : (
            columns.map((columnName) => (
              <div className="column" key={columnName}>
                <div className="column-detail">
                  <span>{columnName}</span>
                  <span>
                    {columnName === "To do" && (
                      <IoMdAdd onClick={() => setShowTaskForm(true)} />
                    )}
                    <VscCollapseAll
                      size={19}
                      color="#707070"
                      onClick={() =>
                        setCollapseAll((prev) => ({
                          ...prev,
                          [columnName]: !prev[columnName],
                        }))
                      }
                    />
                  </span>
                </div>

                <div className="column-content">
                  {tasks
                    .filter((task) => task.status === columnName)
                    .map((task) => (
                      <TaskCard
                        task={task}
                        key={task._id}
                        columns={columns.filter((c) => c !== columnName)}
                        onStatusChange={fetchTasks}
                        collapseAll={collapseAll}
                        currentColumn={columnName}
                      />
                    ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {showTaskForm && (
        <TaskForm
          closeForm={() => setShowTaskForm(false)}
          onCreate={fetchTasks}
        />
      )}

      {addToBoardPopUp && (
        <AddToBoard close={() => setAddToBoardPopUp(false)} />
      )}
    </div>
  );
};

export default Home;
