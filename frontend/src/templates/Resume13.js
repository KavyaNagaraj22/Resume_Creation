import React, { Fragment } from "react";
import "../templatesstyle/Resume13.css";

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
    lineHeight: c.lineHeight ? c.lineHeight : "1.3",
  };
};

const Resume13 = ({ data, sections, customizations = {} }) => {
  const {
    profile = {},
    experience = [],
    education = [],
    skills = [],
    languages = [],
    awards = [],
    certificates = [],
    strengths = [],
    projects = [],
    organisations = [],
    courses = [],
    publications = [],
    references = [],
    declaration = ""
  } = data || {};

  const global = customizations.global || {};
  const templateStyle = {
    backgroundColor: global.templateColor || "transparent",
    ...applyStyles(global),
  };

  const Section = ({ children, keyName, style }) => (
    <div className="resume-section page-break" style={style} data-section={keyName}>
      {children}
    </div>
  );

  const sectionRenderers = {
    profile: (sc) =>
      (profile.fullName || profile.summary) && (
        <div className="resume13-header" style={applyStyles(sc)}>
          <h1>{profile.fullName || "Your Name"}</h1>
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
          </div>
          {profile.summary && (
            <Section keyName="summary" style={applyStyles(sc)}>
              <h3>Objective</h3>
              <p>{profile.summary}</p>
            </Section>
          )}
        </div>
      ),

    experience: (sc) =>
      experience.length > 0 && (
        <Section keyName="experience" style={applyStyles(sc)}>
          <h3>Professional Experience</h3>
          {experience.map((exp, i) => (
            <div key={i} className="entry">
              <strong>{exp.role}</strong>, {exp.company} <br />
              <small>{exp.startDate} – {exp.endDate} | {exp.location}</small>
              <ul>{exp.details?.map((pt, j) => <li key={j}>{pt}</li>)}</ul>
            </div>
          ))}
        </Section>
      ),

    education: (sc) =>
      education.length > 0 && (
        <Section keyName="education" style={applyStyles(sc)}>
          <h3>Education</h3>
          <table className="resume13-education-table">
            <thead>
              <tr>
                <th>Degree</th>
                <th>Institution</th>
                <th>Year</th>
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
        </Section>
      ),

    skills: (sc) =>
      ensureArray(skills).length > 0 && (
        <Section keyName="skills" style={applyStyles(sc)}>
          <h3>Skills</h3>
          <ul className="skills-list">
            {ensureArray(skills).map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </Section>
      ),

    languages: (sc) =>
      ensureArray(languages).length > 0 && (
        <Section keyName="languages" style={applyStyles(sc)}>
          <h3>Languages</h3>
          <ul>
            {ensureArray(languages).map((lang, i) =>
              <li key={i}>{typeof lang === "string" ? lang : lang.name}</li>
            )}
          </ul>
        </Section>
      ),

    awards: (sc) =>
      ensureArray(awards).length > 0 && (
        <Section keyName="awards" style={applyStyles(sc)}>
          <h3>Awards</h3>
          <ul>
            {awards.map((a, i) => (
              <li key={i}><strong>{a.title}</strong> — {a.issuer}</li>
            ))}
          </ul>
        </Section>
      ),

    certificates: (sc) =>
      ensureArray(certificates).length > 0 && (
        <Section keyName="certificates" style={applyStyles(sc)}>
          <h3>Certificates</h3>
          <ul>
            {certificates.map((cert, i) => (
              <li key={i}>{cert.title || cert.name}</li>
            ))}
          </ul>
        </Section>
      ),

    strengths: (sc) =>
      ensureArray(strengths).length > 0 && (
        <Section keyName="strengths" style={applyStyles(sc)}>
          <h3>Strengths</h3>
          <ul>{ensureArray(strengths).map((s, i) => <li key={i}>{s}</li>)}</ul>
        </Section>
      ),

    projects: (sc) =>
      projects.length > 0 && (
        <Section keyName="projects" style={applyStyles(sc)}>
          <h3>Projects</h3>
          {projects.map((p, i) => (
            <div key={i} className="entry">
              <strong>{p.title}</strong>
              <p>{p.description}</p>
              {p.link && <p>🔗 {p.link}</p>}
            </div>
          ))}
        </Section>
      ),

    organisations: (sc) =>
      organisations.length > 0 && (
        <Section keyName="organisations" style={applyStyles(sc)}>
          <h3>Organisations</h3>
          {organisations.map((o, i) => (
            <p key={i}><strong>{o.name}</strong> — {o.role}, {o.year}</p>
          ))}
        </Section>
      ),

    courses: (sc) =>
      courses.length > 0 && (
        <Section keyName="courses" style={applyStyles(sc)}>
          <h3>Courses</h3>
          {courses.map((c, i) => (
            <p key={i}><strong>{c.name}</strong> — {c.provider}, {c.year}</p>
          ))}
        </Section>
      ),

    publications: (sc) =>
      publications.length > 0 && (
        <Section keyName="publications" style={applyStyles(sc)}>
          <h3>Publications</h3>
          {publications.map((p, i) => (
            <p key={i}><strong>{p.title}</strong> — {p.journal}, {p.year}</p>
          ))}
        </Section>
      ),

    references: (sc) =>
      references.length > 0 && (
        <Section keyName="references" style={applyStyles(sc)}>
          <h3>References</h3>
          {references.map((r, i) => (
            <p key={i}><strong>{r.name}</strong> ({r.relation}) — {r.contact}</p>
          ))}
        </Section>
      ),

    declaration: (sc) =>
      declaration && (
        <Section keyName="declaration" style={applyStyles(sc)}>
          <h3>Declaration</h3>
          <p>{declaration}</p>
        </Section>
      ),
  };

  return (
    <div className="resume13-template" style={templateStyle}>
      <div className="resume13-body single-column">
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

export default Resume13;
