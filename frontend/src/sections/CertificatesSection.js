// CertificatesSection.js
import React, { useState, useEffect } from "react"; // Removed useRef

const CertificatesSection = ({ initialData, onDataChange }) => {
  const [certificates, setCertificates] = useState([{ name: "", issuer: "", year: "" }]);

  useEffect(() => {
    if (initialData && Array.isArray(initialData)) {
      if (JSON.stringify(initialData) !== JSON.stringify(certificates)) {
        setCertificates(initialData);
      }
    }
  }, [initialData]);

  const handleChange = (index, field, value) => {
    const updated = [...certificates];
    updated[index][field] = value;
    setCertificates(updated);
    if (onDataChange) {
      onDataChange(updated); // Notify parent after update
    }
  };

  const addCertificate = () => {
    const updatedCertificates = [...certificates, { name: "", issuer: "", year: "" }];
    setCertificates(updatedCertificates);
    if (onDataChange) {
      onDataChange(updatedCertificates); // Notify parent after adding
    }
  };

  const removeCertificate = (index) => {
    const updated = [...certificates];
    updated.splice(index, 1);
    setCertificates(updated);
    if (onDataChange) {
      onDataChange(updated); // Notify parent after removing
    }
  };

  return (
    <div className="section">
      <h3>📜 Certifications</h3>
      {certificates.map((cert, index) => (
        <div key={index} className="entry-item">
          <input
            type="text"
            placeholder="Certificate Name"
            value={cert.name || ""}
            onChange={(e) => handleChange(index, "name", e.target.value)}
          />
          <input
            type="text"
            placeholder="Issuer"
            value={cert.issuer || ""}
            onChange={(e) => handleChange(index, "issuer", e.target.value)}
          />
          <input
            type="number" // Changed to number for year
            placeholder="Year"
            value={cert.year || ""}
            onChange={(e) => handleChange(index, "year", e.target.value)}
          />
          <button type="button" onClick={() => removeCertificate(index)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={addCertificate}>Add Certificate</button>
    </div>
  );
};

export default CertificatesSection;