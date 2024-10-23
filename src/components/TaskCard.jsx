import "../styles/taskcard.css";
import { SlOptions } from "react-icons/sl";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useState } from "react";

{
  /* eslint-disable */
}
const TaskCard = ({ task }) => {
  const [checklist, setChecklist] = useState(task.checklist);
  const [showCheckList, setShowCheckList] = useState(false);

  const handleCheckboxChange = (index) => {
    const newChecklist = [...checklist];
    newChecklist[index].isCompleted = !newChecklist[index].isCompleted;
    setChecklist(newChecklist);
  };

  return (
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
        <SlOptions />
      </div>

      <h3>{task.title}</h3>
      <p>
        Checklist ({checklist.length}){" "}
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
                {item.title}
              </label>
            </div>
          ))}
        </div>
      )}

      <div className="task-footer">
        <span className={`priority priority-${task.priority.toLowerCase()}`}>
          {task.priority}
        </span>
        <span>{task.date}</span>
      </div>
    </div>
  );
};

export default TaskCard;
