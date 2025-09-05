// ❤️ InterestsSection.js
import React, { useEffect, useState } from "react";

const InterestsSection = ({ initialData, onDataChange }) => {
  const [interests, setInterests] = useState([""]);

  useEffect(() => {
    if (initialData && JSON.stringify(initialData) !== JSON.stringify(interests)) {
      setInterests(initialData);
    }
  }, [initialData]);

  const handleChange = (index, value) => {
    const updated = [...interests];
    updated[index] = value;
    setInterests(updated);
    onDataChange?.(updated);
  };

  const addInterest = () => {
    const updated = [...interests, ""];
    setInterests(updated);
    onDataChange?.(updated);
  };

  const removeInterest = (index) => {
    const updated = [...interests];
    updated.splice(index, 1);
    setInterests(updated);
    onDataChange?.(updated);
  };

  return (
    <div className="section">
      <h3>❤️ Interests</h3>
      {interests.map((interest, i) => (
        <div key={i} className="entry-item">
          <input placeholder="Interest" value={interest} onChange={(e) => handleChange(i, e.target.value)} />
          <button onClick={() => removeInterest(i)}>Remove</button>
        </div>
      ))}
      <button onClick={addInterest}>Add Interest</button>
    </div>
  );
};

export default InterestsSection;