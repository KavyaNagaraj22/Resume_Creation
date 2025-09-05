import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "../styles/Profile.css";
import ReactDOM from "react-dom/client";
import { templates } from "../templates/templateList";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PaginatedPreview from "./PaginatedPreview";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [resumes, setResumes] = useState([]);
  const navigate = useNavigate();
  const [openResumeId, setOpenResumeId] = useState(null);

  useEffect(() => {
    if (user) fetchResumes();
  }, [user]);

  const fetchResumes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/resumes", {
        params: { uid: user.uid },
      });
      setResumes(res.data);
    } catch (err) {
      console.error("Error fetching resumes:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/resumes/${id}`);
      setResumes(resumes.filter((r) => r._id !== id));
      if (openResumeId === id) setOpenResumeId(null);
    } catch (err) {
      console.error("Error deleting resume:", err);
    }
  };

  const handleCreate = async () => {
    try {
      const token = await user.getIdToken(true);
      const res = await axios.post(
        "http://localhost:5000/api/resumes",
        {
          userId: user.uid,
          title: "Untitled Resume",
          content: {},
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate(`/editor/${res.data._id}`);
    } catch (err) {
      console.error("Error creating resume:", err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/editor/${id}`);
  };

  // Helper function to convert a URL to a Base64 data URI
  const getBase64Image = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous"; // This is crucial for CORS
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL("image/png");
        resolve(dataURL);
      };
      img.onerror = (error) => {
        reject(error);
      };
      img.src = url;
    });
  };

  const handleDownload = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/resumes/${id}`);
      const resume = res.data;
  
      // ... (rest of the code for creating and rendering the container) ...
  
      const container = document.createElement("div");
      container.style.position = "fixed";
      container.style.left = "-9999px";
      container.style.width = "794px"; // A4 width at 96dpi
      container.style.background = "white";
      document.body.appendChild(container);
  
      const PreviewComponent = templates.find(
        (t) => t.id === (resume.templateId || "classic")
      )?.component;
  
      if (!PreviewComponent) throw new Error("Template not found");
  
      const root = ReactDOM.createRoot(container);
      root.render(
        <PaginatedPreview
          data={resume.content}
          sections={resume.sections}
          templateId={resume.templateId || "classic"}
          customizations={resume.customizations}
        />
      );
  
      // Give React time to render
      await new Promise((r) => setTimeout(r, 500));
  
      const pages = container.querySelectorAll(".document-page");
      let pdf = null; // Initialize PDF as null
  
      for (let i = 0; i < pages.length; i++) {
        const canvas = await html2canvas(pages[i], { scale: 2, useCORS: true });
        const imgData = canvas.toDataURL("image/png");
  
        if (i === 0) {
          // Create the PDF instance with the first page
          pdf = new jsPDF("p", "mm", "a4");
          pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
        } else {
          // For subsequent pages, add a new page and then the image
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
        }
      }
  
      if (pdf) {
        pdf.save(`${resume.title}.pdf`);
      } else {
        console.error("No pages to download.");
      }
      document.body.removeChild(container);
    } catch (err) {
      console.error("Error downloading PDF:", err);
    }
  };
  
  const togglePreview = async (id) => {
    if (openResumeId === id) {
      setOpenResumeId(null);
    } else {
      try {
        // Fetch the latest resume data before showing the preview
        const res = await axios.get(`http://localhost:5000/api/resumes/${id}`);
        const updatedResume = res.data;
  
        // Update the resume in the local state with the new data
        setResumes(resumes.map(r => r._id === id ? updatedResume : r));
        setOpenResumeId(id);
      } catch (err) {
        console.error("Error fetching single resume for preview:", err);
      }
    }
  };

  return (
    <div className="profile-page">
      <h2>Your Saved Resumes</h2>
      <button className="create-resume-btn" onClick={handleCreate}>
        + New Resume
      </button>
      <div className="resume-list">
        {resumes.map((resume) => {
          const TemplateComponent = templates.find(
            (t) => t.id === (resume.templateId || "modern")
          )?.component;
          const isPreviewOpen = openResumeId === resume._id;

          return (
            <div key={resume._id} className="resume-card">
              <h3>{resume.title}</h3>
              <div className="resume-actions">
                <button className="action-btn edit-btn" onClick={() => handleEdit(resume._id)}>
                ✏️ 
                </button>
                <button
                  className="action-btn view-btn"
                  onClick={() => window.open(`/view/${resume._id}`, "_blank")}
                >
                  📄 
                </button>
                <button className="action-btn download-btn" onClick={() => handleDownload(resume._id)}>
                ⬇️ 
                </button>
                <button className="action-btn delete-btn" onClick={() => handleDelete(resume._id)}>
                🗑️ 
                </button>
                <button
                  className={`action-btn toggle-preview-btn ${isPreviewOpen ? "open" : ""}`}
                  onClick={() => togglePreview(resume._id)}
                  title={isPreviewOpen ? "Hide Preview" : "Show Preview"}
                >
                  {isPreviewOpen ? " 👁️‍🗨️Hide Preview" : " 👁️Show Preview"}
                </button>
              </div>

              {isPreviewOpen && TemplateComponent ? (
                <div className="preview-box">
                  <h4>Preview:</h4>
                  <div className="preview-container">
                    {/* <TemplateComponent data={resume.content} sections={resume.sections}/> */}
                    <TemplateComponent data={resume.content} sections={resume.sections} customizations={resume.customizations}/>
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;