// LanguagesSection.js
import React, { useState, useEffect } from "react"; // Removed useRef

const allLanguages = [
  "Assamese",  "Bodo", "Dogri", "Gujarati", "Hindi","Kannada",
  "Kashmiri", "Konkani", "Maithili", "Malayalam", "Manipuri", 
  "Marathi", "Nepali", "Oriya", "Punjabi", "Sanskrit", "Santhali", 
  "Sindhi", "Tamil", "Telugu", "Urdu", "English", "Mandarin", "Chinese", 
  "Spanish", "French", "Arabic", "Bengali", "Portuguese", "Russian",
  "Indonesian", "German", "Japanese", "Swahili"
];

const LanguagesSection = ({ initialData, onDataChange }) => {
  const [languageInput, setLanguageInput] = useState("");
  const [languageList, setLanguageList] = useState([]);
  
  useEffect(() => {
    if (initialData && Array.isArray(initialData)) {
      if (JSON.stringify(initialData) !== JSON.stringify(languageList)) {
        setLanguageList(initialData);
      }
    }
  }, [initialData]);
  
  const handleAddLanguage = () => {
    const lang = languageInput.trim();
    if (lang && !languageList.includes(lang)) {
      const updatedLanguageList = [...languageList, lang];
      setLanguageList(updatedLanguageList);
      setLanguageInput("");
      if (onDataChange) {
        onDataChange(updatedLanguageList); // Notify parent after adding
      }
    }
  };

  const handleDelete = (langToDelete) => {
    const updatedLanguageList = languageList.filter((lang) => lang !== langToDelete);
    setLanguageList(updatedLanguageList);
    if (onDataChange) {
      onDataChange(updatedLanguageList); // Notify parent after deleting
    }
  };

  const filteredSuggestions = allLanguages.filter(
    (lang) =>
      lang.toLowerCase().includes(languageInput.toLowerCase()) &&
      !languageList.includes(lang)
  );

  return (
    <div className="section">
      <h3>🌍 Languages</h3> {/* Changed heading for consistency */}
      <input
        list="language-suggestions"
        placeholder="Type language"
        value={languageInput}
        onChange={(e) => setLanguageInput(e.target.value)}
        onKeyDown={(e) => { // Allow adding on Enter key press
          if (e.key === 'Enter') {
            e.preventDefault();
            handleAddLanguage();
          }
        }}
      />
      <datalist id="language-suggestions">
        {filteredSuggestions.map((lang) => (
          <option key={lang} value={lang} />
        ))}
      </datalist>
      <button type="button" onClick={handleAddLanguage}>Add</button>
      <ul>
        {languageList.map((lang, index) => (
          <li key={index}>
            {lang}{" "}
            <button type="button" onClick={() => handleDelete(lang)} style={{ marginLeft: "5px" }}>
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguagesSection;