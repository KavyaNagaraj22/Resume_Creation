import React from "react";
import "../templatesstyle/RedAccentTemplate.css";

// Utility functions for styling and data handling
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

const RedAccentTemplate = ({ data, sections, customizations = {} }) => {
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
    declaration = "",
  } = data || {};

  const globalCustomizations = customizations.global || {};

  const templateStyle = {
    backgroundColor: globalCustomizations.templateColor || '#f5f5f5',
    ...applyStyles(globalCustomizations)
  };

  const sectionRenderers = {
    profile: (sectionCustomizations) => profile.summary && (
      <section key="profile" style={applyStyles(sectionCustomizations)}>
        <h3 style={{ marginBottom: globalCustomizations.spacing }}>Objective</h3>
        <p>{profile.summary}</p>
      </section>
    ),
    experience: (sectionCustomizations) => experience.length > 0 && (
      <section key="experience" style={applyStyles(sectionCustomizations)}>
        <h3 style={{ marginBottom: globalCustomizations.spacing }}>Professional Experience</h3>
        {experience.map((exp, i) => (
          <div key={i} className="entry" style={{ marginBottom: globalCustomizations.spacing }}>
            <p className="date-loc">{exp.startDate} – {exp.endDate}</p>
            <p><strong>{exp.company}</strong>, <em>{exp.role}</em></p>
            <p>{exp.location}</p>
            <ul>{ensureArray(exp.details).map((pt, j) => <li key={j}>{pt}</li>)}</ul>
          </div>
        ))}
      </section>
    ),
    education: (sectionCustomizations) => education.length > 0 && (
      <section key="education" style={applyStyles(sectionCustomizations)}>
        <h3 style={{ marginBottom: globalCustomizations.spacing }}>Education</h3>
        <table className="resume4-education-table">
          <thead>
            <tr>
              <th>Degree</th>
              <th>Institution</th>
              <th>Years</th>
            </tr>
          </thead>
          <tbody>
            {education.map((edu, i) => (
              <tr key={i}>
                <td>{edu.degree}</td>
                <td>{edu.institution}</td>
                <td>{edu.startYear} – {edu.endYear}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    ),
    projects: (sectionCustomizations) => projects.length > 0 && (
      <section key="projects" style={applyStyles(sectionCustomizations)}>
        <h3 style={{ marginBottom: globalCustomizations.spacing }}>Projects</h3>
        {projects.map((p, i) => (
          <div key={i} className="entry" style={{ marginBottom: globalCustomizations.spacing }}>
            <h4>{p.title}</h4>
            <p>{p.description}</p>
            {p.link && <p>🔗 {p.link}</p>}
          </div>
        ))}
      </section>
    ),
    certificates: (sectionCustomizations) => certificates.length > 0 && (
      <section key="certificates" style={applyStyles(sectionCustomizations)}>
        <h3 style={{ marginBottom: globalCustomizations.spacing }}>Certificates</h3>
        <div className="pill-container">
          {certificates.map((cert, i) => (
            <span className="pill" key={i}>
              {cert.title ||
                cert.name ||
                `${cert.issuer || ""} ${cert.year || ""}`.trim() ||
                "Certificate"}
            </span>
          ))}
        </div>
      </section>
    ),
    languages: (sectionCustomizations) => languages.length > 0 && (
      <section key="languages" style={applyStyles(sectionCustomizations)}>
        <h3 style={{ marginBottom: globalCustomizations.spacing }}>Languages</h3>
        <div className="pill-container">
          {languages.map((lang, i) => (
            <span className="pill" key={i}>
              {typeof lang === "string"
                ? lang
                : `${lang.name}${lang.level ? ` (${lang.level})` : ""}`}
            </span>
          ))}
        </div>
      </section>
    ),
    skills: (sectionCustomizations) => skills.length > 0 && (
      <section key="skills" style={applyStyles(sectionCustomizations)}>
        <h3 style={{ marginBottom: globalCustomizations.spacing }}>Skills</h3>
        <div className="pill-container">
          {skills.map((skill, i) => (
            <span className="pill" key={i}>{skill}</span>
          ))}
        </div>
      </section>
    ),
    awards: (sectionCustomizations) => awards.length > 0 && (
      <section key="awards" style={applyStyles(sectionCustomizations)}>
        <h3 style={{ marginBottom: globalCustomizations.spacing }}>Awards</h3>
        <ul>
          {awards.map((a, i) => (
            <li key={i}><strong>{a.title}</strong> — {a.issuer}, {a.year}</li>
          ))}
        </ul>
      </section>
    ),
    organisations: (sectionCustomizations) => organisations.length > 0 && (
      <section key="organisations" style={applyStyles(sectionCustomizations)}>
        <h3 style={{ marginBottom: globalCustomizations.spacing }}>Organisations</h3>
        {organisations.map((o, i) => (
          <p key={i}><strong>{o.name}</strong> – {o.role}, {o.year}</p>
        ))}
      </section>
    ),
    courses: (sectionCustomizations) => courses.length > 0 && (
      <section key="courses" style={applyStyles(sectionCustomizations)}>
        <h3 style={{ marginBottom: globalCustomizations.spacing }}>Courses</h3>
        {courses.map((c, i) => (
          <p key={i}><strong>{c.name}</strong> — {c.provider}, {c.year}</p>
        ))}
      </section>
    ),
    publications: (sectionCustomizations) => publications.length > 0 && (
      <section key="publications" style={applyStyles(sectionCustomizations)}>
        <h3 style={{ marginBottom: globalCustomizations.spacing }}>Publications</h3>
        {publications.map((p, i) => (
          <p key={i}><strong>{p.title}</strong> — {p.journal}, {p.year}</p>
        ))}
      </section>
    ),
    references: (sectionCustomizations) => references.length > 0 && (
      <section key="references" style={applyStyles(sectionCustomizations)}>
        <h3 style={{ marginBottom: globalCustomizations.spacing }}>References</h3>
        {references.map((r, i) => (
          <p key={i}><strong>{r.name}</strong> ({r.relation}) — {r.contact}</p>
        ))}
      </section>
    ),
    declaration: (sectionCustomizations) => declaration && (
      <section key="declaration" style={applyStyles(sectionCustomizations)}>
        <h3 style={{ marginBottom: globalCustomizations.spacing }}>Declaration</h3>
        <p>{declaration}</p>
      </section>
    ),
  };

  return (
    <div className="red-template" style={templateStyle}>
      <header className="red-header">
        <h1 style={{ color: globalCustomizations.fontColor }}>{profile.fullName || "Your Name"}</h1>
        <div className="red-contact">
          {profile.email && (
            <p>
              <img src="/GMailLogo.png" alt="Email" style={{ width: "16px", marginRight: "8px", verticalAlign: "middle" }} />
              {profile.email}
            </p>
          )}
          {profile.phone && <p>📞 {profile.phone}</p>}
          {profile.address && (
            <p>
              <img src="/LocationLogo.png" alt="Location" style={{ width: "16px", marginRight: "8px", verticalAlign: "middle" }} />
              {profile.address}
            </p>
          )}
          {profile.linkedin && (
            <p>
              <img src="/LinkedInLogo.png" alt="LinkedIn" style={{ width: "16px", marginRight: "8px", verticalAlign: "middle" }} />
              {profile.linkedin}
            </p>
          )}
        </div>
      </header>

      <main className="red-body">
        {sections.map((sectionKey) => {
          const renderSection = sectionRenderers[sectionKey];
          const sectionCustomizations = customizations[sectionKey] || globalCustomizations;
          return renderSection ? renderSection(sectionCustomizations) : null;
        })}
      </main>
    </div>
  );
};

export default RedAccentTemplate;