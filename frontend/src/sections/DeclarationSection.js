// ✍️ DeclarationSection.js
import React, { useEffect, useState } from "react";

const DeclarationSection = ({ initialData, onDataChange }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    if (initialData && initialData !== text) {
      setText(initialData);
    }
  }, [initialData]);

  const handleChange = (value) => {
    setText(value);
    onDataChange?.(value);
  };

  return (
    <div className="section">
      <h3>✍️ Declaration</h3>
      <textarea
        rows="4"
        placeholder="Enter your declaration text here."
        value={text}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default DeclarationSection;
