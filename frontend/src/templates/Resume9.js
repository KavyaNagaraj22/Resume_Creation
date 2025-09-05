// Resume9.js with DnD + Customization + Objective Fix
import React, { Fragment } from "react";
import "../templatesstyle/resume9.css";

// --- utils ---
const ensureArray = (value) => {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    return value.split("\n").map((line) => line.trim()).filter(Boolean);
  }
  return [];
};

const applyStyles = (c) => {
  if (!c) return {};
  return {
    fontSize: c.fontSize,
    fontFamily: c.fontStyle,
    color: c.fontColor,
    fontWeight: c.bold ? "bold" : "normal",
    fontStyle: c.italic ? "italic" : "normal",
    textDecoration: c.underline ? "underline" : "none",
    textAlign: c.align,
    lineHeight: c.lineHeight || "1.4",
  };
};

const Resume9 = ({
  data = {},
  sections = [
    "summary",
    "experience",
    "education",
    "skills",
    "languages",
    "projects",
    "certificates",
    "awards",
    "organisations",
    "courses",
    "publications",
    "references",
    "declaration",
  ],
  customizations = { global: {} },
}) => {
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
    objective = "" // keep only this in case you pass objective separately
  } = data || {};

  const global = customizations.global || {};
  const containerStyle = {
    backgroundColor: global.templateColor || "var(--background-dark)",
    ...applyStyles(global),
  };

  // section wrapper
  const Section = ({ children, keyName, style }) => (
    <div className="resume9-section" style={style} data-section={keyName}>
      {children}
    </div>
  );

  // section renderers (only right-column sections)
  const sectionRenderers = {
    summary: (sc) => {
      const summaryText = profile.summary || objective;
      return summaryText ? (
        <Section keyName="summary" style={applyStyles(sc)}>
          <h2 className="resume9-section-title">OBJECTIVE</h2>
          <p className="resume9-summary-text">{summaryText}</p>
        </Section>
      ) : null;
    },
    

    experience: (sc) =>
      experience.length > 0 ? (
        <Section keyName="experience" style={applyStyles(sc)}>
          <h2 className="resume9-section-title">PROFESSIONAL EXPERIENCE</h2>
          {experience.map((exp, i) => (
            <div key={i} className="resume9-entry">
              <h3 className="resume9-entry-title">{exp.company || "Company"}</h3>
              <p className="resume9-entry-role">{exp.role}</p>
              <p className="resume9-entry-meta">
                {exp.startDate} – {exp.endDate || "Present"} | {exp.location}
              </p>
              {ensureArray(exp.details).length > 0 && (
                <ul className="resume9-details-list">
                  {ensureArray(exp.details).map((d, j) => (
                    <li key={j}>{d}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </Section>
      ) : null,

    education: (sc) =>
      education.length > 0 ? (
        <Section keyName="education" style={applyStyles(sc)}>
          <h2 className="resume9-section-title">EDUCATION</h2>
          {education.map((edu, i) => (
            <div key={i} className="resume9-entry">
              <h3 className="resume9-entry-title">{edu.degree}</h3>
              <p className="resume9-entry-meta">{edu.institution}</p>
              <p className="resume9-entry-meta">
                {edu.startYear} – {edu.endYear}
              </p>
            </div>
          ))}
        </Section>
      ) : null,

    skills: (sc) =>
      skills.length > 0 ? (
        <Section keyName="skills" style={applyStyles(sc)}>
          <h2 className="resume9-section-title">SKILLS</h2>
          <div className="resume9-skills-grid">
            {skills.map((s, i) => (
              <span key={i} className="resume9-skill-tag">
                {s}
              </span>
            ))}
          </div>
        </Section>
      ) : null,

    languages: (sc) =>
      languages.length > 0 ? (
        <Section keyName="languages" style={applyStyles(sc)}>
          <h2 className="resume9-section-title">LANGUAGES</h2>
          <div className="resume9-languages-grid">
            {languages.map((l, i) => (
              <span key={i} className="resume9-language-tag">
                {l.name || l}
              </span>
            ))}
          </div>
        </Section>
      ) : null,

    projects: (sc) =>
      projects.length > 0 ? (
        <Section keyName="projects" style={applyStyles(sc)}>
          <h2 className="resume9-section-title">PROJECTS</h2>
          {projects.map((p, i) => (
            <div key={i} className="resume9-entry">
              <h3 className="resume9-entry-title">{p.title}</h3>
              <p className="resume9-entry-meta">{p.description}</p>
              {p.link && (
                <p className="resume9-entry-meta">
                  <a href={p.link} target="_blank" rel="noopener noreferrer">
                    {p.link.replace(/(^\w+:|^)\/\//, "")}
                  </a>
                </p>
              )}
            </div>
          ))}
        </Section>
      ) : null,

    certificates: (sc) =>
      certificates.length > 0 ? (
        <Section keyName="certificates" style={applyStyles(sc)}>
          <h2 className="resume9-section-title">CERTIFICATES</h2>
          <ul className="resume9-list-plain">
            {certificates.map((c, i) => (
              <li key={i}>
                <strong>{c.name || c.title}</strong> - {c.issuer}, {c.year}
              </li>
            ))}
          </ul>
        </Section>
      ) : null,

    awards: (sc) =>
      awards.length > 0 ? (
        <Section keyName="awards" style={applyStyles(sc)}>
          <h2 className="resume9-section-title">AWARDS</h2>
          <ul className="resume9-list-plain">
            {awards.map((a, i) => (
              <li key={i}>
                <strong>{a.title}</strong> - {a.issuer}, {a.year}
              </li>
            ))}
          </ul>
        </Section>
      ) : null,

    organisations: (sc) =>
      organisations.length > 0 ? (
        <Section keyName="organisations" style={applyStyles(sc)}>
          <h2 className="resume9-section-title">ORGANISATIONS</h2>
          <ul className="resume9-list-plain">
            {organisations.map((o, i) => (
              <li key={i}>
                <strong>{o.name}</strong> – {o.role}, {o.year}
              </li>
            ))}
          </ul>
        </Section>
      ) : null,

    courses: (sc) =>
      courses.length > 0 ? (
        <Section keyName="courses" style={applyStyles(sc)}>
          <h2 className="resume9-section-title">COURSES</h2>
          <ul className="resume9-list-plain">
            {courses.map((c, i) => (
              <li key={i}>
                <strong>{c.name}</strong> — {c.provider}, {c.year}
              </li>
            ))}
          </ul>
        </Section>
      ) : null,

    publications: (sc) =>
      publications.length > 0 ? (
        <Section keyName="publications" style={applyStyles(sc)}>
          <h2 className="resume9-section-title">PUBLICATIONS</h2>
          <ul className="resume9-list-plain">
            {publications.map((p, i) => (
              <li key={i}>
                <strong>{p.title}</strong> — {p.journal}, {p.year}
              </li>
            ))}
          </ul>
        </Section>
      ) : null,

    references: (sc) =>
      references.length > 0 ? (
        <Section keyName="references" style={applyStyles(sc)}>
          <h2 className="resume9-section-title">REFERENCES</h2>
          <ul className="resume9-list-plain">
            {references.map((r, i) => (
              <li key={i}>
                <strong>{r.name}</strong> ({r.relation}) — {r.contact}
              </li>
            ))}
          </ul>
        </Section>
      ) : null,

    declaration: (sc) =>
      declaration ? (
        <Section keyName="declaration" style={applyStyles(sc)}>
          <h2 className="resume9-section-title">DECLARATION</h2>
          <p>{declaration}</p>
        </Section>
      ) : null,
  };

  return (
    <div className="resume9-template" style={containerStyle}>
      <div className="resume9-main-grid">
        {/* Left Column (static profile, not draggable) */}
        <div className="resume9-left-column">
          <h1 className="resume9-name">{profile.fullName || "Your Name"}</h1>
          <div className="resume9-contact-info">
            {profile.address && <p className="resume9-contact-item">{profile.address}</p>}
            {profile.phone && <p className="resume9-contact-item">{profile.phone}</p>}
            {profile.email && (
              <p className="resume9-contact-item">
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </p>
            )}
            {profile.linkedin && (
              <p className="resume9-contact-item">
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                  {profile.linkedin.replace(/(^\w+:|^)\/\//, "").replace(/\/$/, "")}
                </a>
              </p>
            )}
          </div>
        </div>

        {/* Right Column (draggable sections) */}
        <div className="resume9-right-column">
          {sections.map((key, idx) => {
            const render = sectionRenderers[key];
            const sc = customizations[key] || global;
            return <Fragment key={`${key}-${idx}`}>{render ? render(sc) : null}</Fragment>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Resume9;
