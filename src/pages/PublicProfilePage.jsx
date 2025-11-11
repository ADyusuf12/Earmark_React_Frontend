import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import ProfileCard from "../components/ProfileCard";
import "../styles/profile.css";

function PublicProfilePage() {
  const { token } = useContext(AuthContext);
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(`/user_profiles/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data);
      } catch {
        setMessage("Failed to load user profile");
      }
    };
    if (token) fetchProfile();
  }, [id, token]);

  if (!data) return <p>{message || "Loading user profile..."}</p>;

  return (
    <div className="profile-wrapper">
      <ProfileCard user={data.user} profile={data.profile} editable={false} />
    </div>
  );
}

export default PublicProfilePage;
