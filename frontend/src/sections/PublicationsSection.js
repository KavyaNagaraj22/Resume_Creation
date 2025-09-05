// 📖 PublicationsSection.js
import React, { useEffect, useState } from "react";

const PublicationsSection = ({ initialData, onDataChange }) => {
  const [publications, setPublications] = useState([{ title: "", journal: "", year: "" }]);

  useEffect(() => {
    if (initialData && JSON.stringify(initialData) !== JSON.stringify(publications)) {
      setPublications(initialData);
    }
  }, [initialData]);

  const handleChange = (index, field, value) => {
    const updated = [...publications];
    updated[index][field] = value;
    setPublications(updated);
    onDataChange?.(updated);
  };

  const addPublication = () => {
    const updated = [...publications, { title: "", journal: "", year: "" }];
    setPublications(updated);
    onDataChange?.(updated);
  };

  const removePublication = (index) => {
    const updated = [...publications];
    updated.splice(index, 1);
    setPublications(updated);
    onDataChange?.(updated);
  };

  return (
    <div className="section">
      <h3>📖 Publications</h3>
      {publications.map((pub, i) => (
        <div key={i} className="entry-item">
          <input placeholder="Title" value={pub.title} onChange={(e) => handleChange(i, "title", e.target.value)} />
          <input placeholder="Journal/Conference" value={pub.journal} onChange={(e) => handleChange(i, "journal", e.target.value)} />
          <input placeholder="Year" value={pub.year} onChange={(e) => handleChange(i, "year", e.target.value)} />
          <button onClick={() => removePublication(i)}>Remove</button>
        </div>
      ))}
      <button onClick={addPublication}>Add Publication</button>
    </div>
  );
};

export default PublicationsSection;