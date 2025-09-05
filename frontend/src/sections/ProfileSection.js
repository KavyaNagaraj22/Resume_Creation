import React, { useState, useEffect } from "react";

// List of Indian districts (shortened for demo – you can expand this)
const indianDistricts = [
  "Ahmedabad", "Bengaluru", "Chennai", "Delhi", "Hyderabad", "Kolkata", "Mumbai",
  "Pune", "Jaipur", "Lucknow", "Patna", "Indore", "Bhopal", "Nagpur", "Thane",
  "Kanpur", "Ranchi", "Raipur", "Guwahati", "Surat", "Noida", "Faridabad", "Gurgaon"
];

const ProfileSection = ({ onDataChange, initialData = {}, skills = [], experience = [] }) => {
  const [profile, setProfile] = useState({
    fullName: initialData.fullName || "",
    email: initialData.email || "",
    phone: initialData.phone || "",
    linkedin: initialData.linkedin || "",
    address: initialData.address || "",
    website: initialData.website || "",
    github: initialData.github || "", // Add github to state
    portfolio: initialData.portfolio || "",
    summary: initialData.summary || "",
    title: initialData.title || "",
    photo: initialData.photo || "",
    role: initialData.role || ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData && JSON.stringify(initialData) !== JSON.stringify(profile)) {
      setProfile(prev => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  const validate = (field, value) => {
    switch (field) {
      case "fullName":
        return /^[A-Za-z\s]+$/.test(value) ? "" : "Only letters and spaces allowed";
      case "email":
        return value.endsWith("@gmail.com") ? "" : "Email must end with @gmail.com";
      case "phone":
        return /^\d{10}$/.test(value) ? "" : "Phone must be 10 digits";
      case "linkedin":
        return /^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/.test(value) ? "" : "Enter a valid LinkedIn URL";
      case "github": // Add validation for github
        if (value === "") return ""; // It's optional, so an empty string is valid
        return /^(https?:\/\/)?(www\.)?github\.com\/.*$/.test(value) ? "" : "Enter a valid GitHub URL";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...profile, [name]: value };
    setProfile(updated);
    setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
    onDataChange?.(updated);
  };

  const generateSummary = () => {
    const role = profile.role?.trim();
    const topSkills = (skills || []).slice(0, 3).join(", ");

    if (!role) {
      alert("Please enter a role first.");
      return;
    }

    const summary = `Motivated ${role} with strong foundation in ${topSkills}. Passionate about delivering efficient, user-friendly solutions and continuously learning in a dynamic environment.`;

    const updated = { ...profile, summary };
    setProfile(updated);
    onDataChange?.(updated);
  };

  return (
    <div className="section">
      <h3>👤 Profile</h3>

      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={profile.fullName}
        onChange={handleChange}
      />
      {errors.fullName && <small style={{ color: "red" }}>{errors.fullName}</small>}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={profile.email}
        onChange={handleChange}
      />
      {errors.email && <small style={{ color: "red" }}>{errors.email}</small>}

      {/* Phone Number with +91 Prefix */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
        <span style={{
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px 0 0 4px",
          backgroundColor: "#eee"
        }}>
          +91
        </span>
        <input
          type="text"
          name="phone"
          placeholder="Enter 10-digit number"
          value={profile.phone}
          maxLength="10"
          onChange={(e) => {
            const onlyDigits = e.target.value.replace(/\D/g, "");
            if (onlyDigits.length <= 10) {
              handleChange({ target: { name: "phone", value: onlyDigits } });
            }
          }}
          style={{
            flex: 1,
            border: "1px solid #ccc",
            borderLeft: "none",
            padding: "10px",
            borderRadius: "0 4px 4px 0"
          }}
        />
      </div>
      {errors.phone && <small style={{ color: "red" }}>{errors.phone}</small>}

      {/* District Dropdown */}
      <select
        name="address"
        value={profile.address}
        onChange={handleChange}
        style={{ marginBottom: "10px", padding: "10px", width: "100%" }}
      >
        <option value="">-- Select Your District --</option>
        {indianDistricts.map((district, index) => (
          <option key={index} value={district}>
            {district}
          </option>
        ))}
      </select>

      <input
        type="text"
        name="linkedin"
        placeholder="LinkedIn URL"
        value={profile.linkedin}
        onChange={handleChange}
      />
      {errors.linkedin && <small style={{ color: "red" }}>{errors.linkedin}</small>}

      {/* GitHub URL (optional) */}
      <input
        type="text"
        name="github"
        placeholder="GitHub URL (optional)"
        value={profile.github}
        onChange={handleChange}
      />
      {errors.github && <small style={{ color: "red" }}>{errors.github}</small>}

      <div style={{ display: "flex", gap: "10px", margin: "10px 0" }}>
        <input
          type="text"
          name="role"
          placeholder="e.g. Frontend Developer"
          value={profile.role}
          onChange={handleChange}
        />
        <button type="button" onClick={generateSummary}>
          ✨ Auto Suggest Objective
        </button>
      </div>

      <textarea
        name="summary"
        placeholder="Objective / Summary"
        rows="4"
        value={profile.summary}
        onChange={handleChange}
      />

      <input
        type="text"
        name="photo"
        placeholder="Photo URL (optional)"
        value={profile.photo}
        onChange={handleChange}
      />
    </div>
  );
};

export default ProfileSection;