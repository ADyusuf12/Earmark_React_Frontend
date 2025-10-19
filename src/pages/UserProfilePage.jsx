import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import "../styles/profile.css";

function ProfilePage() {
  const { token } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/user_profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(res.data);
        setForm(res.data.profile); // preload form
      } catch (err) {
        setMessage("Failed to load profile");
      }
    };

    if (token) fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setData(res.data);
      setEditMode(false);
      setMessage("Profile updated successfully");
    } catch (err) {
      setMessage(
        "Update failed: " +
          (err.response?.data?.errors?.join(", ") || "Unknown error")
      );
    }
  };

  if (!data) return <p>Loading profile...</p>;

  const { user, profile } = data;

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        <h1>Profile</h1>

        {!editMode ? (
          <>
            {profile.profile_picture_url && (
              <img
                src={profile.profile_picture_url}
                alt="Profile"
                className="profile-avatar"
              />
            )}
            <div className="profile-info">
              <p>
                <strong>Username:</strong> {user.username}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Account Type:</strong> {profile.account_type}
              </p>
              <p>
                <strong>First Name:</strong> {profile.first_name}
              </p>
              <p>
                <strong>Last Name:</strong> {profile.last_name}
              </p>
              <p>
                <strong>Phone:</strong> {profile.phone_number}
              </p>
              <p>
                <strong>Bio:</strong> {profile.bio}
              </p>
            </div>
            <div className="profile-buttons">
              <button
                className="save-btn"
                type="button"
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </button>
            </div>
          </>
        ) : (
          <form className="profile-form" onSubmit={handleSubmit}>
            <select
              name="account_type"
              value={form.account_type}
              onChange={handleChange}
            >
              <option value="customer">Customer</option>
              <option value="agent">Agent</option>
              <option value="developer">Developer</option>
              <option value="owner">Owner</option>
            </select>
            <input
              name="first_name"
              placeholder="First Name"
              value={form.first_name || ""}
              onChange={handleChange}
            />
            <input
              name="last_name"
              placeholder="Last Name"
              value={form.last_name || ""}
              onChange={handleChange}
            />
            <input
              name="phone_number"
              placeholder="Phone Number"
              value={form.phone_number || ""}
              onChange={handleChange}
            />
            <textarea
              name="bio"
              placeholder="Bio"
              value={form.bio || ""}
              onChange={handleChange}
            />
            <input
              type="file"
              name="profile_picture"
              accept="image/*"
              onChange={(e) =>
                setForm({ ...form, profile_picture: e.target.files[0] })
              }
            />
            <div className="profile-buttons">
              <button className="save-btn" type="submit">
                Save
              </button>
              <button
                className="cancel-btn"
                type="button"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default ProfilePage;
