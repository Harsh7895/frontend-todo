import "../styles/deletepopup.css";
import toast from "react-hot-toast";

{
  /* eslint-disable */
}
const DeletePopUp = ({ closePopUp, taskId, onDeleteTask }) => {
  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Login first to delete tasks");

    try {
      const response = await fetch(
        `https://backend-todo-tan.vercel.app/api/v1/task/delete/${taskId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        toast.success("Task deleted successfully");
        onDeleteTask();
        closePopUp();
      } else {
        const errorData = await response.json();
        toast.error(`Failed to delete task: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Server error while deleting task");
    }
  };

  return (
    <div className="delete-popup-container">
      <div className="delete-popup-main">
        <p>Are you sure you want to delete?</p>
        <button className="dlt-btn" onClick={handleDelete}>
          Yes, Delete
        </button>
        <button className="cancel-btn" onClick={closePopUp}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeletePopUp;
