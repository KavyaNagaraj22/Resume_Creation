import React from "react";
import "../templatesstyle/resume7.css";

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

const Resume7 = ({ data, sections, customizations = {} }) => {
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
    backgroundColor: globalCustomizations.templateColor || '#fff',
    ...applyStyles(globalCustomizations)
  };

  const sectionRenderers = {
    profile: (sectionCustomizations) => profile.summary && (
      <section key="profile" className="resume7-summary" style={applyStyles(sectionCustomizations)}>
        <p>{profile.summary}</p>
      </section>
    ),
    experience: (sectionCustomizations) => experience.length > 0 && (
      <section key="experience" style={applyStyles(sectionCustomizations)}>
        <h3 style={{ marginBottom: globalCustomizations.spacing }}>Professional Experience</h3>
        {experience.map((exp, idx) => (
          <div key={idx} className="resume7-entry" style={{ marginBottom: globalCustomizations.spacing }}>
            <div className="resume7-timeline">
              <span>{exp.startDate} – {exp.endDate}</span>
              <span>{exp.location}</span>
            </div>
            <strong>{exp.role}, <em>{exp.company}</em></strong>
            <ul>{ensureArray(exp.details).map((d, i) => <li key={i}>{d}</li>)}</ul>
          </div>
        ))}
      </section>
    ),
    education: (sectionCustomizations) => education.length > 0 && (
      <section key="education" style={applyStyles(sectionCustomizations)}>
        <h3 style={{ marginBottom: globalCustomizations.spacing }}>Education</h3>
        <table className="resume7-education-table">
          <thead>
            <tr>
              <th>Degree</th>
              <th>Institution</th>
              <th>Years</th>
            </tr>
          </thead>
          <tbody>
            {education.map((edu, idx) => (
              <tr key={idx}>
                <td>{edu.degree}</td>
                <td>{edu.institution}</td>
                <td>{edu.startYear} – {edu.endYear}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    ),
    skills: (sectionCustomizations) => skills.length > 0 && (
      <section key="skills" style={applyStyles(sectionCustomizations)}>
        <h3 style={{ marginBottom: globalCustomizations.spacing }}>Skills</h3>
        <div className="resume7-tags">
          {skills.map((skill, idx) => <span key={idx}>{skill}</span>)}
        </div>
      </section>
    ),
    languages: (sectionCustomizations) => languages.length > 0 && (
      <section key="languages" style={applyStyles(sectionCustomizations)}>
        <h3 style={{ marginBottom: globalCustomizations.spacing }}>Languages</h3>
        <div className="resume7-tags">
          {languages.map((lang, idx) => (
            <span key={idx}>
              {typeof lang === "string" ? lang : `${lang.name} (${lang.level})`}
            </span>
          ))}
        </div>
      </section>
    ),
    awards: (sectionCustomizations) => awards.length > 0 && (
      <section key="awards" style={applyStyles(sectionCustomizations)}>
        <h3 style={{ marginBottom: globalCustomizations.spacing }}>Awards</h3>
        <ul>
          {awards.map((a, idx) => (
            <li key={idx}><strong>{a.title}</strong> – {a.issuer}</li>
          ))}
        </ul>
      </section>
    ),
    certificates: (sectionCustomizations) => certificates.length > 0 && (
      <section key="certificates" style={applyStyles(sectionCustomizations)}>
        <h3 style={{ marginBottom: globalCustomizations.spacing }}>Certificates</h3>
        <ul>{certificates.map((cert, i) => <li key={i}>{cert.name}</li>)}</ul>
      </section>
    ),
    projects: (sectionCustomizations) => projects.length > 0 && (
      <section key="projects" style={applyStyles(sectionCustomizations)}>
        <h3 style={{ marginBottom: globalCustomizations.spacing }}>Projects</h3>
        {projects.map((p, i) => <p key={i}>{p.title}</p>)}
      </section>
    ),
    organisations: (sectionCustomizations) => organisations.length > 0 && (
      <section key="organisations" style={applyStyles(sectionCustomizations)}>
        <h3 style={{ marginBottom: globalCustomizations.spacing }}>Organisations</h3>
        {organisations.map((o, i) => <p key={i}>{o.name}</p>)}
      </section>
    ),
    courses: (sectionCustomizations) => courses.length > 0 && (
      <section key="courses" style={applyStyles(sectionCustomizations)}>
        <h3 style={{ marginBottom: globalCustomizations.spacing }}>Courses</h3>
        {courses.map((c, i) => <p key={i}>{c.name}</p>)}
      </section>
    ),
    publications: (sectionCustomizations) => publications.length > 0 && (
      <section key="publications" style={applyStyles(sectionCustomizations)}>
        <h3 style={{ marginBottom: globalCustomizations.spacing }}>Publications</h3>
        {publications.map((p, i) => <p key={i}>{p.title}</p>)}
      </section>
    ),
    references: (sectionCustomizations) => references.length > 0 && (
      <section key="references" style={applyStyles(sectionCustomizations)}>
        <h3 style={{ marginBottom: globalCustomizations.spacing }}>References</h3>
        {references.map((r, i) => <p key={i}>{r.name}</p>)}
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
    <div className="resume7" style={templateStyle}>
      <header className="resume7-header">
        <div>
          <h1 style={{ color: globalCustomizations.fontColor }}>{profile.fullName || "Your Name"}</h1>
          <h2 style={{ color: globalCustomizations.fontColor }}>{profile.title}</h2>
          <p style={{ color: globalCustomizations.fontColor }}>{profile.address}</p>
          <p style={{ color: globalCustomizations.fontColor }}>{profile.email} | {profile.phone}</p>
        </div>
        {profile.photo && <img src={profile.photo} alt="profile" className="resume7-photo" />}
      </header>

      {sections.map((sectionKey) => {
        const renderSection = sectionRenderers[sectionKey];
        const sectionCustomizations = customizations[sectionKey] || globalCustomizations;
        return renderSection ? renderSection(sectionCustomizations) : null;
      })}
    </div>
  );
};

export default Resume7;