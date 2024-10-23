import Sidebar from "../components/Sidebar";
import { GoPeople } from "react-icons/go";
import { VscCollapseAll } from "react-icons/vsc";
import { IoMdAdd } from "react-icons/io";

import "../styles/home.css";
import TaskCard from "../components/TaskCard";
import { useState } from "react";
import TaskForm from "../components/TaskForm";

const columns = ["Backlog", "To do", "In progress", "Done"];
const tasks = [
  {
    id: 1,
    title: "Hero section",
    priority: "HIGH",
    status: "backlog",
    checklist: [
      { title: "Design layout", isCompleted: false },
      { title: "Write hero copy", isCompleted: false },
      { title: "Add CTA button", isCompleted: false },
    ],
  },
  {
    id: 2,
    title: "Typography change",
    priority: "MODERATE",
    status: "todo",
    checklist: [
      { title: "Select new font", isCompleted: false },
      { title: "Update headings", isCompleted: false },
      { title: "Update body text", isCompleted: false },
    ],
  },
  {
    id: 3,
    title: "Hero section",
    priority: "LOW",
    status: "inprogress",
    checklist: [
      { title: "Create hero image", isCompleted: false },
      { title: "Add scroll animations", isCompleted: false },
      { title: "Test responsiveness", isCompleted: false },
    ],
  },
  {
    id: 4,
    title: "Hero section",
    priority: "HIGH",
    status: "done",
    checklist: [
      { title: "Finalize design", isCompleted: true },
      { title: "Add hero text", isCompleted: true },
      { title: "Deploy changes", isCompleted: true },
    ],
  },
];

const Home = () => {
  const [showTaskForm, setShowTaskForm] = useState(false);

  return (
    <div className="home">
      <Sidebar />
      <div className="home-hero">
        <h2>Welcome! Harsh</h2>

        <div className="home-nav">
          <div>
            <h2>Board</h2>
            <p>
              <GoPeople /> Add People
            </p>
          </div>

          <select name="" id="">
            <option value="this-week">This week</option>
            <option value="this-week">This week</option>
            <option value="this-week">This week</option>
          </select>
        </div>

        <div className="board">
          {columns.map((columnName) => (
            <div className="column" key={columnName}>
              <div className="column-detail">
                <span>{columnName}</span>
                <span>
                  {columnName === "To do" && (
                    <IoMdAdd onClick={() => setShowTaskForm(true)} />
                  )}{" "}
                  <VscCollapseAll size={19} color="#707070" />
                </span>
              </div>

              <div className="column-content">
                {tasks
                  // .filter((task) => task.status === columnName.toLowerCase())
                  .map((task) => (
                    <TaskCard task={task} key={task.id} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showTaskForm && <TaskForm closeForm={() => setShowTaskForm(false)} />}
    </div>
  );
};

export default Home;
