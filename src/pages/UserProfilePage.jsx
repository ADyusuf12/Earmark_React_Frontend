import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import ProfileCard from "../components/ProfileCard";
import "../styles/profile.css";

function UserProfilePage() {
  const { token } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/user_profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data);
        setForm(res.data.profile);
      } catch {
        setMessage("Failed to load profile");
      }
    };
    if (token) fetchProfile();
  }, [token]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in form) {
      if (form[key] !== null && form[key] !== undefined) {
        formData.append(`user_profile[${key}]`, form[key]);
      }
    }
    try {
      const res = await api.put("/user_profile", formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });
      setData(res.data);
      setEditMode(false);
      setMessage("Profile updated successfully");
    } catch (err) {
      setMessage("Update failed: " + (err.response?.data?.errors?.join(", ") || "Unknown error"));
    }
  };

  if (!data) return <p>Loading profile...</p>;

  return (
    <div className="profile-wrapper">
      <ProfileCard
        user={data.user}
        profile={data.profile}
        editable={true}
        editMode={editMode}
        setEditMode={setEditMode}
        form={form}
        setForm={setForm}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      {message && <p>{message}</p>}
    </div>
  );
}

export default UserProfilePage;
