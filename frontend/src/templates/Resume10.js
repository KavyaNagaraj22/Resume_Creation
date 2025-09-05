// Resume10.js (fully updated)
// - Drag-and-drop section reordering (HTML5 DnD, no external deps)
// - ClassicTemplate-style customizations (global + per-section)
// - Extra sections: projects, awards, certificates, organisations, courses,
//   publications, references, declaration
// - Safe spacing helpers to avoid NaN for marginBottom with unit strings

import React, { useCallback, useEffect, useMemo, useRef, useState, Fragment } from "react";
import "../templatesstyle/resume10.css";

// Normalize strings or arrays into an array (ported pattern from ClassicTemplate)
const ensureArray = (value) => {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    return value.split("\n").map((line) => line.trim()).filter(Boolean);
  }
  return [];
};

// Apply typographic and alignment styles similar to ClassicTemplate
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

// Safely normalize spacing (number or CSS length string like '8px', '1.2rem')
const toSpacing = (val, fallback = 8) => {
  if (typeof val === "number" && Number.isFinite(val)) return val;
  if (typeof val === "string") {
    const s = val.trim();
    if (/^[0-9]+(\.[0-9]+)?$/.test(s)) return parseFloat(s);
    return s; // keep unit strings
  }
  return fallback;
};

// Safely multiply spacing; uses CSS calc(...) for CSS length strings
const multiplySpacing = (val, factor = 2) => {
  if (typeof val === "number" && Number.isFinite(val)) return val * factor;
  if (typeof val === "string" && val) return `calc(${val} * ${factor})`;
  return val;
};

// Reorder utility
const reorder = (list, startIndex, endIndex) => {
  const result = list.slice();
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const Resume10 = ({
  data,
  sections,                  // optional initial order override
  customizations = {},       // { global, profile, experience, ... }
  onSectionsChange,          // optional callback(newOrder: string[])
  draggable = true,          // enable/disable drag-and-drop
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
    quote = "",
  } = data || {};

  const global = customizations.global || {};
  const spacing = toSpacing(global.spacing, 6);

  const templateStyle = useMemo(
    () => ({
      backgroundColor: global.templateColor || "transparent",
      ...applyStyles(global),
    }),
    [global]
  );

  // Determine which sections are present from data
  const presentSections = useMemo(() => {
    const defaultOrder = [
      "profile",
      "experience",
      "education",
      "skills",
      "projects",
      "languages",
      "awards",
      "certificates",
      "organisations",
      "courses",
      "publications",
      "references",
      "declaration",
      "quote",
    ];
    const has = {
      profile: Boolean(profile?.fullName || profile?.summary || profile?.title || profile?.photo),
      experience: Array.isArray(experience) && experience.length > 0,
      education: Array.isArray(education) && education.length > 0,
      skills: Array.isArray(skills) && skills.length > 0,
      projects: Array.isArray(projects) && projects.length > 0,
      languages: Array.isArray(languages) && languages.length > 0,
      awards: Array.isArray(awards) && awards.length > 0,
      certificates: Array.isArray(certificates) && certificates.length > 0,
      organisations: Array.isArray(organisations) && organisations.length > 0,
      courses: Array.isArray(courses) && courses.length > 0,
      publications: Array.isArray(publications) && publications.length > 0,
      references: Array.isArray(references) && references.length > 0,
      declaration: Boolean(declaration),
      quote: Boolean(quote),
    };
    return defaultOrder.filter((k) => has[k]);
  }, [
    profile,
    experience,
    education,
    skills,
    projects,
    languages,
    awards,
    certificates,
    organisations,
    courses,
    publications,
    references,
    declaration,
    quote,
  ]);

  // Initial order: from props.sections (filtered to present ones) else inferred
  const initialOrder = useMemo(() => {
    if (Array.isArray(sections) && sections.length) {
      return sections.filter((k) => presentSections.includes(k));
    }
    return presentSections;
  }, [sections, presentSections]);

  const [sectionOrder, setSectionOrder] = useState(initialOrder);
  useEffect(() => setSectionOrder(initialOrder), [initialOrder]);

  // Section DnD
  const dragFromIndex = useRef(null);
  const onDragStart = useCallback(
    (e, index) => {
      if (!draggable) return;
      dragFromIndex.current = index;
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", String(index)); // for Firefox
    },
    [draggable]
  );

  const onDragOver = useCallback(
    (e) => {
      if (!draggable) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
    },
    [draggable]
  );

  const onDrop = useCallback(
    (e, dropIndex) => {
      if (!draggable) return;
      e.preventDefault();
      const from = dragFromIndex.current;
      if (from == null || from === dropIndex) return;
      const next = reorder(sectionOrder, from, dropIndex);
      setSectionOrder(next);
      dragFromIndex.current = null;
      if (typeof onSectionsChange === "function") onSectionsChange(next);
    },
    [draggable, sectionOrder, onSectionsChange]
  );

  // Section wrapper (applies per-section styles)
  const Section = ({ children, keyName }) => {
    const sc = customizations[keyName] || global;
    const style = applyStyles(sc);
    return (
      <div className="resume10-section" style={{ paddingTop: spacing }}>
        <div className="resume10-section-inner" style={style}>
          {children}
        </div>
      </div>
    );
  };

  // Renderers aligned with ClassicTemplate keys, adapted to Resume10 layout
  const sectionRenderers = {
    profile: () => {
      if (!(profile?.fullName || profile?.summary || profile?.title || profile?.photo)) return null;
      return (
        <Section keyName="profile">
          <div className="resume10-header" style={{ marginBottom: spacing }}>
            <div className="resume10-header-left">
              {profile.fullName && <h1>{profile.fullName}</h1>}
              {profile.title && <h2>{profile.title}</h2>}
              {profile.address && <p><i className="icon-location" /> {profile.address}</p>}
              {profile.phone && <p><i className="icon-phone" /> {profile.phone}</p>}
              {profile.email && <p><i className="icon-email" /> {profile.email}</p>}
              {profile.linkedin && <p><i className="icon-linkedin" /> {profile.linkedin}</p>}
              {profile.github && <p><i className="icon-github" /> {profile.github}</p>}
            </div>
            {profile.photo && (
              <div className="resume10-header-right">
                <img src={profile.photo} alt="profile" className="resume10-photo" />
              </div>
            )}
          </div>
          {profile.summary && (
            <p className="resume10-summary" style={{ marginTop: 0 }}>{profile.summary}</p>
          )}
        </Section>
      );
    },

    experience: () => {
      if (!experience?.length) return null;
      return (
        <Section keyName="experience">
          <h3 style={{ marginBottom: spacing }}>Professional Experience</h3>
          {experience.map((exp, idx) => (
            <div key={idx} className="resume10-exp" style={{ marginBottom: spacing }}>
              <div className="resume10-exp-left">
                <p>{exp.startDate} – {exp.endDate || "Present"}</p>
                <p>{exp.location}</p>
              </div>
              <div className="resume10-exp-right">
                <p><strong>{exp.company}{exp.role ? `, ${exp.role}` : ""}</strong></p>
                {ensureArray(exp.details).length > 0 && (
                  <ul>
                    {ensureArray(exp.details).map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </Section>
      );
    },

    education: () => {
      if (!education?.length) return null;
      const anyGpa = education.some((e) => e.gpa);
      return (
        <Section keyName="education">
          <h3 style={{ marginBottom: spacing }}>Education</h3>
          <table className="resume10-education-table">
            <thead>
              <tr>
                <th>Degree</th>
                <th>Institution</th>
                <th>Years</th>
                {anyGpa && <th>CGPA</th>}
              </tr>
            </thead>
            <tbody>
              {education.map((edu, idx) => (
                <tr key={idx}>
                  <td>{edu.degree}</td>
                  <td>{edu.institution}</td>
                  <td>{(edu.startYear || edu.startDate) ?? ""} – {(edu.endYear || edu.endDate) ?? ""}</td>
                  {anyGpa && <td>{edu.gpa}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </Section>
      );
    },

    skills: () => {
      if (!skills?.length) return null;
      return (
        <Section keyName="skills">
          <h3 style={{ marginBottom: spacing }}>Skills</h3>
          <div className="resume10-tags">
            {skills.map((skill, idx) => (
              <span key={idx} className="tag">{skill}</span>
            ))}
          </div>
        </Section>
      );
    },

    projects: () => {
      if (!projects?.length) return null;
      return (
        <Section keyName="projects">
          <h3 style={{ marginBottom: spacing }}>Projects</h3>
          {projects.map((p, i) => (
            <div key={i} className="entry" style={{ marginBottom: spacing }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <h4 style={{ margin: 0 }}>{p.title}</h4>
                <span style={{ whiteSpace: "nowrap" }}>
                  {p.startDate} - {p.endDate || "Present"}
                </span>
              </div>
              {p.description && <p style={{ margin: "5px 0" }}>{p.description}</p>}
              {p.link && <p>🔗 {p.link}</p>}
            </div>
          ))}
        </Section>
      );
    },

    languages: () => {
      if (!languages?.length) return null;
      return (
        <Section keyName="languages">
          <h3 style={{ marginBottom: spacing }}>Languages</h3>
          <ul className="inline-list">
            {languages.map((lang, i) => {
              const name = typeof lang === "string" ? lang : lang?.name || "Language";
              return <li key={i}>{name}</li>;
            })}
          </ul>
        </Section>
      );
    },

    awards: () => {
      if (!awards?.length) return null;
      return (
        <Section keyName="awards">
          <h3 style={{ marginBottom: spacing }}>Awards</h3>
          {awards.map((a, i) => (
            <div key={i} className="entry" style={{ display: "flex", justifyContent: "space-between", marginBottom: spacing }}>
              <span>{a.title}{a.issuer ? ` presented by ${a.issuer}` : ""}</span>
              <span style={{ whiteSpace: "nowrap" }}>{a.year}</span>
            </div>
          ))}
        </Section>
      );
    },

    certificates: () => {
      if (!certificates?.length) return null;
      return (
        <Section keyName="certificates">
          <h3 style={{ marginBottom: spacing }}>Certifications</h3>
          {certificates.map((c, i) => (
            <div key={i} className="entry" style={{ marginBottom: spacing }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <p style={{ margin: 0 }}>{c.name}</p>
                <p style={{ margin: 0, textAlign: "center", flexGrow: 1 }}>{c.issuer}</p>
                <small>{c.year}</small>
              </div>
            </div>
          ))}
        </Section>
      );
    },

    organisations: () => {
      if (!organisations?.length) return null;
      return (
        <Section keyName="organisations">
          <h3 style={{ marginBottom: spacing }}>Organisations</h3>
          {organisations.map((o, i) => (
            <div key={i} className="entry" style={{ display: "flex", justifyContent: "space-between", marginBottom: spacing }}>
              <span><strong>{o.name}</strong>{o.role ? ` - ${o.role}` : ""}</span>
              <span style={{ whiteSpace: "nowrap" }}>{o.year}</span>
            </div>
          ))}
        </Section>
      );
    },

    courses: () => {
      if (!courses?.length) return null;
      return (
        <Section keyName="courses">
          <h3 style={{ marginBottom: spacing }}>Courses</h3>
          {courses.map((c, i) => (
            <div key={i} className="entry" style={{ display: "flex", justifyContent: "space-between", marginBottom: spacing }}>
              <span>{c.name}{c.provider ? ` - ${c.provider}` : ""}</span>
              <span style={{ whiteSpace: "nowrap" }}>{c.year}</span>
            </div>
          ))}
        </Section>
      );
    },

    publications: () => {
      if (!publications?.length) return null;
      return (
        <Section keyName="publications">
          <h3 style={{ marginBottom: spacing }}>Publications</h3>
          {publications.map((p, i) => (
            <div key={i} className="entry" style={{ display: "flex", justifyContent: "space-between", marginBottom: spacing }}>
              <span>{p.title}{p.journal ? ` - ${p.journal}` : ""}</span>
              <span style={{ whiteSpace: "nowrap" }}>{p.year}</span>
            </div>
          ))}
        </Section>
      );
    },

    references: () => {
      if (!references?.length) return null;
      return (
        <Section keyName="references">
          <h3 style={{ marginBottom: spacing }}>References</h3>
          {references.map((r, i) => (
            <div key={i} className="entry" style={{ marginBottom: spacing }}>
              <p>{r.name}{r.relation ? ` (${r.relation})` : ""} - {r.contact}</p>
            </div>
          ))}
        </Section>
      );
    },

    declaration: () => {
      if (!declaration) return null;
      return (
        <Section keyName="declaration">
          <h3 style={{ marginBottom: spacing }}>Declaration</h3>
          <p>{declaration}</p>
        </Section>
      );
    },

    quote: () => {
      if (!quote) return null;
      return (
        <Section keyName="quote">
          <blockquote className="resume10-quote">{quote}</blockquote>
        </Section>
      );
    },
  };

  // Render in draggable containers
  return (
    <div className="resume10" style={templateStyle}>
      {sectionOrder.map((key, idx) => {
        const render = sectionRenderers[key];
        const content = render ? render() : null;
        if (!content) return null;
        return (
          <div
            key={`${key}-${idx}`}
            className={`resume10-draggable ${draggable ? "is-draggable" : ""}`}
            draggable={draggable}
            onDragStart={(e) => onDragStart(e, idx)}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, idx)}
            data-section={key}
            style={{ marginBottom: multiplySpacing(spacing, 2) }}
            aria-label={`Drag to reorder ${key} section`}
          >
            {draggable && (
              <div
                className="resume10-drag-handle"
                title="Drag to reorder"
                style={{ opacity: 0.5, fontSize: 14, marginBottom: 6, cursor: "grab" }}
              >
                ⋮⋮
              </div>
            )}
            {content}
          </div>
        );
      })}
    </div>
  );
};

export default Resume10;
