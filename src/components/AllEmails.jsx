import { useEffect, useState } from "react";
import "../styles/allemails.css";
import toast from "react-hot-toast";
{
  /*eslint-disable */
}
const AllEmails = ({ height, width, assignee, setAssignee, close = null }) => {
  const [emails, setEmails] = useState([]);

  const getEmails = async () => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Please login first.");
    try {
      const res = await fetch(
        "http://localhost:3000/api/v1/task/allAssigneeEmails",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        const result = await res.json();
        setEmails(result.emails);
      } else {
        const result = await res.json();
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getEmails();
  }, []);

  return (
    <div
      className="all-email-container"
      style={{ height: height, width: width }}
    >
      {emails.map((mail, ind) => (
        <p key={ind}>
          <span className="email-sign">{mail.slice(0, 2).toUpperCase()}</span>
          {mail}
          <button
            type="button"
            onClick={() => {
              setAssignee(mail);
              close();
            }}
          >
            {assignee === mail ? "Assigned" : "Assign"}
          </button>
        </p>
      ))}
    </div>
  );
};

export default AllEmails;
