// EducationSection.js
import React, { useEffect, useState } from "react";

const EducationSection = ({ initialData, onDataChange }) => {
  const [education, setEducation] = useState([{
    institution: "",
    degree: "",
    start: "",
    end: "",
    location: "",
    startYear: "",
    endYear: "",
    gpa: "" // Add 'gpa' to the initial state
  }]);

  useEffect(() => {
    if (initialData && Array.isArray(initialData)) {
      // Use a deep comparison to prevent unnecessary updates if initialData reference changes but content is same
      if (JSON.stringify(initialData) !== JSON.stringify(education)) {
        setEducation(initialData);
      }
    }
  }, [initialData, education]); // Added 'education' to the dependency array to be explicit

  const handleChange = (index, field, value) => {
    const updated = [...education];
    updated[index][field] = value;
    setEducation(updated);
    if (onDataChange) {
      onDataChange(updated); // Notify parent after update
    }
  };

  const addEntry = () => {
    const updatedEducation = [...education, {
      institution: "",
      degree: "",
      start: "",
      end: "",
      location: "",
      startYear: "",
      endYear: "",
      gpa: "" // Ensure new entries also have 'gpa'
    }];
    setEducation(updatedEducation);
    if (onDataChange) {
      onDataChange(updatedEducation); // Notify parent after adding
    }
  };

  const removeEntry = (index) => {
    const updated = [...education];
    updated.splice(index, 1);
    setEducation(updated);
    if (onDataChange) {
      onDataChange(updated); // Notify parent after removing
    }
  };

  return (
    <div className="section">
      <h3>🎓 Education</h3>
      {education.map((edu, idx) => (
        <div key={idx} className="entry-item">
          <input
            type="text"
            placeholder="Degree/Field of Study"
            value={edu.degree || ""}
            onChange={(e) => handleChange(idx, "degree", e.target.value)}
          />
          <input
            type="text"
            placeholder="Institution"
            value={edu.institution || ""}
            onChange={(e) => handleChange(idx, "institution", e.target.value)}
          />
  
          {/* New input for GPA/Marks/Percentage */}
          <input
            type="text"
            placeholder="Marks / Percentage / GPA"
            value={edu.gpa || ""}
            onChange={(e) => handleChange(idx, "gpa", e.target.value)}
          />
  
          <input
            type="month"
            placeholder="Start Date"
            value={edu.startDate || ""}
            onChange={(e) => handleChange(idx, "startDate", e.target.value)}
          />
          <input
            type="month"
            placeholder="End Date (or leave blank if current)"
            value={edu.endDate || ""}
            onChange={(e) => handleChange(idx, "endDate", e.target.value)}
          />
          <button type="button" onClick={() => removeEntry(idx)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={addEntry}>Add Education</button>
    </div>
  );
  
};

export default EducationSection;