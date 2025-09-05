import React from "react";
import "../templatesstyle/ModernTemplate.css";

// Re-using the utility functions from ClassicTemplate
const ensureArray = (value) => {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    return value.split("\n").map((line) => line.trim()).filter(Boolean);
  }
  return [];
};

const applyStyles = (customizations) => {
  if (!customizations) return {};

  return {
    fontSize: customizations.fontSize,
    fontFamily: customizations.fontStyle,
    color: customizations.fontColor,
    fontWeight: customizations.bold ? "bold" : "normal",
    fontStyle: customizations.italic ? "italic" : "normal",
    textDecoration: customizations.underline ? "underline" : "none",
    textAlign: customizations.align,
  };
};

const ModernTemplate = ({ data, sections, customizations = {} }) => {
  const {
    profile = {},
    experience = [],
    education = [],
    skills = [],
    languages = [],
    awards = [],
    certificates = [],
    projects = [],
    organisations = [],
    courses = [],
    publications = [],
    references = [],
    declaration = ""
  } = data || {};

  const globalCustomizations = customizations.global || {};

  const templateStyle = {
    backgroundColor: globalCustomizations.templateColor || '#f5f5f5',
    ...applyStyles(globalCustomizations)
  };

  const isEmpty =
    Object.keys(profile).length === 0 &&
    experience.length === 0 &&
    education.length === 0 &&
    skills.length === 0 &&
    languages.length === 0 &&
    awards.length === 0 &&
    certificates.length === 0 &&
    projects.length === 0 &&
    organisations.length === 0 &&
    courses.length === 0 &&
    publications.length === 0 &&
    references.length === 0 &&
    !declaration;

  if (isEmpty) {
    return (
      <div className="modern-template-empty">
        <p>No resume data to display. Please add content in the editor.</p>
      </div>
    );
  }

  // --- Dynamic Section Rendering Logic with Customizations ---
  const sectionRenderers = {
    profile: (sectionCustomizations) => profile.summary && (
      <div key="profile" className="resume-section" style={applyStyles(sectionCustomizations)}>
        <h2 className="section-heading" style={{ marginBottom: globalCustomizations.spacing }}>✦ Objective</h2>
        <p>{profile.summary}</p>
      </div>
    ),
    experience: (sectionCustomizations) => experience.length > 0 && (
      <div key="experience" className="resume-section" style={applyStyles(sectionCustomizations)}>
        <h2 className="section-heading" style={{ marginBottom: globalCustomizations.spacing }}>✦ Professional Experience</h2>
        {experience.map((exp, i) => (
          <div key={i} className="entry" style={{ marginBottom: globalCustomizations.spacing }}>
            <h3>{exp.company || 'Company Name'}</h3>
            <p>{exp.role || 'Role'} | {exp.startDate || ''} – {exp.endDate || 'Present'} | {exp.location || 'Location'}</p>
            <ul>{ensureArray(exp.description).map((desc, j) => <li key={j}>{desc}</li>)}</ul>
          </div>
        ))}
      </div>
    ),
    education: (sectionCustomizations) => education.length > 0 && (
      <div key="education" className="resume-section" style={applyStyles(sectionCustomizations)}>
        <h2 className="section-heading" style={{ marginBottom: globalCustomizations.spacing }}>✦ Education</h2>
        {education.map((edu, i) => (
          <div key={i} className="entry" style={{ marginBottom: globalCustomizations.spacing }}>
            <h3>{edu.degree || 'Degree'}</h3>
            <p>{edu.institution || 'Institution'} | {edu.startYear || ''} – {edu.endYear || ''}</p>
          </div>
        ))}
      </div>
    ),
    skills: (sectionCustomizations) => skills.length > 0 && (
      <div key="skills" className="skills" style={applyStyles(sectionCustomizations)}>
        <h2>✦ Skills</h2>
        <ul className="inline-list">{skills.map((s, i) => <li key={i}>{s}</li>)}</ul>
      </div>
    ),
    languages: (sectionCustomizations) => languages.length > 0 && (
      <div key="languages" className="languages" style={applyStyles(sectionCustomizations)}>
        <h2>✧ Languages</h2>
        <ul className="inline-list">{languages.map((lang, i) => <li key={i}>{lang}</li>)}</ul>
      </div>
    ),
    awards: (sectionCustomizations) => awards.length > 0 && (
      <div key="awards" className="awards" style={applyStyles(sectionCustomizations)}>
        <h2>🏅 Awards</h2>
        <ul>{awards.map((a, i) => (
          <li key={i}>
            <strong>{a.title || 'Award Title'}</strong>— {a.issuer || 'Issuer'}, {a.year || 'Year'}
          </li>
        ))}</ul>
      </div>
    ),
    certificates: (sectionCustomizations) => certificates.length > 0 && (
      <div key="certificates" className="resume-section" style={applyStyles(sectionCustomizations)}>
        <h2 className="section-heading" style={{ marginBottom: globalCustomizations.spacing }}>✦ Certifications</h2>
        {certificates.map((cert, i) => (
          <div key={i} className="entry" style={{ marginBottom: globalCustomizations.spacing }}>
            <h3>{cert.name || 'Certificate Name'}</h3>
          </div>
        ))}
      </div>
    ),
    projects: (sectionCustomizations) => projects.length > 0 && (
      <div key="projects" className="resume-section" style={applyStyles(sectionCustomizations)}>
        <h2 className="section-heading" style={{ marginBottom: globalCustomizations.spacing }}>✦ Projects</h2>
        {projects.map((p, i) => (
          <div key={i} className="entry" style={{ marginBottom: globalCustomizations.spacing }}>
            <h3>{p.title || 'Project Title'}</h3>
            <p>{p.description || 'Project Description'}</p>
            {p.link && (
              <p>
                🔗 <a href={p.link} target="_blank" rel="noopener noreferrer">{p.link}</a>
              </p>
            )}
          </div>
        ))}
      </div>
    ),
    organisations: (sectionCustomizations) => organisations.length > 0 && (
      <div key="organisations" className="resume-section" style={applyStyles(sectionCustomizations)}>
        <h2 className="section-heading" style={{ marginBottom: globalCustomizations.spacing }}>✦ Organisations</h2>
        {organisations.map((o, i) => (
          <div key={i} className="entry" style={{ marginBottom: globalCustomizations.spacing }}>
            <p><strong>{o.name}</strong> – {o.role}, {o.year}</p>
          </div>
        ))}
      </div>
    ),
    courses: (sectionCustomizations) => courses.length > 0 && (
      <div key="courses" className="resume-section" style={applyStyles(sectionCustomizations)}>
        <h2 className="section-heading" style={{ marginBottom: globalCustomizations.spacing }}>✦ Courses</h2>
        {courses.map((c, i) => (
          <div key={i} className="entry" style={{ marginBottom: globalCustomizations.spacing }}>
            <p><strong>{c.name}</strong> — {c.provider}, {c.year}</p>
          </div>
        ))}
      </div>
    ),
    publications: (sectionCustomizations) => publications.length > 0 && (
      <div key="publications" className="resume-section" style={applyStyles(sectionCustomizations)}>
        <h2 className="section-heading" style={{ marginBottom: globalCustomizations.spacing }}>✦ Publications</h2>
        {publications.map((p, i) => (
          <div key={i} className="entry" style={{ marginBottom: globalCustomizations.spacing }}>
            <p><strong>{p.title}</strong> — {p.journal}, {p.year}</p>
          </div>
        ))}
      </div>
    ),
    references: (sectionCustomizations) => references.length > 0 && (
      <div key="references" className="resume-section" style={applyStyles(sectionCustomizations)}>
        <h2 className="section-heading" style={{ marginBottom: globalCustomizations.spacing }}>✦ References</h2>
        {references.map((r, i) => (
          <div key={i} className="entry" style={{ marginBottom: globalCustomizations.spacing }}>
            <p><strong>{r.name}</strong> ({r.relation}) — {r.contact}</p>
          </div>
        ))}
      </div>
    ),
    declaration: (sectionCustomizations) => declaration && (
      <div key="declaration" className="resume-section" style={applyStyles(sectionCustomizations)}>
        <h2 className="section-heading" style={{ marginBottom: globalCustomizations.spacing }}>✍ Declaration</h2>
        <p>{declaration}</p>
      </div>
    ),
  };

  const sidebarSections = ["skills", "languages", "awards"];

  const getFilteredSections = (sectionKeys) => {
    return sectionKeys
      .filter(key => sections.includes(key) && sectionRenderers[key])
      .map(key => {
        const sectionCustomizations = customizations[key] || globalCustomizations;
        return sectionRenderers[key](sectionCustomizations);
      });
  };

  // Divide sections based on their type (main or sidebar)
  const mainSectionsToRender = sections.filter(key => !sidebarSections.includes(key));
  const sidebarSectionsToRender = sections.filter(key => sidebarSections.includes(key));
  
  const renderedMainSections = getFilteredSections(mainSectionsToRender);
  const renderedSidebarSections = getFilteredSections(sidebarSectionsToRender);

  return (
    <div className="modern-template" style={templateStyle}>
      {/* Sidebar */}
      <div className="sidebar">
        <div className="name-title" style={{ color: globalCustomizations.fontColor }}>
          <h1>{profile.fullName || "Your Name"}</h1>
          {profile.title && <h2>{profile.title}</h2>}
        </div>

        {profile.photo && (
          <img src={profile.photo} alt="Profile" className="photo" />
        )}

        <div className="contact" style={{ color: globalCustomizations.fontColor }}>
          {profile.email && <p>✉ {profile.email}</p>}
          {profile.phone && <p>✆ {profile.phone}</p>}
          {profile.address && <p>⌂ {profile.address}</p>}
          {profile.linkedin && (
            <p>
              🔗 <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">{profile.linkedin}</a>
            </p>
          )}
          {profile.website && (
            <p>
              🌐 <a href={profile.website} target="_blank" rel="noopener noreferrer">{profile.website}</a>
            </p>
          )}
          {profile.github && (
            <p>
              💻 <a href={profile.github} target="_blank" rel="noopener noreferrer">{profile.github}</a>
            </p>
          )}
          {profile.portfolio && (
            <p>
              📁 <a href={profile.portfolio} target="_blank" rel="noopener noreferrer">{profile.portfolio}</a>
            </p>
          )}
        </div>

        {renderedSidebarSections}
      </div>

      {/* Main */}
      <div className="main">
        {renderedMainSections}
      </div>
    </div>
  );
};

export default ModernTemplate;