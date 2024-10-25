import "../styles/taskcard.css";
import { SlOptions } from "react-icons/sl";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useEffect, useState } from "react";
import { formatDate } from "../utils/required";
import toast from "react-hot-toast";
import DeletePopUp from "./DeletePopUp";
import TaskForm from "./TaskForm";

{
  /* eslint-disable */
}
const TaskCard = ({ task, columns, onStatusChange, collapseAll }) => {
  const [checklist, setChecklist] = useState(task.checklist);
  const [showCheckList, setShowCheckList] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  useEffect(() => {
    setShowCheckList(false);
  }, [collapseAll]);
  const completedCount = checklist.filter((item) => item.isCompleted).length;

  const handleCheckboxChange = async (index) => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Login first to update checklist");

    const newChecklist = [...checklist];
    const newStatus = !newChecklist[index].isCompleted;
    newChecklist[index].isCompleted = newStatus;
    setChecklist(newChecklist);

    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/task/update-task/${task._id}/checklist/${index}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ isCompleted: newStatus }),
        }
      );

      if (!response.ok) {
        toast.error("Failed to update checklist item");
        setChecklist(checklist);
      }
    } catch (error) {
      console.error("Error updating checklist item:", error);
      setChecklist(checklist);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Login first to change task status");

    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/task/update-task/${task._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (response.ok) {
        onStatusChange();
      } else {
        console.error("Failed to update status:", await response.json());
      }
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const copyToClipboard = async () => {
    try {
      const sharedLink = `${window.location.origin}?taskId=${task._id}`;
      await navigator.clipboard.writeText(sharedLink);
      setIsShared(true);
      setShowOptions(false);
      setTimeout(() => {
        setIsShared(false);
      }, 2000);
    } catch (err) {
      toast.error("Failed to copy link.");
    }
  };

  return (
    <>
      <div className="task-card">
        <div className="task-nav">
          <p>
            <span
              className={`priority-bg-${task.priority.toLowerCase()} task-color`}
            >
              .
            </span>{" "}
            {task.priority.toUpperCase()} PRIORITY{" "}
            <span className="task-assigned-to">{task.assignedTo}</span>
          </p>
          <div style={{ position: "relative" }}>
            <SlOptions onClick={() => setShowOptions((prev) => !prev)} />

            {showOptions && (
              <div className="card-options">
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setShowOptions(false);
                  }}
                >
                  Edit
                </button>
                <button onClick={copyToClipboard}>Share</button>
                <button
                  className="delete"
                  onClick={() => {
                    setShowDeletePopup(true);
                    setShowOptions(false);
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        <h3>{task.title}</h3>
        <p>
          Checklist ({completedCount}/{checklist.length}){" "}
          {showCheckList ? (
            <IoIosArrowUp onClick={() => setShowCheckList(!showCheckList)} />
          ) : (
            <IoIosArrowDown onClick={() => setShowCheckList(!showCheckList)} />
          )}
        </p>

        {showCheckList && (
          <div className="todo-tasks">
            {checklist.map((item, index) => (
              <div key={index} className="task-item">
                <input
                  type="checkbox"
                  checked={item.isCompleted}
                  onChange={() => handleCheckboxChange(index)}
                />
                <label className={item.isCompleted ? "completed" : ""}>
                  {item.text}
                </label>
              </div>
            ))}
          </div>
        )}

        <div className="task-footer">
          <div className="date">
            {task?.dueDate ? formatDate(task.dueDate) : ""}
          </div>
          <div>
            {columns.map((c) => (
              <span key={c} onClick={() => handleStatusUpdate(c)}>
                {c}
              </span>
            ))}
          </div>
        </div>

        {showDeletePopup && (
          <DeletePopUp
            closePopUp={() => setShowDeletePopup(false)}
            taskId={task._id}
            onDeleteTask={onStatusChange}
          />
        )}
      </div>
      {isShared && <div className="shared-task-toast">Link Copied</div>}
      {isEditing && (
        <TaskForm task={task} closeForm={() => setIsEditing(false)} />
      )}
    </>
  );
};

export default TaskCard;
