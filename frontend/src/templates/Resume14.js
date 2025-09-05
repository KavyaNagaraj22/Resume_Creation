import React from "react";
import "../templatesstyle/CreativeTemplate.css";

// Re-using utility functions for consistency
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

const CreativeTemplate = ({ data, sections, customizations = {} }) => {
  const {
    profile = {},
    experience = [],
    education = [],
    skills = [],
    languages = [],
    strengths = [],
    awards = [],
    certificates = [],
    projects = [],
    organisations = [],
    courses = [],
    publications = [],
    references = [],
    declaration = "",
  } = data || {};

  const globalCustomizations = customizations.global || {};

  const templateStyle = {
    backgroundColor: globalCustomizations.templateColor || '#fff',
    ...applyStyles(globalCustomizations)
  };

  // Map of section keys to their rendering logic
  const sectionRenderers = {
    profile: (sectionCustomizations) => profile.summary && (
      <div key="profile" className="resume-section" style={applyStyles(sectionCustomizations)}>
        <h3 style={{ marginBottom: globalCustomizations.spacing }}>Objective</h3>
        <p>{profile.summary}</p>
      </div>
    ),
    experience: (sectionCustomizations) =>
      experience.length > 0 && (
        <div className="resume-section" key="experience" style={applyStyles(sectionCustomizations)}>
          <h3 style={{ marginBottom: globalCustomizations.spacing }}>Professional Experience</h3>
          {experience.map((exp, i) => (
            <div key={`exp-${i}`} className="entry" style={{ marginBottom: global.spacing || 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <strong>{exp.role}</strong>
                <span style={{ whiteSpace: "nowrap" }}>
                  {exp.startDate} - {exp.endDate || "Present"}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <p style={{ margin: 0, padding: 0 }}>{exp.company}</p>
                <small>{exp.location}</small>
              </div>
              {ensureArray(exp.details).length > 0 && (
                <ul style={{ margin: "18px 0 0 18px" }}>
                  {ensureArray(exp.details).map((pt, j) => (
                    <li key={`exp-${i}-pt-${j}`}>{pt}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      ),
    education: (sectionCustomizations) =>
      education.length > 0 && (
        <div key="education" className="resume-section" style={applyStyles(sectionCustomizations)}>
          <h3>Education</h3>
          <table className="resume2-education-table">
            <thead>
              <tr>
                <th>Degree</th>
                <th>Institution</th>
                <th>Years</th>
                {education[0]?.gpa && <th>CGPA</th>}
              </tr>
            </thead>
            <tbody>
              {education.map((edu, i) => (
                <tr key={i}>
                  <td>{edu.degree}</td>
                  <td>{edu.institution}</td>
                  <td>
                    <span style={{ whiteSpace: "nowrap" }}>{edu.startDate} – {edu.endDate}</span>
                  </td>
                  {edu.gpa && <td>{edu.gpa}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ),
    projects: (sectionCustomizations) => projects.length > 0 && (
      <div key="projects" className="resume-section" style={applyStyles(sectionCustomizations)}>
        <h3 style={{ marginBottom: globalCustomizations.spacing }}>Projects</h3>
        {projects.map((p, i) => (
            <div key={`proj-${i}`} className="entry" style={{ marginBottom: global.spacing || 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <h4 style={{ margin: 0 }}>{p.title}</h4>
                <span style={{ whiteSpace: "nowrap" }}>
                  {p.startDate} - {p.endDate || "Present"}
                </span>
              </div>
              {p.description && <p style={{ margin: "5px 0" }}>{p.description}</p>}
              {p.link && <p>ðŸ”— {p.link}</p>}
            </div>
          ))}
      </div>
    ),
    organisations: (sectionCustomizations) => organisations.length > 0 && (
      <div key="organisations" className="resume-section" style={applyStyles(sectionCustomizations)}>
        <h3 style={{ marginBottom: globalCustomizations.spacing }}>Organisations</h3>
        {organisations.map((o, i) => (
          <p key={i}>
            <strong>{o.name}</strong> – {o.role}, {o.year}
          </p>
        ))}
      </div>
    ),
    courses: (sectionCustomizations) => courses.length > 0 && (
      <div key="courses" className="resume-section" style={applyStyles(sectionCustomizations)}>
        <h3 style={{ marginBottom: globalCustomizations.spacing }}>Courses</h3>
        {courses.map((c, i) => (
            <div
              key={`course-${i}`}
              className="entry"
              style={{ display: "flex", justifyContent: "space-between", marginBottom: global.spacing || 6 }}
            >
              <span>{c.name} - {c.provider}</span>
              <span style={{ whiteSpace: "nowrap" }}>{c.year}</span>
            </div>
          ))}
      </div>
    ),
    publications: (sectionCustomizations) => publications.length > 0 && (
      <div key="publications" className="resume-section" style={applyStyles(sectionCustomizations)}>
        <h3 style={{ marginBottom: globalCustomizations.spacing }}>Publications</h3>
        {publications.map((p, i) => (
            <div
              key={`pub-${i}`}
              className="entry"
              style={{ display: "flex", justifyContent: "space-between", marginBottom: global.spacing || 6 }}
            >
              <span>
                {p.title} - {p.journal}
              </span>
              <span style={{ whiteSpace: "nowrap" }}>{p.year}</span>
            </div>
          ))}
      </div>
    ),
    references: (sectionCustomizations) => references.length > 0 && (
      <div key="references" className="resume-section" style={applyStyles(sectionCustomizations)}>
        <h3 style={{ marginBottom: globalCustomizations.spacing }}>References</h3>
        {references.map((r, i) => (
          <p key={i}>
            <strong>{r.name}</strong> ({r.relation}) — {r.contact}
          </p>
        ))}
      </div>
    ),
    skills: (sectionCustomizations) => skills.length > 0 && (
      <div key="skills" className="resume-section" style={applyStyles(sectionCustomizations)}>
        <h3 style={{ marginBottom: globalCustomizations.spacing }}>Skills</h3>
        <ul className="inline-list">
          {skills.map((skill, i) => (
            <li key={i}>{skill}</li>
          ))}
        </ul>
      </div>
    ),
    languages: (sectionCustomizations) => languages.length > 0 && (
      <div key="languages" className="resume-section" style={applyStyles(sectionCustomizations)}>
        <h3 style={{ marginBottom: globalCustomizations.spacing }}>Languages</h3>
        <ul className="inline-list">
          {languages.map((lang, i) => {
            const name = typeof lang === "string" ? lang : lang.name || "Language";
            return (
              <li key={i}>
                <strong>{name}</strong>
              </li>
            );
          })}
        </ul>
      </div>
    ),
    strengths: (sectionCustomizations) => strengths.length > 0 && (
      <div key="strengths" className="resume-section" style={applyStyles(sectionCustomizations)}>
        <h3 style={{ marginBottom: globalCustomizations.spacing }}>Strengths</h3>
        <ul>
          {strengths.map((s, i) => (
            <li key={i}> {s}</li>
          ))}
        </ul>
      </div>
    ),
    certificates: (sectionCustomizations) => certificates.length > 0 && (
      <div key="certificates" className="resume-section" style={applyStyles(sectionCustomizations)}>
        <h3 style={{ marginBottom: globalCustomizations.spacing }}>Certificates</h3>
        <ul>
        {certificates.map((cert, i) => (
            <div key={`cert-${i}`} className="entry" style={{ marginBottom: global.spacing || 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <p style={{ margin: 0, padding: 0 }}>{cert.name}</p>
                <p style={{ margin: 0, padding: 0, textAlign: "center", flexGrow: 1 }}>{cert.issuer}</p>
                <small>{cert.year}</small>
              </div>
            </div>
          ))}
        </ul>
      </div>
    ),
    awards: (sectionCustomizations) => awards.length > 0 && (
      <div key="awards" className="resume-section" style={applyStyles(sectionCustomizations)}>
        <h3 style={{ marginBottom: globalCustomizations.spacing }}>Awards</h3>
        <ul>
        {awards.map((a, i) => (
            <div
              key={`award-${i}`}
              className="entry"
              style={{ display: "flex", justifyContent: "space-between", marginBottom: global.spacing || 6 }}
            >
              <span>
                {a.title} presented by {a.issuer}
              </span>
              <span style={{ whiteSpace: "nowrap" }}>{a.year}</span>
            </div>
          ))}
        </ul>
      </div>
    ),
    declaration: (sectionCustomizations) => declaration && (
      <div key="declaration" className="resume-section" style={applyStyles(sectionCustomizations)}>
        <h3 style={{ marginBottom: globalCustomizations.spacing }}>Declaration</h3>
        <p>{declaration}</p>
      </div>
    ),
  };

  return (
    <div className="creative-template" style={templateStyle}>
      <header className="creative-header">
        {profile.photo && (
          <img src={profile.photo} alt="Profile" className="creative-photo" />
        )}
        <div style={{ color: globalCustomizations.fontColor }}>
          <h1>{profile.fullName || "Your Name"}</h1>
          <p>{profile.address}</p>
          <p>{profile.email}</p>
          <p>{profile.phone}</p>
          <p>{profile.linkedin}</p>
        </div>
      </header>

      <main className="creative-body">
        {sections.map((sectionKey) => {
          const renderSection = sectionRenderers[sectionKey];
          const sectionCustomizations = customizations[sectionKey] || globalCustomizations;
          return renderSection ? renderSection(sectionCustomizations) : null;
        })}
      </main>
    </div>
  );
};

export default CreativeTemplate;