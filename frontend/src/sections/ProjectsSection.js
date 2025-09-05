// ProjectsSection.js
import React, { useState, useEffect } from "react"; // Removed useRef

const ProjectsSection = ({ initialData, onDataChange }) => {
  const [projects, setProjects] = useState([{ title: "", description: "", link: "" }]);

  useEffect(() => {
    if (initialData && Array.isArray(initialData)) {
      if (JSON.stringify(initialData) !== JSON.stringify(projects)) {
        setProjects(initialData);
      }
    }
  }, [initialData]);
  
  const handleChange = (index, e) => {
    const updated = [...projects];
    updated[index][e.target.name] = e.target.value;
    setProjects(updated);
    if (onDataChange) {
      onDataChange(updated); // Notify parent after update
    }
  };

  const addProject = () => {
    const updatedProjects = [...projects, { title: "", description: "", link: "" }];
    setProjects(updatedProjects);
    if (onDataChange) {
      onDataChange(updatedProjects); // Notify parent after adding
    }
  };

  const removeProject = (index) => {
    const updated = [...projects];
    updated.splice(index, 1);
    setProjects(updated);
    if (onDataChange) {
      onDataChange(updated); // Notify parent after removing
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = projects.every(
      (p) => p.title.trim() !== "" && p.description.trim() !== ""
    );
    if (!isValid) {
      alert("Title and description are required for all projects.");
      return;
    }
    // onDataChange is already handled by handleChange, addProject, removeProject.
    // This handleSubmit could be for a final "save" action if needed.
    // If you want to explicitly save here:
    // if (onDataChange) onDataChange(projects);
    alert("Projects saved"); // This alert might be better handled in the parent component
  };

  return (
    <div className="section">
      <h3>📁 Projects</h3>
  
      {projects.map((project, index) => (
        <div
          key={index}
          style={{
            marginBottom: "15px",
            borderBottom: "1px solid #ccc",
            paddingBottom: "10px"
          }}
          className="entry-item"
        >
          <input
            name="title"
            placeholder="Project Title"
            value={project.title || ""}
            onChange={(e) => handleChange(index, e)}
            required
          />
  
          <textarea
            name="description"
            placeholder="Project Description"
            value={project.description || ""}
            onChange={(e) => handleChange(index, e)}
            required
          />
  
          <input
            name="link"
            placeholder="Project Link"
            value={project.link || ""}
            onChange={(e) => handleChange(index, e)}
          />
  
          {/* Start Date */}
          <input
            type="month"
            name="startDate"
            placeholder="Start Date"
            value={project.startDate || ""}
            onChange={(e) => handleChange(index, e)}
          />
  
          {/* End Date */}
          <input
            type="month"
            name="endDate"
            placeholder="End Date (leave blank if ongoing)"
            value={project.endDate || ""}
            onChange={(e) => handleChange(index, e)}
          />
  
          {projects.length > 1 && (
            <button type="button" onClick={() => removeProject(index)}>Remove</button>
          )}
        </div>
      ))}
  
      <button type="button" onClick={addProject}>Add Project</button>
      <br /><br />
    </div>
  );
  
};

export default ProjectsSection;