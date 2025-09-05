import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import SectionPickerModal from "./SectionPickerModal";
import getFreshToken from "../utils/getFreshToken";
import PaginatedPreview from "./PaginatedPreview";

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableSection from "../sections/DraggableSection";
import { FaEdit } from 'react-icons/fa';

import EducationSection from "../sections/EducationSection";
import ExperienceSection from "../sections/ExperienceSection";
import SkillsSection from "../sections/SkillsSection";
import ProjectsSection from "../sections/ProjectsSection";
import CertificatesSection from "../sections/CertificatesSection";
import LanguagesSection from "../sections/LanguagesSection";
import ProfileSection from "../sections/ProfileSection";
import AwardsSection from "../sections/AwardsSection";
import InterestsSection from "../sections/InterestsSection";
import OrganisationsSection from "../sections/OrganisationsSection";
import CoursesSection from "../sections/CoursesSection";
import PublicationsSection from "../sections/PublicationsSection";
import ReferencesSection from "../sections/ReferencesSection";
import DeclarationSection from "../sections/DeclarationSection";

import "../styles/ResumeForm.css";
import { templates } from "../templates/templateList";
import CustomizationPanel from '../components/CustomizationPanel'; // âœ… Import the new panel component

const SECTION_COMPONENTS = {
  profile: ProfileSection,
  education: EducationSection,
  experience: ExperienceSection,
  skills: SkillsSection,
  projects: ProjectsSection,
  certificates: CertificatesSection,
  languages: LanguagesSection,
  awards: AwardsSection,
  interests: InterestsSection,
  organisations: OrganisationsSection,
  courses: CoursesSection,
  publications: PublicationsSection,
  references: ReferencesSection,
  declaration: DeclarationSection
};

const ResumeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [searchParams] = useSearchParams();

  const selectedTemplateFromURL = searchParams.get("template");

  const [formData, setFormData] = useState({
    profile: {},
    education: [],
    experience: [],
    skills: [],
    projects: [],
    certificates: [],
    languages: [],
    awards: [],
    interests: [],
    organisations: [],
    courses: [],
    publications: [],
    references: [],
    declaration: "",
  });

  const [sections, setSections] = useState(["profile"]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState("classic");
  const [isReordering, setIsReordering] = useState(false);
  const [showCustomizationPanel, setShowCustomizationPanel] = useState(false);
  const [selectedSectionForCustomization, setSelectedSectionForCustomization] = useState(null);
  const [templateId, setTemplateId] = useState("classic"); // ADD THIS LINE



  const [customizations, setCustomizations] = useState({
    global: {
      fontStyle: "Arial, sans-serif",
      fontSize: "16px",
      fontColor: "#000000",
      templateColor: "#ffffff",
      bold: false,
      italic: false,
      underline: false,
      align: "left",
      lineHeight: "1.1", // <--- add this line
      layout: "one-column",
    },
  });
  
  const SelectedTemplateComponent =
    templates.find((t) => t.id === selectedTemplateId)?.component || (() => <div>No Template Found</div>);

  // Load resume if editing
  useEffect(() => {
    if (id && user) {
      axios
        .get(`http://localhost:5000/api/resumes/${id}`)
        .then((res) => {
          const resume = res.data;
          if (resume.content) {
            setFormData((prev) => ({
              ...prev,
              ...resume.content,
            }));
            if (resume.sections && resume.sections.length > 0) {
              setSections(resume.sections);
            } else {
              setSections(Object.keys(resume.content));
            }
            setSelectedTemplateId(resume.templateId || "classic");
            if (resume.customizations) {
              setCustomizations(resume.customizations);
            }
          }
        })
        .catch((err) => {
          console.error("Failed to load resume", err);
        });
    }
  }, [id, user]);

  // Set template from query param if available
  useEffect(() => {
    if (selectedTemplateFromURL) {
      setSelectedTemplateId(selectedTemplateFromURL);
    }
  }, [selectedTemplateFromURL]);

  const handleAddSection = (sectionKey) => {
    if (!sections.includes(sectionKey)) {
      setSections([...sections, sectionKey]);
      setCustomizations(prev => ({
        ...prev,
        [sectionKey]: { ...prev.global } // Initialize new section with global settings
      }));
    }
    setShowModal(false);
  };

  const handleSectionChange = (key, data) => {
    setFormData((prev) => ({ ...prev, [key]: data }));
  };

  // âœ… Updated handler to work with nested state
    const handleCustomizationChange = (path, value) => {
    setCustomizations((prev) => {
      const updated = { ...prev };
      const keys = path.split(".");
      let obj = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        obj[keys[i]] = obj[keys[i]] || {};
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return updated;
    });
  };
  
  const moveSection = (dragIndex, hoverIndex) => {
    setSections((prevSections) => {
      const newSections = [...prevSections];
      const [reorderedSection] = newSections.splice(dragIndex, 1);
      newSections.splice(hoverIndex, 0, reorderedSection);
      return newSections;
    });
  };

  const handleSave = async () => {
    try {
      const payload = {
        userId: user.uid,
        title: formData?.profile?.fullName
          ? `${formData.profile.fullName}'s Resume`
          : "Untitled Resume",
        content: formData,
        sections: sections,
        templateId: selectedTemplateId,
        customizations: customizations,
      };

      const token = await getFreshToken(user);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      if (id) {
        await axios.put(`http://localhost:5000/api/resumes/${id}`, payload, config);
      } else {
        await axios.post("http://localhost:5000/api/resumes", payload, config);
      }

      alert("Resume saved successfully!");
      navigate("/profile");
    } catch (err) {
      console.error("Error saving resume:", err);
      alert("Failed to save resume.");
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="resume-form-layout">
        <div className="resume-form-editor">
          <h2>Your Resume</h2>

          <div className="template-selector">
            <label htmlFor="template">Select Template: </label>
            <select
              id="template"
              value={selectedTemplateId}
              onChange={(e) => setSelectedTemplateId(e.target.value)}
            >
              {templates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
            <div className="resume-actions">
              <button onClick={() => setIsReordering(!isReordering)} className="reorder-btn">
                {isReordering ? 'Done Reordering' : '☰ Reorder Sections'}
              </button>
              <button onClick={() => {
                setShowCustomizationPanel(!showCustomizationPanel);
                setSelectedSectionForCustomization(null);
              }}
                className="reorder-btn"
              >
                {showCustomizationPanel ? 'Hide Customization' : 'Customise Global'}
              </button>
            </div>
          </div>

          {showCustomizationPanel && !selectedSectionForCustomization ? (
            <CustomizationPanel
            customizations={customizations.global}
            onCustomizationChange={(k, v) => handleCustomizationChange(`global.${k}`, v)}
          />
         
          ) : isReordering ? (
            <ul className="reorder-list">
              {sections.map((key, index) => (
                <DraggableSection
                  key={key}
                  name={key}
                  index={index}
                  moveSection={moveSection}
                />
              ))}
            </ul>
          ) : (
            sections.map((key, idx) => {
              const Component = SECTION_COMPONENTS[key];
              if (!Component) return null;

              const sectionCustomizations = customizations[key] || customizations.global;

              return (
                <div key={idx} className="section-container-with-actions">
                  <div className="section-actions">
                    <button
                      onClick={() => {
                        setShowCustomizationPanel(true);
                        setSelectedSectionForCustomization(key);
                      }}
                      className="customize-section-btn"
                      style={{ display: 'flex', alignItems: 'center' }} // Add some inline styles for alignment
                    >
                      <span style={{ marginRight: '8px' }}></span>
                      <FaEdit />
                    </button>
                  </div>
                  {selectedSectionForCustomization === key && showCustomizationPanel && (
                    <CustomizationPanel
                    customizations={customizations[key] || {}}
                    onCustomizationChange={(k, v) => handleCustomizationChange(`${key}.${k}`, v)}
                  />
                  
                  )}
                  <Component
                    initialData={formData[key]}
                    onDataChange={(data) => handleSectionChange(key, data)}
                    customizations={sectionCustomizations} // Pass the correct customization object
                    {...(key === "projects" ? { onSave: handleSave } : {})}
                    {...(key === "profile" ? {
                      skills: formData.skills,
                      experience: formData.experience,
                    } : {})}
                    {...(key === "skills" ? {
                      role: formData.profile?.role,
                    } : {})}
                  />
                </div>
              );
            })
          )}
          <button onClick={() => setShowModal(true)} className="add-section-btn">
            + Add Section
          </button>
          <button onClick={handleSave} className="save-resume-btn">
            Save Resume
          </button>

          {showModal && (
            <SectionPickerModal
              onClose={() => setShowModal(false)}
              onSelect={handleAddSection}
            />
          )}
        </div>

{/* âœ… Preview side (A4 paginated) */}
<div className="resume-form-preview" id="resume-preview">
  <PaginatedPreview
    data={formData}
    sections={sections}
    templateId={selectedTemplateId}
    customizations={customizations}
  />
</div>


      </div>
    </DndProvider>
  );
};

export default ResumeForm;