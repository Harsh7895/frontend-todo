import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import "../styles/taskform.css";

{
  /* eslint-disable */
}
export default function TaskForm({ closeForm }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [checklist, setChecklist] = useState([
    { id: 1, text: "Done Task", done: true },
    { id: 2, text: "Task to be done", done: false },
    { id: 3, text: "Task to be done", done: false },
  ]);
  const [dueDate, setDueDate] = useState("2024-08-02");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, priority, checklist, dueDate });
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
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
