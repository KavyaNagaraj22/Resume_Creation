// ClassicTemplate.js
import React, { Fragment } from "react";
import "../templatesstyle/ClassicTemplate.css";

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
    lineHeight: c.lineHeight ? c.lineHeight : "1.1",
  };
};

const ClassicTemplate = ({ data, sections, customizations = {} }) => {
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

  const global = customizations.global || {};
  const templateStyle = {
    backgroundColor: global.templateColor || "transparent",
    ...applyStyles(global),
  };

  const Section = ({ children, style, keyName }) => (
    <div className="resume-section" style={style} data-section={keyName}>
      {children}
    </div>
  );

  const sectionRenderers = {
    profile: (sc) =>
      (profile.fullName || profile.summary) ? (
        <Section keyName="profile" style={applyStyles(sc)}>
          {/* Header-style block (kept inside profile for flexibility) */}
          {profile.fullName && (
            <div className="classic-header" style={{ marginBottom: 10 }}>
              <h1 style={{ color: global.fontColor }}>{profile.fullName}</h1>
              <div className="contact-info">
                {profile.email && (
                  <p>
                    <img className="contact-icon" src="/GMailLogo.png" alt="Email" />
                    {profile.email}
                  </p>
                )}
                {profile.phone && <p>📞 {profile.phone}</p>}
                {profile.address && (
                  <p>
                    <img className="contact-icon" src="/LocationLogo.png" alt="Location" />
                    {profile.address}
                  </p>
                )}
                {profile.linkedin && (
                  <p>
                    <img className="contact-icon" src="/LinkedInLogo.png" alt="LinkedIn" />
                    {profile.linkedin}
                  </p>
                )}
                {profile.github && (
                  <p>
                    <img className="contact-icon" src="/GitHubLogo.png" alt="GitHub" />
                    {profile.github}
                  </p>
                )}
              </div>
            </div>
          )}
          {profile.summary && (
            <>
              <h3 style={{ marginBottom: global.spacing || 6 }}>Objective</h3>
              <p>{profile.summary}</p>
            </>
          )}
        </Section>
      ) : null,

    experience: (sc) =>
      experience.length > 0 ? (
        <Section keyName="experience" style={applyStyles(sc)}>
          <h3 style={{ marginBottom: global.spacing || 6 }}>Professional Experience</h3>
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
        </Section>
      ) : null,

    education: (sc) =>
      education.length > 0 ? (
        <Section keyName="education" style={applyStyles(sc)}>
          <h3 style={{ marginBottom: global.spacing || 6 }}>Education</h3>
          <table className="resume2-education-table">
            <thead>
              <tr>
                <th>Degree</th>
                <th>Institution</th>
                <th>Years</th>
                <th>Marks</th>
                {education?.gpa && <th>CGPA</th>}
              </tr>
            </thead>
            <tbody>
              {education.map((edu, i) => (
                <tr key={`edu-${i}`}>
                  <td>{edu.degree}</td>
                  <td>{edu.institution}</td>
                  <td>
                    <span style={{ whiteSpace: "nowrap" }}>
                      {edu.startDate}  {edu.endDate}
                    </span>
                  </td>
                  {edu.gpa && <td>{edu.gpa}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </Section>
      ) : null,

    skills: (sc) =>
      skills.length > 0 ? (
        <Section keyName="skills" style={applyStyles(sc)}>
          <h3 style={{ marginBottom: global.spacing || 6 }}>Skills</h3>
          <ul className="inline-list">
            {skills.map((skill, i) => (
              <li key={`skill-${i}`}> {skill}</li>
            ))}
          </ul>
        </Section>
      ) : null,

    projects: (sc) =>
      projects.length > 0 ? (
        <Section keyName="projects" style={applyStyles(sc)}>
          <h3 style={{ marginBottom: global.spacing || 6 }}>Projects</h3>
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
        </Section>
      ) : null,

    languages: (sc) =>
      languages.length > 0 ? (
        <Section keyName="languages" style={applyStyles(sc)}>
          <h3 style={{ marginBottom: global.spacing || 6 }}>Languages</h3>
          <ul className="inline-list">
            {languages.map((lang, i) => {
              const name = typeof lang === "string" ? lang : lang.name || "Language";
              return <li key={`lang-${i}`}>{name}</li>;
            })}
          </ul>
        </Section>
      ) : null,

    awards: (sc) =>
      awards.length > 0 ? (
        <Section keyName="awards" style={applyStyles(sc)}>
          <h3 style={{ marginBottom: global.spacing || 6 }}>Awards</h3>
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
        </Section>
      ) : null,

    certificates: (sc) =>
      certificates.length > 0 ? (
        <Section keyName="certificates" style={applyStyles(sc)}>
          <h3 style={{ marginBottom: global.spacing || 6 }}>Certifications</h3>
          {certificates.map((cert, i) => (
            <div key={`cert-${i}`} className="entry" style={{ marginBottom: global.spacing || 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <p style={{ margin: 0, padding: 0 }}>{cert.name}</p>
                <p style={{ margin: 0, padding: 0, textAlign: "center", flexGrow: 1 }}>{cert.issuer}</p>
                <small>{cert.year}</small>
              </div>
            </div>
          ))}
        </Section>
      ) : null,

    organisations: (sc) =>
      organisations.length > 0 ? (
        <Section keyName="organisations" style={applyStyles(sc)}>
          <h3 style={{ marginBottom: global.spacing || 6 }}>Organisations</h3>
          {organisations.map((o, i) => (
            <div
              key={`org-${i}`}
              className="entry"
              style={{ display: "flex", justifyContent: "space-between", marginBottom: global.spacing || 6 }}
            >
              <span>
                <strong>{o.name}</strong> - {o.role}
              </span>
              <span style={{ whiteSpace: "nowrap" }}>{o.year}</span>
            </div>
          ))}
        </Section>
      ) : null,

    courses: (sc) =>
      courses.length > 0 ? (
        <Section keyName="courses" style={applyStyles(sc)}>
          <h3 style={{ marginBottom: global.spacing || 6 }}>Courses</h3>
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
        </Section>
      ) : null,

    publications: (sc) =>
      publications.length > 0 ? (
        <Section keyName="publications" style={applyStyles(sc)}>
          <h3 style={{ marginBottom: global.spacing || 6 }}>Publications</h3>
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
        </Section>
      ) : null,

    references: (sc) =>
      references.length > 0 ? (
        <Section keyName="references" style={applyStyles(sc)}>
          <h3 style={{ marginBottom: global.spacing || 6 }}>References</h3>
          {references.map((r, i) => (
            <div key={`ref-${i}`} className="entry" style={{ marginBottom: global.spacing || 6 }}>
              <p>
                {r.name} ({r.relation}) - {r.contact}
              </p>
            </div>
          ))}
        </Section>
      ) : null,

    declaration: (sc) =>
      declaration ? (
        <Section keyName="declaration" style={applyStyles(sc)}>
          <h3 style={{ marginBottom: global.spacing || 6 }}>Declaration</h3>
          <p>{declaration}</p>
        </Section>
      ) : null,
  };

  return (
    <div className="classic-template" style={templateStyle}>
      <div className="classic-body">
        {sections.map((sectionKey, idx) => {
          const renderSection = sectionRenderers[sectionKey];
          const sc = customizations[sectionKey] || global;
          return (
            <Fragment key={`sec-${sectionKey}-${idx}`}>
              {renderSection ? renderSection(sc) : null}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ClassicTemplate;