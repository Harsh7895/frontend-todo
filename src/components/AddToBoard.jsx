import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import "../styles/addtoboard.css";
import AllEmails from "./AllEmails";

const shareBoardUrl = "http://localhost:3000/api/v1/task/share-board";

{
  /*eslint-disable */
}
const AddToBoard = ({ close }) => {
  const [showAllEmails, setShowAllEmails] = useState(false);
  const [isBoardShared, setIsBoardShared] = useState(false);
  const [assignee, setAssignee] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowAllEmails(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleShareBoard = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return toast.error("Please login first.");
    }

    try {
      const response = await fetch(shareBoardUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: assignee }),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success("Board shared successfully!");
        setIsBoardShared(true);
      } else {
        const errorResponse = await response.json();
        toast.error(errorResponse.message || "Failed to share board");
      }
    } catch (error) {
      toast.error("An error occurred while sharing the board.");
    }
  };

  return (
    <div className="add-to-board">
      {!isBoardShared ? (
        <div className="add-to-board-container" ref={containerRef}>
          <p>Add people to the board</p>
          <input
            type="text"
            placeholder="Enter the email"
            onClick={() => setShowAllEmails(true)}
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
          />
          {showAllEmails && (
            <div className="all-emails-dropdown">
              <AllEmails
                height={"250px"}
                width={"80%"}
                assignee={assignee}
                setAssignee={setAssignee}
                close={() => setShowAllEmails(false)}
              />
            </div>
          )}
          <div className="btns">
            <button className="cancel-btn" onClick={close}>
              Cancel
            </button>
            <button
              className="add-email-btn"
              onClick={handleShareBoard}
              disabled={!assignee}
            >
              Add Email
            </button>
          </div>
        </div>
      ) : (
        <div className="add-to-board-container after-added">
          <p style={{ textAlign: "center" }}>{assignee} added to board</p>
          <button className="add-email-btn" onClick={close}>
            Okay, got it
          </button>
        </div>
      )}
    </div>
  );
};

export default AddToBoard;
