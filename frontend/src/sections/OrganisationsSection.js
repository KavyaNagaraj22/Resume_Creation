// 🏢 OrganisationsSection.js
import React, { useEffect, useState } from "react";

const OrganisationsSection = ({ initialData, onDataChange }) => {
  const [orgs, setOrgs] = useState([{ name: "", role: "", year: "" }]);

  useEffect(() => {
    if (initialData && JSON.stringify(initialData) !== JSON.stringify(orgs)) {
      setOrgs(initialData);
    }
  }, [initialData]);

  const handleChange = (index, field, value) => {
    const updated = [...orgs];
    updated[index][field] = value;
    setOrgs(updated);
    onDataChange?.(updated);
  };

  const addOrg = () => {
    const updated = [...orgs, { name: "", role: "", year: "" }];
    setOrgs(updated);
    onDataChange?.(updated);
  };

  const removeOrg = (index) => {
    const updated = [...orgs];
    updated.splice(index, 1);
    setOrgs(updated);
    onDataChange?.(updated);
  };

  return (
    <div className="section">
      <h3>🏢 Organisations</h3>
      {orgs.map((org, i) => (
        <div key={i} className="entry-item">
          <input placeholder="Name" value={org.name} onChange={(e) => handleChange(i, "name", e.target.value)} />
          <input placeholder="Role" value={org.role} onChange={(e) => handleChange(i, "role", e.target.value)} />
          <input placeholder="Year" value={org.year} onChange={(e) => handleChange(i, "year", e.target.value)} />
          <button onClick={() => removeOrg(i)}>Remove</button>
        </div>
      ))}
      <button onClick={addOrg}>Add Organisation</button>
    </div>
  );
};

export default OrganisationsSection;