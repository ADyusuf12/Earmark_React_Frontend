import "../styles/profile.css";

const accountTypeLabels = {
  customer: "Customer",
  agent: "Agent",
  property_developer: "Property Developer",
  property_owner: "Property Owner",
};

function ProfileCard({
  user,
  profile,
  editable = false,
  editMode,
  setEditMode,
  form,
  handleChange,
  handleSubmit,
  setForm,
}) {
  return (
    <div className="profile-container">
      <h1>{editable ? "Your Profile" : `${user.username}'s Profile`}</h1>

      {profile?.profile_picture_url && (
        <img
          src={profile.profile_picture_url}
          alt="Profile"
          className="profile-avatar"
        />
      )}

      {!editable || !editMode ? (
        <>
          <div className="profile-info">
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Account Type:</strong> {accountTypeLabels[user.account_type]}</p>
            <p><strong>First Name:</strong> {profile.first_name}</p>
            <p><strong>Last Name:</strong> {profile.last_name}</p>
            <p><strong>Phone:</strong> {profile.phone_number}</p>
            <p><strong>Bio:</strong> {profile.bio}</p>
          </div>

          {editable && (
            <div className="profile-buttons">
              <button
                className="save-btn"
                type="button"
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </button>
            </div>
          )}
        </>
      ) : (
        <form className="profile-form" onSubmit={handleSubmit}>
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
            <button className="save-btn" type="submit">Save</button>
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
    </div>
  );
}

export default ProfileCard;
