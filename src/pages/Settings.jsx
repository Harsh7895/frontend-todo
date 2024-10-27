import Sidebar from "../components/Sidebar";
import { MdOutlineMailOutline, MdLockOutline } from "react-icons/md";
import { RxPerson } from "react-icons/rx";
import "../styles/setting.css";
import { useState } from "react";
import toast from "react-hot-toast";

const Settings = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    oldPassword: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const updateUser = async () => {
    setLoading(true);

    const updateData = {};
    let updateCount = 0;

    if (formData.name) {
      updateData.name = formData.name;
      updateCount++;
    }
    if (formData.email) {
      updateData.email = formData.email;
      updateCount++;
    }

    if (formData.oldPassword && formData.newPassword) {
      updateData.oldPassword = formData.oldPassword;
      updateData.newPassword = formData.newPassword;
      updateCount++;

      if (formData.oldPassword === formData.newPassword)
        return toast.error("Old Password and New Password can't be same");
    }

    if (updateCount > 1) {
      toast.error(
        "Please update only one field at a time: name, email, or password."
      );
      setLoading(false);
      return;
    }

    if (
      (formData.oldPassword && !formData.newPassword) ||
      (!formData.oldPassword && formData.newPassword)
    ) {
      toast.error("Please enter both Old Password and New Password");
      setLoading(false);
      return;
    }

    if (Object.keys(updateData).length === 0) {
      toast.error("Please fill in at least one field to update.");
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      return toast.error("Login First!");
    }
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/user/update-user",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updateData),
        }
      );

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Error updating user");

      toast.success("User updated successfully!");
      setFormData({
        name: "",
        email: "",
        oldPassword: "",
        newPassword: "",
      });
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="setting">
      <Sidebar />
      <div className="setting-hero">
        <h3>Settings</h3>

        <form className="setting-form">
          <div className="input-group">
            <RxPerson size={25} />
            <input
              type="text"
              id="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <MdOutlineMailOutline size={25} />
            <input
              type="email"
              id="email"
              placeholder="Update Email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <MdLockOutline size={25} />
            <input
              type="password"
              id="oldPassword"
              placeholder="Old Password"
              value={formData.oldPassword}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <MdLockOutline size={25} />
            <input
              type="password"
              id="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <button
            type="button"
            onClick={updateUser}
            disabled={loading}
            className="update-button"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
