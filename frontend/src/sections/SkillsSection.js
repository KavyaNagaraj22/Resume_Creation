import React, { useState, useEffect } from "react";
import { aiRoleTemplates } from "../utils/AIHelper"; // ✅ adjust the path if needed

const SkillsSection = ({ initialData = [], onDataChange, role = "" }) => {
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    if (Array.isArray(initialData) && JSON.stringify(initialData) !== JSON.stringify(skills)) {
      setSkills(initialData);
    }
  }, [initialData]);

  const handleAddSkill = () => {
    const trimmed = skillInput.trim();
    if (!trimmed) {
      alert("Skill cannot be empty.");
      return;
    }
    if (skills.includes(trimmed)) {
      alert("Skill already added.");
      return;
    }
    const updated = [...skills, trimmed];
    setSkills(updated);
    setSkillInput("");
    onDataChange?.(updated);
  };

  const handleRemoveSkill = (index) => {
    const updated = skills.filter((_, i) => i !== index);
    setSkills(updated);
    onDataChange?.(updated);
  };

  const suggestSkillsFromTemplate = () => {
    if (!role) {
      alert("Please fill in the role in the Profile section first.");
      return;
    }

    const matchedTemplate = aiRoleTemplates.find((item) => item.role.toLowerCase() === role.toLowerCase());

    if (!matchedTemplate) {
      alert(`No predefined skills found for role "${role}".`);
      return;
    }

    const suggestedSkills = matchedTemplate.skills || [];
    const merged = [...new Set([...skills, ...suggestedSkills])]; // prevent duplicates
    setSkills(merged);
    onDataChange?.(merged);
  };

  return (
    <div className="section">
      <h3>💻 Programming Knowledge & Skills</h3>

      <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Enter a skill"
          value={skillInput || ""}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddSkill();
            }
          }}
        />
        <button type="button" onClick={handleAddSkill}>Add</button>
        <button type="button" onClick={suggestSkillsFromTemplate}>
          ✨ Auto Suggest Skills
        </button>
      </div>

      <ul>
        {skills.map((skill, index) => (
          <li key={index}>
            {skill}
            <button type="button" onClick={() => handleRemoveSkill(index)} style={{ marginLeft: "5px" }}>
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillsSection;
