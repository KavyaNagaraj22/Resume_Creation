import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { templates } from "../templates/templateList";
import "../styles/ResumeViewer.css";

const ResumeViewer = () => {
  const { id } = useParams();
  const [resume, setResume] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/resumes/${id}`)
      .then((res) => setResume(res.data))
      .catch((err) => console.error("Failed to fetch resume", err));
  }, [id]);

  if (!resume) return <p>Loading resume...</p>;

  const SelectedTemplate = templates.find(t => t.id === (resume.templateId || "modern"))?.component;

  return (
    <div className="viewer-container">
      {SelectedTemplate ? (
        <div className="resume-preview-wrapper">
          <SelectedTemplate data={resume.content} sections={resume.sections} customizations={resume.customizations} />
          <div className="global-resume-footer">
            <img
              src="/TalentOzaLogo.png"
              alt="TalentOza Logo"
              className="global-resume-watermark"
            />
          </div>
        </div>
      ) : (
        <p>Template not found.</p>
      )}
    </div>
  );
};

export default ResumeViewer;