// Resume8.js (customizable + orderable)
import React, { Fragment } from "react";
import "../templatesstyle/resume8.css";

// util
const ensureArray = (v) =>
  Array.isArray(v) ? v : typeof v === "string" ? v.split("\n").map(s => s.trim()).filter(Boolean) : [];

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

const Resume8 = ({
  data = {},
  // ordered list of section keys to render
  sections = ["profile", "experience", "education", "skills", "languages", "strengths", "projects", "certificates", "awards", "organisations", "courses", "publications", "references", "declaration"],
  // customizations: { global: {...}, profile: {...}, experience: {...}, ... }
  customizations = { global: {} },
}) => {
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

  const global = customizations.global || {};
  const containerStyle = {
    backgroundColor: global.templateColor || "#ffffff",
    ...applyStyles(global),
  };

  const Section = ({ children, keyName, style }) => (
    <div className="resume8-section-block" data-section={keyName} style={style}>
      {children}
    </div>
  );

  // repeatable helpers
  const renderDetails = (details) =>
    Array.isArray(details) && details.length > 0 ? (
      <ul className="resume8-details-list">
        {details.map((d, i) => (
          <li key={i}>{d}</li>
        ))}
      </ul>
    ) : null;

  // all sections implemented behind one interface
  const sectionRenderers = {
    profile: (sc) =>
      (profile.fullName || profile.name || profile.title || profile.summary) ? (
        <Section keyName="profile" style={applyStyles(sc)}>
          <div className="resume8-header">
            <div className="resume8-header-info">
              <h1 className="resume8-name">{profile.fullName || profile.name || "Your Name"}</h1>
              {profile.title && <p className="resume8-title">{profile.title}</p>}
              <div className="resume8-contact-info">
                {profile.address && <p className="resume8-contact-item"><i className="fas fa-map-marker-alt"></i> {profile.address}</p>}
                {profile.email && (
                  <p className="resume8-contact-item">
                    <i className="fas fa-envelope"></i> <a href={`mailto:${profile.email}`}>{profile.email}</a>
                  </p>
                )}
                {profile.phone && <p className="resume8-contact-item"><i className="fas fa-phone"></i> {profile.phone}</p>}
                {profile.linkedin && (
                  <p className="resume8-contact-item">
                    <i className="fab fa-linkedin"></i>{" "}
                    <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                      {profile.linkedin.replace(/(^\w+:|^)\/\//, "")}
                    </a>
                  </p>
                )}
              </div>
            </div>
            {profile.photo && (
              <div className="resume8-header-photo">
                <img src={profile.photo} alt="Profile" className="resume8-photo" />
              </div>
            )}
          </div>
          {profile.summary && (
            <div className="resume8-section resume8-profile">
              <h2 className="resume8-section-title">Profile</h2>
              <p className="resume8-profile-summary">{profile.summary}</p>
            </div>
          )}
        </Section>
      ) : null,

      experience: (sc) =>
        experience.length > 0 ? (
          <Section keyName="experience" style={applyStyles(sc)}>
            <h3 style={{ marginBottom: 0 }}>Professional Experience</h3>
            {experience.map((exp, i) => (
              <div key={`exp-${i}`} className="entry" style={{ marginBottom: 0 }}>
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
                  <ul style={{ margin: "6px 0 0 18px" }}>
                    {ensureArray(exp.details).map((pt, j) => (
                      <li key={`exp-${i}-pt-${j}`}>{pt}</li>
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
          <h2 className="resume8-section-title">Education</h2>
          <table className="resume8-education-table">
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
                  <td>{(edu.startYear || edu.startDate) && (edu.endYear || edu.endDate)
                    ? `${edu.startYear || edu.startDate} – ${edu.endYear || edu.endDate}`
                    : edu.year || ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>
      ) : null,

    skills: (sc) =>
      skills.length > 0 ? (
        <Section keyName="skills" style={applyStyles(sc)}>
          <div className="resume8-section resume8-skills">
            <h2 className="resume8-section-title">Skills</h2>
            <div className="resume8-skills-grid">
              {skills.map((skill, index) => (
                <div key={index} className="resume8-skill-item">
                  <i className="fas fa-check-square resume8-skill-icon"></i>
                  <span className="resume8-skill-text">{skill.name || skill}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>
      ) : null,

    languages: (sc) =>
      languages.length > 0 ? (
        <Section keyName="languages" style={applyStyles(sc)}>
          <div className="resume8-section resume8-languages">
            <h2 className="resume8-section-title">Languages</h2>
            <div className="resume8-languages-grid">
              {languages.map((lang, index) => (
                <div key={index} className="resume8-language-item">
                  <span className="resume8-language-name">{lang.name || lang}</span>
                  {typeof lang === "object" && lang.level ? (
                    <span className="resume8-language-level">
                      {"●".repeat(lang.level) + "○".repeat(Math.max(0, 5 - lang.level))}
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </Section>
      ) : null,

    strengths: (sc) =>
      strengths.length > 0 ? (
        <Section keyName="strengths" style={applyStyles(sc)}>
          <div className="resume8-section resume8-strengths">
            <h2 className="resume8-section-title">Strengths</h2>
            <ul className="resume8-strengths-list">
              {strengths.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
        </Section>
      ) : null,

    projects: (sc) =>
      projects.length > 0 ? (
        <Section keyName="projects" style={applyStyles(sc)}>
          <div className="resume8-section resume8-projects">
            <h2 className="resume8-section-title">Projects</h2>
            {projects.map((p, i) => (
              <div key={i} className="resume8-entry">
                <h3 className="resume8-entry-title">{p.title || p.name}</h3>
                {p.description && <p className="resume8-entry-meta">{p.description}</p>}
                {p.link && (
                  <p className="resume8-entry-meta">
                    <a href={p.link} target="_blank" rel="noopener noreferrer">
                      {p.link.replace(/(^\w+:|^)\/\//, "")}
                    </a>
                  </p>
                )}
                {renderDetails(ensureArray(p.details))}
              </div>
            ))}
          </div>
        </Section>
      ) : null,

    certificates: (sc) =>
      certificates.length > 0 ? (
        <Section keyName="certificates" style={applyStyles(sc)}>
          <div className="resume8-section resume8-certificates">
            <h2 className="resume8-section-title">Certificates</h2>
            <ul className="resume8-list-plain">
              {certificates.map((c, i) => (
                <li key={i}>{c.name || c.title} — {c.issuer || c.provider}{c.year ? `, ${c.year}` : ""}</li>
              ))}
            </ul>
          </div>
        </Section>
      ) : null,

    awards: (sc) =>
      awards.length > 0 ? (
        <Section keyName="awards" style={applyStyles(sc)}>
          <div className="resume8-section resume8-awards">
            <h2 className="resume8-section-title">Awards</h2>
            <ul className="resume8-list-plain">
              {awards.map((a, i) => (
                <li key={i}><strong>{a.title || a.name}</strong> — {a.issuer}{a.year ? `, ${a.year}` : ""}</li>
              ))}
            </ul>
          </div>
        </Section>
      ) : null,

    organisations: (sc) =>
      organisations.length > 0 ? (
        <Section keyName="organisations" style={applyStyles(sc)}>
          <div className="resume8-section resume8-organisations">
            <h2 className="resume8-section-title">Organisations</h2>
            <ul className="resume8-list-plain">
              {organisations.map((o, i) => (
                <li key={i}><strong>{o.name}</strong> — {o.role}{o.year ? `, ${o.year}` : ""}</li>
              ))}
            </ul>
          </div>
        </Section>
      ) : null,

    courses: (sc) =>
      courses.length > 0 ? (
        <Section keyName="courses" style={applyStyles(sc)}>
          <div className="resume8-section resume8-courses">
            <h2 className="resume8-section-title">Courses</h2>
            <ul className="resume8-list-plain">
              {courses.map((c, i) => (
                <li key={i}><strong>{c.name}</strong> — {c.provider}{c.year ? `, ${c.year}` : ""}</li>
              ))}
            </ul>
          </div>
        </Section>
      ) : null,

    publications: (sc) =>
      publications.length > 0 ? (
        <Section keyName="publications" style={applyStyles(sc)}>
          <div className="resume8-section resume8-publications">
            <h2 className="resume8-section-title">Publications</h2>
            <ul className="resume8-list-plain">
              {publications.map((p, i) => (
                <li key={i}><strong>{p.title}</strong> — {p.journal || p.publisher}{p.year ? `, ${p.year}` : ""}</li>
              ))}
            </ul>
          </div>
        </Section>
      ) : null,

    references: (sc) =>
      references.length > 0 ? (
        <Section keyName="references" style={applyStyles(sc)}>
          <div className="resume8-section resume8-references">
            <h2 className="resume8-section-title">References</h2>
            <ul className="resume8-list-plain">
              {references.map((r, i) => (
                <li key={i}><strong>{r.name}</strong> ({r.relation}) — {r.contact}</li>
              ))}
            </ul>
          </div>
        </Section>
      ) : null,

    declaration: (sc) =>
      data.declaration ? (
        <Section keyName="declaration" style={applyStyles(sc)}>
          <div className="resume8-section resume8-declaration">
            <h2 className="resume8-section-title">Declaration</h2>
            <p>{data.declaration}</p>
          </div>
        </Section>
      ) : null,
  };

  return (
    <div className="resume8-template" style={containerStyle}>
      {sections.map((key, idx) => {
        const render = sectionRenderers[key];
        const sc = customizations[key] || global;
        return <Fragment key={`${key}-${idx}`}>{render ? render(sc) : null}</Fragment>;
      })}
    </div>
  );
};

export default Resume8;
