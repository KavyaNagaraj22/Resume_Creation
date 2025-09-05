// 🤝 ReferencesSection.js
import React, { useEffect, useState } from "react";

const ReferencesSection = ({ initialData, onDataChange }) => {
  const [references, setReferences] = useState([{ name: "", relation: "", contact: "" }]);

  useEffect(() => {
    if (initialData && JSON.stringify(initialData) !== JSON.stringify(references)) {
      setReferences(initialData);
    }
  }, [initialData]);

  const handleChange = (index, field, value) => {
    const updated = [...references];
    updated[index][field] = value;
    setReferences(updated);
    onDataChange?.(updated);
  };

  const addReference = () => {
    const updated = [...references, { name: "", relation: "", contact: "" }];
    setReferences(updated);
    onDataChange?.(updated);
  };

  const removeReference = (index) => {
    const updated = [...references];
    updated.splice(index, 1);
    setReferences(updated);
    onDataChange?.(updated);
  };

  return (
    <div className="section">
      <h3>🤝 References</h3>
      {references.map((ref, i) => (
        <div key={i} className="entry-item">
          <input placeholder="Name" value={ref.name} onChange={(e) => handleChange(i, "name", e.target.value)} />
          <input placeholder="Relation" value={ref.relation} onChange={(e) => handleChange(i, "relation", e.target.value)} />
          <input placeholder="Contact Info" value={ref.contact} onChange={(e) => handleChange(i, "contact", e.target.value)} />
          <button onClick={() => removeReference(i)}>Remove</button>
        </div>
      ))}
      <button onClick={addReference}>Add Reference</button>
    </div>
  );
};

export default ReferencesSection;