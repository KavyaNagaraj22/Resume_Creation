import React, { useEffect, useState } from "react";

const AwardsSection = ({ initialData, onDataChange }) => {
  const [awards, setAwards] = useState([{ title: "", issuer: "", year: "" }]);

  useEffect(() => {
    if (initialData && JSON.stringify(initialData) !== JSON.stringify(awards)) {
      setAwards(initialData);
    }
  }, [initialData]);

  const handleChange = (index, field, value) => {
    const updated = [...awards];
    updated[index][field] = value;
    setAwards(updated);
    onDataChange?.(updated);
  };

  const addAward = () => {
    const updated = [...awards, { title: "", issuer: "", year: "" }];
    setAwards(updated);
    onDataChange?.(updated);
  };

  const removeAward = (index) => {
    const updated = [...awards];
    updated.splice(index, 1);
    setAwards(updated);
    onDataChange?.(updated);
  };

  return (
    <div className="section">
      <h3>🏆 Awards</h3>
      {awards.map((award, i) => (
        <div key={i} className="entry-item">
          <input placeholder="Title" value={award.title} onChange={(e) => handleChange(i, "title", e.target.value)} />
          <input placeholder="Issuer" value={award.issuer} onChange={(e) => handleChange(i, "issuer", e.target.value)} />
          <input placeholder="Year" value={award.year} onChange={(e) => handleChange(i, "year", e.target.value)} />
          <button onClick={() => removeAward(i)}>Remove</button>
        </div>
      ))}
      <button onClick={addAward}>Add Award</button>
    </div>
  );
};

export default AwardsSection;
