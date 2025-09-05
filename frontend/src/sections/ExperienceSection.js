// ExperienceSection.js
import React, { useState, useEffect } from "react"; // Removed useRef

const ExperienceSection = ({ initialData, onDataChange }) => {
  const [experiences, setExperiences] = useState([
    { company: "", role: "", startDate: "", endDate: "", location: "", details: [] }
  ]);

  useEffect(() => {
    if (initialData && Array.isArray(initialData)) {
      if (JSON.stringify(initialData) !== JSON.stringify(experiences)) {
        setExperiences(initialData);
      }
    }
  }, [initialData]);

  const handleChange = (index, field, value) => {
    const updated = [...experiences];
    updated[index][field] = value;
    setExperiences(updated);
    if (onDataChange) {
      onDataChange(updated); // Notify parent after update
    }
  };

  const handleDetailChange = (expIndex, detailIndex, value) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[expIndex].details[detailIndex] = value;
    setExperiences(updatedExperiences);
    if (onDataChange) {
      onDataChange(updatedExperiences);
    }
  };

  const addDetail = (expIndex) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[expIndex].details.push("");
    setExperiences(updatedExperiences);
    if (onDataChange) {
      onDataChange(updatedExperiences);
    }
  };

  const removeDetail = (expIndex, detailIndex) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[expIndex].details.splice(detailIndex, 1);
    setExperiences(updatedExperiences);
    if (onDataChange) {
      onDataChange(updatedExperiences);
    }
  };


  const addExperience = () => {
    const updatedExperiences = [...experiences, { company: "", role: "", startDate: "", endDate: "", location: "", details: [] }];
    setExperiences(updatedExperiences);
    if (onDataChange) {
      onDataChange(updatedExperiences); // Notify parent after adding
    }
  };

  const removeExperience = (index) => {
    const updated = [...experiences];
    updated.splice(index, 1);
    setExperiences(updated);
    if (onDataChange) {
      onDataChange(updated); // Notify parent after removing
    }
  };

  return (
    <div className="section">
      <h3>💼 Professional Experience</h3>
      {experiences.map((exp, index) => (
        <div key={index} className="entry-item">
          <input
            type="text"
            placeholder="Company"
            value={exp.company || ""}
            onChange={(e) => handleChange(index, "company", e.target.value)}
          />
          <input
            type="text"
            placeholder="Role"
            value={exp.role || ""}
            onChange={(e) => handleChange(index, "role", e.target.value)}
          />
          <input
            type="month"
            placeholder="Start Date"
            value={exp.startDate || ""}
            onChange={(e) => handleChange(index, "startDate", e.target.value)}
          />
          <input
            type="month"
            placeholder="End Date (or leave blank if current)"
            value={exp.endDate || ""}
            onChange={(e) => handleChange(index, "endDate", e.target.value)}
          />
          <input
            type="text"
            placeholder="Location (e.g., City, Country)"
            value={exp.location || ""}
            onChange={(e) => handleChange(index, "location", e.target.value)}
          />
          <div className="experience-details">
            <h4>Responsibilities/Achievements (Bullet Points)</h4>
            {exp.details.map((detail, detailIndex) => (
              <div key={detailIndex}>
                <textarea
                  placeholder="Detail"
                  value={detail || ""}
                  onChange={(e) => handleDetailChange(index, detailIndex, e.target.value)}
                  rows="2"
                />
                <button type="button" onClick={() => removeDetail(index, detailIndex)}>Remove Detail</button>
              </div>
            ))}
            <button type="button" onClick={() => addDetail(index)}>Add Detail</button>
          </div>

          <button type="button" onClick={() => removeExperience(index)}>Remove Experience</button>
        </div>
      ))}
      <button type="button" onClick={addExperience}>Add Experience</button>
    </div>
  );
};

export default ExperienceSection;