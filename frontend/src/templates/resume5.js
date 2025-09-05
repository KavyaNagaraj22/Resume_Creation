// Resume5.js
import React from "react";
import "../templatesstyle/resume5.css";

// Utility functions
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

const Resume5 = ({ data, sections, customizations = {} }) => {
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
    backgroundColor: globalCustomizations.templateColor || "#fff",
    ...applyStyles(globalCustomizations),
  };

  const sectionRenderers = {
    profile: (sectionCustomizations) =>
      profile.summary && (
        <section key="profile" style={applyStyles(sectionCustomizations)}>
          <h3 style={{ marginBottom: globalCustomizations.spacing }}>Objective</h3>
          <p>{profile.summary}</p>
        </section>
      ),

    experience: (sectionCustomizations) =>
      experience.length > 0 && (
        <section key="experience" style={applyStyles(sectionCustomizations)}>
          <h3 style={{ marginBottom: globalCustomizations.spacing }}>Professional Experience</h3>
          {experience.map((exp, i) => (
            <div key={i} className="entry" style={{ marginBottom: globalCustomizations.spacing }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong>{exp.role}</strong>
                <span style={{ whiteSpace: "nowrap" }}>{exp.startDate} – {exp.endDate}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ margin: 0 }}>{exp.company}</p>
                <small>{exp.location}</small>
              </div>
              <ul>
                {ensureArray(exp.details).map((pt, j) => (
                  <li key={j}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      ),

    education: (sectionCustomizations) =>
      education.length > 0 && (
        <section key="education" style={applyStyles(sectionCustomizations)}>
          <h3 style={{ marginBottom: globalCustomizations.spacing }}>Education</h3>
          <table className="resume5-education-table">
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
                  <td><span style={{ whiteSpace: "nowrap" }}>{edu.startDate} – {edu.endDate}</span></td>
                  {edu.gpa && <td>{edu.gpa}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ),

    skills: (sectionCustomizations) =>
      skills.length > 0 && (
        <section key="skills" style={applyStyles(sectionCustomizations)}>
          <h3 style={{ marginBottom: globalCustomizations.spacing }}>Skills</h3>
          <ul className="resume5-pills">
            {skills.map((skill, i) => (
              <li key={i}>• {skill}</li>
            ))}
          </ul>
        </section>
      ),

    languages: (sectionCustomizations) =>
      languages.length > 0 && (
        <section key="languages" style={applyStyles(sectionCustomizations)}>
          <h3 style={{ marginBottom: globalCustomizations.spacing }}>Languages</h3>
          <ul className="resume5-pills">
            {languages.map((lang, i) => {
              const name = typeof lang === "string" ? lang : lang.name || "Language";
              return <li key={i}>{name}</li>;
            })}
          </ul>
        </section>
      ),

    awards: (sectionCustomizations) =>
      awards.length > 0 && (
        <section key="awards" style={applyStyles(sectionCustomizations)}>
          <h3 style={{ marginBottom: globalCustomizations.spacing }}>Awards</h3>
          {awards.map((a, i) => (
            <div key={i} className="entry" style={{ display: "flex", justifyContent: "space-between", marginBottom: globalCustomizations.spacing }}>
              <span><strong>{a.title}</strong> – {a.issuer}</span>
              <span style={{ whiteSpace: "nowrap" }}>{a.year}</span>
            </div>
          ))}
        </section>
      ),

    certificates: (sectionCustomizations) =>
      certificates.length > 0 && (
        <section key="certificates" style={applyStyles(sectionCustomizations)}>
          <h3 style={{ marginBottom: globalCustomizations.spacing }}>Certifications</h3>
          {certificates.map((cert, i) => (
            <div key={i} className="entry" style={{ display: "flex", justifyContent: "space-between", marginBottom: globalCustomizations.spacing }}>
              <span><strong>{cert.name}</strong> – {cert.issuer}</span>
              <span style={{ whiteSpace: "nowrap" }}>{cert.year}</span>
            </div>
          ))}
        </section>
      ),

    projects: (sectionCustomizations) =>
      projects.length > 0 && (
        <section key="projects" style={applyStyles(sectionCustomizations)}>
          <h3 style={{ marginBottom: globalCustomizations.spacing }}>Projects</h3>
          {projects.map((p, i) => (
            <div key={i} className="entry" style={{ marginBottom: globalCustomizations.spacing }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h4 style={{ margin: 0 }}>{p.title}</h4>
                <span style={{ whiteSpace: "nowrap" }}>{p.startDate} – {p.endDate || "Present"}</span>
              </div>
              <p style={{ margin: "5px 0" }}>{p.description}</p>
              {p.link && <p>🔗 {p.link}</p>}
            </div>
          ))}
        </section>
      ),

    organisations: (sectionCustomizations) =>
      organisations.length > 0 && (
        <section key="organisations" style={applyStyles(sectionCustomizations)}>
          <h3 style={{ marginBottom: globalCustomizations.spacing }}>Organisations</h3>
          {organisations.map((o, i) => (
            <div key={i} className="entry" style={{ display: "flex", justifyContent: "space-between", marginBottom: globalCustomizations.spacing }}>
              <span><strong>{o.name}</strong> – {o.role}</span>
              <span style={{ whiteSpace: "nowrap" }}>{o.year}</span>
            </div>
          ))}
        </section>
      ),

    courses: (sectionCustomizations) =>
      courses.length > 0 && (
        <section key="courses" style={applyStyles(sectionCustomizations)}>
          <h3 style={{ marginBottom: globalCustomizations.spacing }}>Courses</h3>
          {courses.map((c, i) => (
            <div key={i} className="entry" style={{ display: "flex", justifyContent: "space-between", marginBottom: globalCustomizations.spacing }}>
              <span><strong>{c.name}</strong> — {c.provider}</span>
              <span style={{ whiteSpace: "nowrap" }}>{c.year}</span>
            </div>
          ))}
        </section>
      ),

    publications: (sectionCustomizations) =>
      publications.length > 0 && (
        <section key="publications" style={applyStyles(sectionCustomizations)}>
          <h3 style={{ marginBottom: globalCustomizations.spacing }}>Publications</h3>
          {publications.map((p, i) => (
            <div key={i} className="entry" style={{ display: "flex", justifyContent: "space-between", marginBottom: globalCustomizations.spacing }}>
              <span><strong>{p.title}</strong> — {p.journal}</span>
              <span style={{ whiteSpace: "nowrap" }}>{p.year}</span>
            </div>
          ))}
        </section>
      ),

    references: (sectionCustomizations) =>
      references.length > 0 && (
        <section key="references" style={applyStyles(sectionCustomizations)}>
          <h3 style={{ marginBottom: globalCustomizations.spacing }}>References</h3>
          {references.map((r, i) => (
            <p key={i}><strong>{r.name}</strong> ({r.relation}) — {r.contact}</p>
          ))}
        </section>
      ),

    declaration: (sectionCustomizations) =>
      declaration && (
        <section key="declaration" style={applyStyles(sectionCustomizations)}>
          <h3 style={{ marginBottom: globalCustomizations.spacing }}>Declaration</h3>
          <p>{declaration}</p>
        </section>
      ),
  };

  return (
    <div className="resume5" style={templateStyle}>
      {/* Header */}
      <div className="resume5-header">
        <div>
          <h1 style={{ color: globalCustomizations.fontColor }}>{profile.fullName || "Your Name"}</h1>
          <h2 style={{ color: globalCustomizations.fontColor }}>{profile.title}</h2>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "16px", marginTop: "8px", color: globalCustomizations.fontColor }}>
            {profile.address && (
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src="/LocationLogo.png" alt="Location" style={{ width: "16px", marginRight: "6px" }} />
                <span>{profile.address}</span>
              </div>
            )}
            {profile.email && (
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src="/GMailLogo.png" alt="Email" style={{ width: "16px", marginRight: "6px" }} />
                <span>{profile.email}</span>
              </div>
            )}
            {profile.phone && <p>📞 {profile.phone}</p>}
            {profile.linkedin && (
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src="/LinkedInLogo.png" alt="LinkedIn" style={{ width: "16px", marginRight: "6px" }} />
                <span>{profile.linkedin}</span>
              </div>
            )}
            {profile.github && (
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src="/GitHubLogo.png" alt="GitHub" style={{ width: "16px", marginRight: "6px" }} />
                <span>{profile.github}</span>
              </div>
            )}
          </div>
        </div>
        {profile.photo && <img src={profile.photo} alt="profile" className="resume5-photo" />}
      </div>

      {/* Sections */}
      {sections.map((sectionKey) => {
        const renderSection = sectionRenderers[sectionKey];
        const sectionCustomizations = customizations[sectionKey] || globalCustomizations;
        return renderSection ? renderSection(sectionCustomizations) : null;
      })}
    </div>
  );
};

export default Resume5;
