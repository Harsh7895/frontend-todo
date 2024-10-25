import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import toast from "react-hot-toast";
import "../styles/taskform.css";
import AllEmails from "./AllEmails";

const createUrl = "http://localhost:3000/api/v1/task/create";
const updateUrl = "http://localhost:3000/api/v1/task/update";

{
  /* eslint-disable */
}
export default function TaskForm({ closeForm, task = null }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [checklist, setChecklist] = useState([]);
  const [dueDate, setDueDate] = useState("");
  const [assignee, setAssignee] = useState("");
  const [showAssigneeMails, setShowAssigneeMails] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setPriority(task.priority);
      setChecklist(task.checklist || []);
      setDueDate(
        task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 10) : ""
      );
      setAssignee(task.assigneeId);
    }
  }, [task]);

  const handleAddChecklist = () => {
    const newId =
      checklist.length > 0
        ? Math.max(...checklist.map((item) => item.id)) + 1
        : 1;
    setChecklist([...checklist, { id: newId, text: "", done: false }]);
  };

  const handleChecklistChange = (id, field, value) => {
    setChecklist(
      checklist.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleRemoveChecklistItem = (id) => {
    setChecklist(checklist.filter((item) => item.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      title,
      priority,
      checklist,
      dueDate,
      assigneeId: assignee,
    };

    const token = localStorage.getItem("token");
    if (!token) return toast.error("Please login first.");

    try {
      const response = await fetch(task ? updateUrl : createUrl, {
        method: task ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success(`Task ${task ? "updated" : "created"} successfully!`);
        console.log(
          `Task ${task ? "updated" : "created"} successfully:`,
          result
        );

        setTitle("");
        setPriority("");
        setChecklist([]);
        setDueDate("");
        setAssignee("");

        closeForm();
      } else {
        const errorResponse = await response.json();
        toast.error(
          errorResponse.message ||
            `Failed to ${task ? "update" : "create"} task`
        );
        console.error(
          `Failed to ${task ? "update" : "create"} task:`,
          errorResponse
        );
      }
    } catch (error) {
      toast.error(
        `An error occurred while ${task ? "updating" : "creating"} the task.`
      );
      console.error(`Error ${task ? "updating" : "creating"} task:`, error);
    }
  };

  return (
    <div className="task-form-container">
      <form className="task-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">
            Title <span className="required">*</span>
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="assign-to">
          <label htmlFor="assign-to">Assign To:</label>
          <input
            type="text"
            placeholder="Add an assignee"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            style={{ position: "relative" }}
            onClick={() => setShowAssigneeMails(true)}
          />
          <>
            {showAssigneeMails && (
              <AllEmails height={"512px"} width={"282px"} />
            )}
          </>
        </div>

        <div className="form-group select-priority">
          <label>
            Select Priority <span className="required">*</span>
          </label>
          <div className="priority-options">
            {["HIGH", "MODERATE", "LOW"].map((option) => (
              <label key={option} className="priority-label">
                <input
                  type="radio"
                  name="priority"
                  value={option}
                  checked={priority === option}
                  onChange={(e) => setPriority(e.target.value)}
                  required
                />
                <span className={`priority-text ${option.toLowerCase()}`}>
                  {option} PRIORITY
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>
            Checklist ({checklist.filter((item) => item.done).length}/
            {checklist.length}) <span className="required">*</span>
          </label>
          <div className="checklist-items">
            {checklist.map((item) => (
              <div key={item.id} className="checklist-item">
                <input
                  type="checkbox"
                  checked={item.done}
                  onChange={(e) =>
                    handleChecklistChange(item.id, "done", e.target.checked)
                  }
                />
                <input
                  type="text"
                  value={item.text}
                  onChange={(e) =>
                    handleChecklistChange(item.id, "text", e.target.value)
                  }
                  placeholder="Enter task"
                />
                <button
                  type="button"
                  className="remove-item"
                  onClick={() => handleRemoveChecklistItem(item.id)}
                >
                  <MdDelete size={25} color="#CF3636" />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="add-checklist"
            onClick={handleAddChecklist}
          >
            <IoMdAdd size={20} /> Add New
          </button>
        </div>

        <div className="form-actions">
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="select-date"
          />
          <div className="button-group">
            <button type="button" className="cancel" onClick={closeForm}>
              Cancel
            </button>
            <button type="submit" className="save">
              {task ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
