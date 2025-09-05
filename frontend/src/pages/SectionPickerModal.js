import React from "react";
import "../styles/SectionPickerModal.css";

const sections = [
  { key: "profile", label: "Profile", description: "Intro about yourself" },
  { key: "education", label: "Education", description: "Degrees & colleges" },
  { key: "experience", label: "Professional Experience", description: "Jobs & internships" },
  { key: "skills", label: "Skills", description: "Technical, soft skills" },
  { key: "projects", label: "Projects", description: "Past work/projects" },
  { key: "certificates", label: "Certificates", description: "Certifications and licenses" },
  { key: "languages", label: "Languages", description: "Languages you speak" },
  { key: "awards", label: "Awards", description: "Student competitions or accolades" },
  { key: "interests", label: "Interests", description: "Hobbies and interests" },
  { key: "organisations", label: "Organisations", description: "Clubs or associations" },
  { key: "courses", label: "Courses", description: "Online/offline coursework" },
  { key: "publications", label: "Publications", description: "Published works" },
  { key: "references", label: "References", description: "Professional references" },
  { key: "declaration", label: "Declaration", description: "Closing statement" },
];

const SectionPickerModal = ({ onClose, onSelect }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add Content</h2>
        <button className="close-btn" onClick={onClose}>×</button>
        <div className="section-grid">
          {sections.map((s) => (
            <div
              key={s.key}
              className="section-card"
              onClick={() => onSelect(s.key)}
            >
              <h3>{s.label}</h3>
              <p>{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionPickerModal;
